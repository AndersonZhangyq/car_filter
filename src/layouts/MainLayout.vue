<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-blue-grey-1" id="head">
      <q-toolbar class="q-pa-md">
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
    <q-page-container>
      <div class="q-pa-md">
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
                    <div class="col-md-2 col-sm-4">
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
                  <div v-else class="col-md-2 col-sm-4" :key="prop_key">
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
                        type="number"
                        v-model.number="property_filter[group_name][prop_key]"
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
        <div id="carInfo" class="row q-col-gutter-md items-stretch">
          <div
            class="col-md-3 col-sm-6"
            v-for="(infos, series_name) in data.car_info_filtered"
            :key="series_name"
          >
            <q-card class="full-height">
              <q-card-section>
                <div class="text-h6 text-center">
                  {{ series_name }}
                </div>
              </q-card-section>
              <q-card-section>
                <q-list bordered separator></q-list>
                <q-item v-for="info in infos" :key="info['car_name']">
                  <q-item-section>
                    <q-item-label> {{ info["car_name"] }}</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-item-label caption>{{
                      info["dealer_price"]
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { scroll } from "quasar";
const { getScrollTarget, setVerticalScrollPosition } = scroll;

import * as dfd from "danfojs";

import property_group from "../assets/property_group.json";
import car_info from "../assets/car_info.json";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const car_info_df = new dfd.DataFrame(car_info);
    property_group["基本信息"]["car_year"] = { text: "年份" };
    property_group["基本信息"]["dealer_price"] = { text: "经销商报价" };
    let property_group_refined = JSON.parse(JSON.stringify(property_group));
    // refind property_group
    // delete property_group_refined["基本信息"];
    // delete property_group_refined["车身"];
    // delete property_group_refined["变速箱"];
    // delete property_group_refined["电动机"];

    const data = reactive({
      property_group_refined: property_group_refined,
      car_info: car_info_df,
      car_info_filtered: {},
      series_num: 0,
      car_num: 0,
    });
    let property_value_set = {};
    for (const column_name of car_info_df.columns) {
      const cur_unique_series = car_info_df[column_name].unique();
      property_value_set[column_name] = cur_unique_series.to_json({
        download: false,
      })[0];
    }
    property_value_set = reactive(property_value_set);

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
      if (typeof value === "boolean") {
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
      } else if (typeof value === "number") {
        property_filter_list[key] = { isRawValue: isRawValue, value: value };
        property_filter_display[key] = {
          text: `${text}: ${value} 万以下`,
          isRawValue: isRawValue,
          group_name: group_name,
        };
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
          const idx =
            property_filter[value["group_name"]][value["parent"]].indexOf(key);
          property_filter[value["group_name"]][value["parent"]].splice(idx, 1);
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
      let car_info_filter_df = car_info_df;
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
              car_info_filter_df = car_info_filter_df.iloc({
                rows: car_info_filter_df["dealer_price_value"].le(value.value),
              });
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
        "series_name",
        "car_name",
        "dealer_price",
      ];
      car_info_filter_df = car_info_filter_df.loc({
        columns: car_info_filter_col_name,
      });
      const car_info_filter_groupBy = car_info_filter_df.groupby([
        "series_name",
      ]);
      const car_info_filter_col_dict = car_info_filter_groupBy.col_dict;
      let tmp_car_info_filtered = {};
      for (const series_name in car_info_filter_col_dict) {
        const tmp = [];
        car_info_filter_col_dict[series_name].forEach((ele) => {
          tmp.push({
            car_name: ele[1],
            dealer_price: ele[2],
          });
        });
        tmp_car_info_filtered[series_name] = tmp;
      }
      data["car_info_filtered"] = tmp_car_info_filtered;
      data["series_num"] = Object.keys(tmp_car_info_filtered).length;
      data["car_num"] = car_info_filter_groupBy.data.length;
    };
    applyFilter();
    return {
      data,
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
