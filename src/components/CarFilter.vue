<template>
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
              group_name.endsWith("-tf") ? group_name.slice(0, -3) : group_name
            }}
          </div>
          <div class="col-10 row q-gutter-xs items-center">
            <template v-for="(prop, prop_key) in props" :key="prop_key">
              <template v-if="'sub_list' in prop">
                <!-- <div
                  v-for="(sub_prop_name, sub_prop_key) in prop['sub_list']"
                  :key="sub_prop_key"
                  class="col-2"
                >
                  <q-select
                    filled
                    v-model="property_filter[group_name][sub_prop_key]"
                    multiple
                    :options="property_value_set[sub_prop_key]"
                    :label="prop['text'] + ' - ' + sub_prop_name"
                  />
                </div> -->
                <div class="col-2">
                  <q-select
                    filled
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
                    @update:model-value="
                      updatePropertyFilterList(
                        prop_key,
                        property_filter[group_name][prop_key]
                      )
                    "
                  />
                </div>
              </template>
              <div v-else class="col-2" :key="prop_key">
                <!-- <q-checkbox
                  v-model="property_filter[group_name][prop['key']]"
                  @update:model-value="
                    updatePropertyFilterList(
                      prop['key'],
                      property_filter[group_name][prop['key']]
                    )
                  "
                  :label="prop['text']"
                /> -->
                <template v-if="group_name.endsWith('-tf')">
                  <q-checkbox
                    v-model="property_filter[group_name][prop_key]"
                    :label="prop['text']"
                    @update:model-value="
                      updatePropertyFilterList(
                        prop_key,
                        property_filter[group_name][prop_key]
                      )
                    "
                  />
                </template>
                <template v-else>
                  <q-select
                    filled
                    v-model="property_filter[group_name][prop_key]"
                    multiple
                    :options="property_value_set[prop_key]"
                    :label="prop['text']"
                    @update:model-value="
                      updatePropertyFilterList(
                        prop_key,
                        property_filter[group_name][prop_key],
                        true
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
    <div class="row items-center q-pa-sm">
      <div class="col-11">
        共 {{ data.series_num }} 车系 {{ data.car_num }} 车型
      </div>
      <q-btn class="col-1" color="primary" @click="applyFilter" label="Apply" />
    </div>
    <div class="row q-col-gutter-md items-stretch">
      <div
        class="col-3"
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
                <q-item-label caption>{{ info["dealer_price"] }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";

import * as dfd from "danfojs";

import property_group from "../assets/property_group.json";
import car_info from "../assets/car_info.json";

export default defineComponent({
  name: "CarFilter",

  setup() {
    const car_info_df = new dfd.DataFrame(car_info);
    let property_group_refined = JSON.parse(JSON.stringify(property_group));
    // refind property_group
    // delete property_group_refined["基本信息"];
    // delete property_group_refined["车身"];
    // delete property_group_refined["变速箱"];
    // delete property_group_refined["电动机"];
    property_group_refined["基本信息"]["car_year"] = {text: "年份"};

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

    const updatePropertyFilterList = (key, value, isRawValue) => {
      if (typeof value === "boolean") {
        if (value === true) {
          property_filter_list[key] = true;
        } else {
          delete property_filter_list[key];
        }
      } else if (typeof value === "object") {
        if (value.length === 0) {
          delete property_filter_list[key];
        } else {
          property_filter_list[key] = { isRawValue: isRawValue, value: value };
        }
      }
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
            let index_series = null;
            for (const v of value.value) {
              const tmp_idx = car_info_filter_df[key].eq(v);
              index_series =
                index_series === null ? tmp_idx : index_series.or(tmp_idx);
            }
            car_info_filter_df = car_info_filter_df.iloc({
              rows: index_series,
            });
          } else {
            let index_series = null;
            for (const v of value.value) {
              const tmp_idx = car_info_filter_df[v["option"]].str.includes("●");
              index_series =
                index_series === null ? tmp_idx : index_series.or(tmp_idx);
            }
            car_info_filter_df = car_info_filter_df.iloc({
              rows: index_series,
            });
          }
        });
      }
      if (car_info_filter_df.size == 0) {
        data["car_info_filtered"] = {};
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
      property_value_set,
      updatePropertyFilterList,
      applyFilter,
    };
  },
});
</script>
