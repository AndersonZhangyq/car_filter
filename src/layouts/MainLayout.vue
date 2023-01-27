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
            <div class="col-auto text-black">
              共 {{ data.series_num }} 车系 {{ data.car_num }} 车型
            </div>
          </div>
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
    var rank_info = null;
    const property_value_set = ref({});
    worker.onmessage = (e) => {
      car_info = new dfd.DataFrame(e.data.car_info);
      car_info.set_index({ column: "car_id", inplace: true });
      rank_info = e.data.rank_info;
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
        origin: window.location.origin,
      });
    } else {
      worker.postMessage({
        json_links: [
          "/assets/car_info_1.json",
          "/assets/car_info_2.json",
          // "/assets/car_info_3.json",
        ],
        origin: window.location.origin,
      });
    }

    const disable_in_dcd = new Set(["active_brake"]);

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
      applyFilter();
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

    const applyFilter = () => {
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
            } else if (key === "length" || key === "width" || key === "height") {
              if (value.value.includes("-")) {
                const numbers = value.value.split("-");
                const low = parseFloat(numbers[0]);
                const high = parseFloat(numbers[1]);
                car_info_filter_df = car_info_filter_df.loc({
                  rows: car_info_filter_df[key].le(high),
                });
                if (car_info_filter_df.size == 0) return;
                car_info_filter_df = car_info_filter_df.loc({
                  rows: car_info_filter_df[key].ge(low),
                });
              } else {
                car_info_filter_df = car_info_filter_df.loc({
                  rows: car_info_filter_df[key].le(
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
        "length",
        "width",
        "height"
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
        let updated_rank_info = rank_info[series_id];
        let car_size = null;
        car_info_filter_col_dict[series_id].forEach((ele) => {
          if (series_name === null) series_name = ele[5];
          if (sub_brand_name === null) sub_brand_name = ele[6];
          if (car_size === null) car_size = [ele[7], ele[8], ele[9]]
          tmp.push({
            car_year: ele[0],
            car_name: ele[1],
            dealer_price: ele[2],
            car_id: ele[3],
          });
        });
        tmp_car_info_filtered[`${series_id}`] = {
          sub_brand_name: sub_brand_name,
          series_name: series_name,
          car_list: tmp,
          rank_info: updated_rank_info,
          car_size: car_size,
          sale_rank: rank_info[series_id]
            ? rank_info[series_id][0]["rank"]
            : 0x3f3f3f3f,
        };
      }
      data["car_info_filtered"] = Object.entries(tmp_car_info_filtered).sort(
        (a, b) => {
          return a[1]["sale_rank"] - b[1]["sale_rank"];
        }
      );
      data["series_num"] = Object.keys(tmp_car_info_filtered).length;
      data["car_num"] = car_info_filter_groupBy.data.length;
      selected_car_ids.value = [];
    };
    return {
      data,
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
