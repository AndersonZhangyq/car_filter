<template>
  <q-layout view="hHh lpR lfr">
    <q-header class="bg-blue-grey-1" id="head">
      <q-toolbar class="q-pa-md">
        <q-btn
          flat
          @click="drawer_left = !drawer_left"
          round
          dense
          color="primary"
          icon="menu"
        />
        <div class="column offset-2 col-10">
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
              @click="delete hidden_series[series_id]"
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
        <div class="row">
          <div class="column">
            <div
              class="col-auto row items-center q-pb-md"
              v-for="(props, group_name) in data.property_group_refined"
              :key="group_name"
            >
              <div class="col-2 text-h5">
                {{
                  group_name.endsWith("-tf")
                    ? group_name.slice(0, -3)
                    : group_name
                }}
              </div>
              <div class="col-10 row q-col-gutter-xs items-center">
                <template v-for="(prop, prop_key) in props" :key="prop_key">
                  <template v-if="'sub_list' in prop">
                    <div class="col-6 col-md-2">
                      <q-select
                        :filled="
                          property_filter[group_name][prop_key].length !== 0
                        "
                        :outlined="
                          property_filter[group_name][prop_key].length === 0
                        "
                        v-model="property_filter[group_name][prop_key]"
                        multiple
                        :options="
                          ((prop) => {
                            return Object.keys(prop).map((key) => {
                              return {
                                option: key,
                                label: prop[key],
                              };
                            });
                          })(prop['sub_list'])
                        "
                        :label="prop['text']"
                        @remove="removePropertyFilter"
                        @update:model-value="
                          updatePropertyFilterList(
                            prop_key,
                            property_filter[group_name][prop_key],
                            false,
                            prop['text'],
                            group_name
                          )
                        "
                      />
                    </div>
                  </template>
                  <div v-else class="col-6 col-md-2" :key="prop_key">
                    <template v-if="group_name.endsWith('-tf')">
                      <q-checkbox
                        v-model="property_filter[group_name][prop_key]"
                        :label="prop['text']"
                        @update:model-value="
                          updatePropertyFilterList(
                            prop_key,
                            property_filter[group_name][prop_key],
                            false,
                            prop['text'],
                            group_name
                          )
                        "
                      />
                    </template>
                    <template v-else>
                      <q-input
                        v-if="prop_key == 'dealer_price'"
                        v-model="property_filter[group_name][prop_key]"
                        label="经销商报价（万）"
                        @blur="
                          updatePropertyFilterList(
                            prop_key,
                            property_filter[group_name][prop_key],
                            true,
                            prop['text'],
                            group_name
                          )
                        "
                      />
                      <q-select
                        v-else
                        :filled="
                          property_filter[group_name][prop_key].length !== 0
                        "
                        :outlined="
                          property_filter[group_name][prop_key].length === 0
                        "
                        v-model="property_filter[group_name][prop_key]"
                        multiple
                        :options="property_value_set[prop_key]"
                        :label="prop['text']"
                        @remove="removePropertyFilter"
                        @update:model-value="
                          updatePropertyFilterList(
                            prop_key,
                            property_filter[group_name][prop_key],
                            true,
                            prop['text'],
                            group_name
                          )
                        "
                      />
                    </template>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <!-- property filter end -->
        <!-- car information start -->
        <div id="carInfo" class="row q-col-gutter-md items-stretch">
          <div
            :class="{
              'col-12': true,
              'col-md-3': true,
            }"
            v-show="hidden_series[series_id] === undefined"
            v-for="(value, series_id) in data.car_info_filtered"
            :key="series_id"
          >
            <q-intersection once :threshold="0.3">
              <q-card class="full-height">
                <q-card-section class="row items-center">
                  <div class="col-8 offset-2 text-h6 text-center">
                    {{ value["sub_brand_name"] }} - {{ value["series_name"] }}
                  </div>
                  <div class="col-2 text-right">
                    <q-btn
                      flat
                      round
                      color="red"
                      icon="delete"
                      @click="hidden_series[series_id] = value['series_name']"
                    />
                  </div>
                </q-card-section>
                <img
                  :src="data.cover_urls[series_id]"
                  :style="{ width: '70%', margin: 'auto' }"
                />
                <q-card-section>
                  <q-list bordered separator></q-list>
                  <q-item
                    v-for="info in value['car_list']"
                    :key="info['car_id']"
                  >
                    <q-item-section>
                      <q-item-label :title="info['car_id']">
                        <q-checkbox
                          v-model="selected_car_ids"
                          :val="info['car_id']"
                          :label="`${info['car_year']} ${info['car_name']}`"
                        />
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label caption>{{
                        info["dealer_price"]
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>
            </q-intersection>
          </div>
        </div>
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
import { defineComponent, reactive, ref } from "vue";
import { scroll, useQuasar } from "quasar";
const { getScrollTarget, setVerticalScrollPosition } = scroll;

import * as dfd from "danfojs";

import property_group from "../../public/assets/property_group.json";
import cover_urls from "../../public/assets/cover_urls.json";

export default defineComponent({
  name: "MainLayout",

  setup() {
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
    worker.onmessage = (e) => {
      car_info = new dfd.DataFrame(e.data.car_info);
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
        json_links: ["/assets/car_info_1.json"],
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
    property_group["基本信息"]["car_year"] = { text: "年份" };
    property_group["基本信息"]["dealer_price"] = { text: "经销商报价" };
    let property_group_refined = JSON.parse(JSON.stringify(property_group));

    const data = reactive({
      property_group_refined: property_group_refined,
      cover_urls: cover_urls,
      car_info_filtered: {},
      series_num: 0,
      car_num: 0,
    });
    const selected_car_ids = ref([]);
    const hidden_series = ref({});
    const property_value_set = ref({});

    let property_filter_tmp = {};
    for (let group_name in property_group) {
      property_filter_tmp[group_name] = {};
      for (const [prop_name, prop] of Object.entries(
        property_group[group_name]
      )) {
        if (group_name.endsWith("-tf")) {
          if ("sub_list" in prop) {
            property_filter_tmp[group_name][prop_name] = [];
          } else {
            property_filter_tmp[group_name][prop_name] = false;
          }
        } else {
          property_filter_tmp[group_name][prop_name] = [];
        }
      }
    }

    const property_filter = reactive(property_filter_tmp);

    const property_filter_list = reactive({});

    const property_filter_display = reactive({});

    const updatePropertyFilterList = (
      key,
      value,
      isRawValue,
      text,
      group_name
    ) => {
      if (key === "dealer_price") {
        property_filter_list[key] = { isRawValue: isRawValue, value: value };
        property_filter_display[key] = {
          text: value.includes("-")
            ? `${text}: ${value} 万`
            : `${text}: ${value} 万以下`,
          isRawValue: isRawValue,
          group_name: group_name,
        };
      } else if (typeof value === "boolean") {
        if (value === true) {
          property_filter_list[key] = true;
          property_filter_display[key] = {
            key: key,
            text: text,
            group_name: group_name,
          };
        } else {
          delete property_filter_list[key];
          delete property_filter_display[key];
        }
      } else if (typeof value === "object") {
        if (value.length === 0) {
          delete property_filter_list[key];
          delete property_filter_display[key];
        } else {
          property_filter_list[key] = { isRawValue: isRawValue, value: value };
          if (isRawValue) {
            for (const value_item of value) {
              property_filter_display[value_item] = {
                text: `${text}: ${value_item}`,
                isRawValue: isRawValue,
                key: key,
                group_name: group_name,
              };
            }
          } else {
            for (const value_item of value) {
              property_filter_display[value_item["option"]] = {
                text: `${text}: ${value_item["label"]}`,
                isRawValue: isRawValue,
                parent: key,
                group_name: group_name,
              };
            }
          }
        }
      }
      applyFilter();
    };

    const removePropertyFilter = (detail) => {
      if (typeof detail["value"] === "string")
        delete property_filter_display[detail["value"]];
      else delete property_filter_display[detail["value"]["option"]];
    };

    const removeProperty = (key, value) => {
      delete property_filter_display[key];
      if ("isRawValue" in value) {
        if (value["isRawValue"] === true) {
          if (key === "dealer_price") {
            delete property_filter_list[key];
            property_filter[value["group_name"]][key] = null;
          } else {
            const idx =
              property_filter[value["group_name"]][value["key"]].indexOf(key);
            property_filter[value["group_name"]][value["key"]].splice(idx, 1);
          }
        } else {
          let length =
            property_filter[value["group_name"]][value["parent"]].length;
          for (let i = 0; i < length; ++i) {
            const ele =
              property_filter[value["group_name"]][value["parent"]][i];
            if (ele["option"] === key) {
              property_filter[value["group_name"]][value["parent"]].splice(
                i,
                1
              );
              break;
            }
          }
        }
      } else {
        delete property_filter_list[key];
        property_filter[value["group_name"]][key] = false;
      }
      applyFilter();
    };

    const scrollToCarInfo = () => {
      applyFilter();
      let ele_head = document.getElementById("head");
      const ele = document.getElementById("carInfo");
      const target = getScrollTarget(ele);
      const offset = ele.offsetTop - ele_head.offsetHeight;
      const duration = 300;
      setVerticalScrollPosition(target, offset, duration);
    };

    const applyFilter = () => {
      let car_info_filter_df = car_info;
      if (Object.keys(property_filter_list).length > 0) {
        Object.keys(property_filter_list).forEach((key) => {
          if (car_info_filter_df.size == 0) return;
          car_info_filter_df.reset_index({ inplace: true });
          const value = property_filter_list[key];
          if (value === true) {
            car_info_filter_df = car_info_filter_df.iloc({
              rows: car_info_filter_df[key].str.includes("●"),
            });
          } else if (value.isRawValue) {
            if (key === "dealer_price") {
              if (value.value.includes("-")) {
                const numbers = value.value.split("-");
                const low = parseFloat(numbers[0]);
                const high = parseFloat(numbers[1]);
                car_info_filter_df = car_info_filter_df.iloc({
                  rows: car_info_filter_df["dealer_price_value"].le(high),
                });
                if (car_info_filter_df.size == 0) return;
                car_info_filter_df.reset_index({ inplace: true });
                car_info_filter_df = car_info_filter_df.iloc({
                  rows: car_info_filter_df["dealer_price_value"].ge(low),
                });
              } else {
                car_info_filter_df = car_info_filter_df.iloc({
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
                car_info_filter_df = car_info_filter_df.iloc({
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
              car_info_filter_df = car_info_filter_df.iloc({
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
    const drawer_left = ref(false);
    return {
      data,
      drawer_left,
      selected_car_ids,
      hidden_series,
      property_filter,
      property_filter_list,
      property_filter_display,
      property_value_set,
      updatePropertyFilterList,
      removePropertyFilter,
      removeProperty,
      scrollToCarInfo,
      applyFilter,
    };
  },
});
</script>
