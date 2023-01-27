<template>
  <div class="row">
    <div class="column">
      <div
        class="col-auto row items-center q-pb-md"
        v-for="(props, group_name) in property_group_refined"
        :key="group_name"
      >
        <div class="col-2 text-h5">
          {{
            group_name.endsWith("-tf") ? group_name.slice(0, -3) : group_name
          }}
        </div>
        <div class="col-10 row q-col-gutter-xs items-center">
          <template v-for="(prop, prop_key) in props" :key="prop_key">
            <template v-if="'sub_list' in prop">
              <div class="col-6 col-md-2">
                <q-select
                  :filled="property_filter[group_name][prop_key].length !== 0"
                  :outlined="property_filter[group_name][prop_key].length === 0"
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
                  @update:model-value="null"
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
                <q-input
                  v-else-if="prop_key == 'length'"
                  v-model="property_filter[group_name][prop_key]"
                  :label="prop['text']"
                  @update:model-value="null"
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
                <q-input
                  v-else-if="prop_key == 'width'"
                  v-model="property_filter[group_name][prop_key]"
                  :label="prop['text']"
                  @update:model-value="null"
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
                <q-input
                  v-else-if="prop_key == 'height'"
                  v-model="property_filter[group_name][prop_key]"
                  :label="prop['text']"
                  @update:model-value="null"
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
                  :filled="property_filter[group_name][prop_key].length !== 0"
                  :outlined="property_filter[group_name][prop_key].length === 0"
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
</template>

<script>
import { defineComponent, reactive, ref, computed } from "vue";
import { useStore } from "vuex";

import property_group from "../../public/assets/property_group.json";

export default defineComponent({
  name: "PropertyFilter",
  props: {
    property_value_set: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    property_group["基本信息"]["car_year"] = { text: "年份" };
    property_group["基本信息"]["dealer_price"] = { text: "经销商报价" };
    let property_group_refined = ref(
      JSON.parse(JSON.stringify(property_group))
    );

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
    const property_filter = reactive(
      JSON.parse(JSON.stringify(property_filter_tmp))
    );

    const removeProperty = (key, value) => {
      if ("isRawValue" in value) {
        if (value["isRawValue"] === true) {
          if (key === "dealer_price" || key === "length" || key === "width" || key === "height") {
            store.commit("globaldata/deletePropertyFilterList", key);
            property_filter[value["group_name"]][key] = null;
          } else {
            property_filter[value["group_name"]][value["key"]] =
              property_filter[value["group_name"]][value["key"]].filter(
                (ele) => {
                  return ele != key;
                }
              );
            store.commit("globaldata/deletePropertyFilterListByKey", {
              group_name: value["group_name"],
              item_name: value["key"],
              value: key,
            });
          }
        } else {
          property_filter[value["group_name"]][value["parent"]] =
            property_filter[value["group_name"]][value["parent"]].filter(
              (ele) => {
                return ele["option"] != key;
              }
            );
          store.commit("globaldata/deletePropertyFilterListByKey", {
            group_name: value["group_name"],
            item_name: value["parent"],
            value: key,
          });
        }
      } else {
        store.commit("globaldata/deletePropertyFilterList", key);
        property_filter[value["group_name"]][key] = false;
      }
      store.commit("globaldata/deletePropertyFilterDisplay", key);
      emit("applyFilter");
    };

    const updatePropertyFilterList = (
      key,
      value,
      isRawValue,
      text,
      group_name
    ) => {
      store.commit("globaldata/updatePropertyFilterList", {
        key: key,
        value: value,
        isRawValue: isRawValue,
        text: text,
        group_name: group_name,
      });
      emit("applyFilter");
    };

    const removePropertyFilter = (detail) => {
      store.commit("globaldata/removePropertyFilter", { detail: detail });
      // 这里不触发applyFilter，数据更新后对应组件对调用updatePropertyFilterList更新
    };
    return {
      property_group_refined,
      property_filter,
      updatePropertyFilterList,
      removePropertyFilter,
      removeProperty,
    };
  },
});
</script>
