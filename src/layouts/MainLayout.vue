<template>
  <q-layout view="hHh lpR lfr">
    <q-header class="bg-blue-grey-1" id="head">
      <q-toolbar class="q-pa-md">
        <div class="col-1 text-left">
          <q-btn
            flat
            @click="drawer_left = !drawer_left"
            round
            dense
            color="primary"
            icon="menu"
          />
        </div>
        <div class="column offset-1 col-8">
          <div class="row q-col-gutter-xs">
            <q-chip
              v-for="(value, key) in property_filter_display"
              removable
              @remove="removeProperty(key, value)"
              :key="key"
              outline
              color="primary"
              text-color="white"
            >
              {{ value["text"] }}
            </q-chip>
          </div>
          <div class="row items-center q-gutter-md">
            <q-btn
              class="col-sm-2 col-md-1"
              color="primary"
              @click="scrollToCarInfo"
              label="Apply"
            />
            <div
              v-if="data_souce == 'local'"
              class="col-auto text-black"
            >
              共 {{ data.series_num }} 车系 {{ data.car_num }} 车型
            </div>
            <div
              v-else
              class="col-auto text-black"
            >
              共 {{ data.car_num }} 车型
            </div>
          </div>
        </div>
        <div class="col-2 text-right">
          <q-btn-toggle
            v-model="data_source"
            rounded
            class="my-custom-toggle"
            unelevated
            toggle-color="primary"
            color="white"
            text-color="primary"
            :options="[
              { label: '本地数据', value: 'local' },
              { label: '懂车帝', value: 'dongchedi' },
            ]"
          />
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="drawer_left" elevated overlay>
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <q-list separator padding>
            <q-item-label header> Click to restore the item </q-item-label>
            <q-item
              clickable
              v-ripple
              v-for="(series_name, series_id) in hidden_series"
              :key="series_id"
              @click="deleteHiddenSeries(series_id)"
            >
              <q-item-section> {{ series_name }}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <div class="q-pa-md">
        <!-- property filter start -->
        <property-filter
          ref="propertyFilterRef"
          :property_value_set="property_value_set"
          @applyFilter="applyFilter"
        />
        <!-- property filter end -->
        <!-- car information start -->
        <car-info :car_info_filtered="data.car_info_filtered" />
        <!-- car information end -->
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn
            fab
            icon="search"
            color="primary"
            v-show="selected_car_ids.length != 0"
            type="a"
            target="_blank"
            :href="`https://www.dongchedi.com/auto/auto_compare/params?carIds=${selected_car_ids.join(
              ','
            )}`"
          />
        </q-page-sticky>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, reactive, ref, computed } from "vue";
import { scroll, useQuasar } from "quasar";
import { useStore } from "vuex";

const { getScrollTarget, setVerticalScrollPosition } = scroll;

import * as dfd from "danfojs";

import CarInfo from "components/CarInfo.vue";
import PropertyFilter from "components/PropertyFilter.vue";

import dongchedi_config from "../../public/assets/dongchedi_config.json";

export default defineComponent({
  name: "MainLayout",

  components: { CarInfo, PropertyFilter },

  setup(props) {
    const store = useStore();
    const $q = useQuasar();
    $q.loading.show({
      message: "加载汽车数据中...",
      delay: 400, // ms
    });
    console.log(import.meta.url);
    const worker = new Worker(
      new URL("../worker/load_json.js", import.meta.url),
      { type: "module" }
    );
    var car_info = null;
    const property_value_set = ref({});
    worker.onmessage = (e) => {
      car_info = new dfd.DataFrame(e.data.car_info);
      car_info.set_index({ column: "car_id", inplace: true });
      console.log(car_info.index);
      property_value_set.value = e.data.property_value_set;
      applyFilter();
      $q.loading.hide();
    };

    if (
      window.webpackHotUpdate ||
      (process.env.NODE_ENV !== "production" &&
        process.env.NODE_ENV !== "test" &&
        typeof console !== "undefined")
    ) {
      worker.postMessage({
        json_links: [
          "/assets/car_info_test.json",
          // "/assets/car_info_1.json",
        ],
      });
    } else {
      worker.postMessage({
        json_links: [
          "/assets/car_info_1.json",
          "/assets/car_info_2.json",
          "/assets/car_info_3.json",
        ],
      });
    }
    const data_source = computed({
      get() {
        return store.state.globaldata.data_source;
      },
      set(value) {
        store.commit("globaldata/updateDateSource", value);
      },
    });

    const data = reactive({
      car_info_filtered: {},
      series_num: 0,
      car_num: 0,
    });
    const selected_car_ids = computed({
      get() {
        return store.state.globaldata.selected_car_ids;
      },
      set(newValue) {
        store.commit("globaldata/updateSelectedCarIds", newValue);
      },
    });
    const hidden_series = ref(store.state.globaldata.hidden_series);
    const property_filter_display = reactive(
      store.state.globaldata.property_filter_display
    );
    const deleteHiddenSeries = (series_id) => {
      store.commit("globaldata/deleteHiddenSeries", series_id);
    };
    const drawer_left = ref(false);

    const scrollToCarInfo = () => {
      applyFilter(true);
      let ele_head = document.getElementById("head");
      const ele = document.getElementById("carInfo");
      const target = getScrollTarget(ele);
      const offset = ele.offsetTop - ele_head.offsetHeight;
      const duration = 300;
      setVerticalScrollPosition(target, offset, duration);
    };

    const propertyFilterRef = ref();
    const removeProperty = (key, value) => {
      propertyFilterRef.value.removeProperty(key, value);
    };

    const applyFilterLocal = () => {
      const property_filter_list = store.state.globaldata.property_filter_list;
      let car_info_filter_df = car_info;
      if (Object.keys(property_filter_list).length > 0) {
        Object.keys(property_filter_list).forEach((key) => {
          if (car_info_filter_df.size == 0) return;
          // car_info_filter_df.reset_index({ inplace: true });
          const value = property_filter_list[key];
          if (value === true) {
            car_info_filter_df = car_info_filter_df.loc({
              rows: car_info_filter_df[key].str.includes("●"),
            });
          } else if (value.isRawValue) {
            if (key === "dealer_price") {
              if (value.value.includes("-")) {
                const numbers = value.value.split("-");
                const low = parseFloat(numbers[0]);
                const high = parseFloat(numbers[1]);
                car_info_filter_df = car_info_filter_df.loc({
                  rows: car_info_filter_df["dealer_price_value"].le(high),
                });
                if (car_info_filter_df.size == 0) return;
                // car_info_filter_df.reset_index({ inplace: true });
                car_info_filter_df = car_info_filter_df.loc({
                  rows: car_info_filter_df["dealer_price_value"].ge(low),
                });
              } else {
                car_info_filter_df = car_info_filter_df.loc({
                  rows: car_info_filter_df["dealer_price_value"].le(
                    parseFloat(value.value)
                  ),
                });
              }
            } else {
              let index_series = null;
              for (const v of value.value) {
                const tmp_idx = car_info_filter_df[key].eq(v);
                index_series =
                  index_series === null ? tmp_idx : index_series.or(tmp_idx);
              }
              if (index_series !== null) {
                car_info_filter_df = car_info_filter_df.loc({
                  rows: index_series,
                });
              }
            }
          } else {
            let index_series = null;
            for (const v of value.value) {
              const tmp_idx = car_info_filter_df[v["option"]].str.includes("●");
              index_series =
                index_series === null ? tmp_idx : index_series.or(tmp_idx);
            }
            if (index_series !== null) {
              car_info_filter_df = car_info_filter_df.loc({
                rows: index_series,
              });
            }
          }
        });
      }
      if (car_info_filter_df.size == 0) {
        data["car_info_filtered"] = {};
        data["series_num"] = 0;
        data["car_num"] = 0;
        return;
      }
      const car_info_filter_col_name = [
        "car_year",
        "car_name",
        "dealer_price",
        "car_id",
        "series_id",
        "series_name",
        "sub_brand_name",
      ];
      car_info_filter_df = car_info_filter_df.loc({
        columns: car_info_filter_col_name,
      });
      const car_info_filter_groupBy = car_info_filter_df.groupby(["series_id"]);
      const car_info_filter_col_dict = car_info_filter_groupBy.col_dict;
      let tmp_car_info_filtered = {};
      for (const series_id in car_info_filter_col_dict) {
        const tmp = [];
        let series_name = null;
        let sub_brand_name = null;
        car_info_filter_col_dict[series_id].forEach((ele) => {
          if (series_name === null) series_name = ele[5];
          if (sub_brand_name === null) sub_brand_name = ele[6];
          tmp.push({
            car_year: ele[0],
            car_name: ele[1],
            dealer_price: ele[2],
            car_id: ele[3],
          });
        });
        tmp_car_info_filtered[series_id] = {
          sub_brand_name: sub_brand_name,
          series_name: series_name,
          car_list: tmp,
        };
      }
      data["car_info_filtered"] = tmp_car_info_filtered;
      data["series_num"] = Object.keys(tmp_car_info_filtered).length;
      data["car_num"] = car_info_filter_groupBy.data.length;
      selected_car_ids.value = [];
    };

    const applyFilterDongCheDi = async () => {
      const url =
        "https://delicate-river-9bed.justforssr.workers.dev/corsproxy/?apiurl=https://ib-lq.snssdk.com/motor/brand/v6/select/series/v2";
      let postBody = {
        limit: 10000,
        is_refresh: 0,
        offset: 0,
        sort_new: ["oil_asc", "sale_desc"],
      };
      const property_filter_list = store.state.globaldata.property_filter_list;
      for (const key in property_filter_list) {
        if (property_filter_list[key] === true) {
          postBody[key] = 1;
        } else if (property_filter_list[key].isRawValue) {
          if (key in dongchedi_config) {
            postBody[key] = property_filter_list[key].value
              .map((v) => dongchedi_config[key][v])
              .join(",");
          }
        } else {
          property_filter_list[key].value.forEach((item) => {
            postBody[item.option] = 1;
          });
        }
      }
      const response = await fetch(url, {
        method: "POST",
        // mode: "no-cors",
        headers: {
          Origin: window.location.origin,
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: new URLSearchParams(postBody).toString(),
      });
      var ret = await response.json();
      var { series, series_count } = ret.data;
      var tmp_car_info_filtered = {};
      series.forEach(({ concern_id, car_ids, rank_info }) => {
        // console.log(concern_id, car_ids, rank_info);
        let car_list = [];
        let series_name = null;
        let sub_brand_name = null;
        car_ids.forEach((car_id) => {
          try {
            let json_data = car_info.loc({ rows: [`${car_id}`] }).to_json({
              download: false,
            })[0];
            if (series_name === null) series_name = json_data["series_name"];
            if (sub_brand_name === null)
              sub_brand_name = json_data["sub_brand_name"];
            if (json_data["fuel_form"] == "纯电动")
              rank_info = rank_info.filter((item) => !item.type_name.includes("油耗"));
            car_list.push({
              car_id: car_id,
              dealer_price: json_data["dealer_price"],
              car_year: json_data["car_year"],
              car_name: json_data["car_name"],
            });
          } catch (error) {}
        });
        if (car_list.length > 0) {
          tmp_car_info_filtered[concern_id] = {
            series_name: series_name,
            sub_brand_name: sub_brand_name,
            car_list: car_list,
            rank_info: rank_info,
          };
        }
      });
      if ("car_year" in property_filter_list) {
        for (const series_id in tmp_car_info_filtered) {
          tmp_car_info_filtered[series_id]["car_list"] = tmp_car_info_filtered[
            series_id
          ]["car_list"].filter((car) =>
            property_filter_list["car_year"].value.includes(car["car_year"])
          );
          if (tmp_car_info_filtered[series_id]["car_list"].length == 0) {
            delete tmp_car_info_filtered[series_id];
          }
        }
      }
      data["car_info_filtered"] = tmp_car_info_filtered;
      data["car_num"] = Object.keys(tmp_car_info_filtered).length;
      selected_car_ids.value = [];
    };

    const applyFilter = (force = false) => {
      if (data_source.value === "local") {
        applyFilterLocal();
      } else {
        if (force) applyFilterDongCheDi();
      }
    };
    return {
      data,
      data_source,
      drawer_left,
      selected_car_ids,
      hidden_series,
      property_filter_display,
      property_value_set,
      propertyFilterRef,
      deleteHiddenSeries,
      removeProperty,
      scrollToCarInfo,
      applyFilter,
    };
  },
});
</script>
