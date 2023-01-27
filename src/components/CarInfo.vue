<template>
  <div id="carInfo" class="row q-col-gutter-md items-stretch">
    <div
      :class="{
        'col-12': true,
        'col-md-3': true,
      }"
      v-for="[series_id, value] of car_info_filtered"
      v-show="hidden_series[series_id] === undefined"
      :key="series_id"
    >
      <q-intersection once :threshold="0.3" class="full-height">
        <q-card class="full-height">
          <q-card-section class="row items-center">
            <div class="col-9 offset-1 text-center">
              <span class="text-h6">{{ value["series_name"] }}</span> <br />
              <span class="text-h8">{{ value["sub_brand_name"] }}</span>
            </div>
            <div class="col-1 text-right">
              <q-btn
                dense
                flat
                round
                color="red"
                icon="delete"
                @click="addHiddenSeries(series_id, value['series_name'])"
              />
            </div>
          </q-card-section>
          <div style="min-height: 44px">
            <p
              v-for="info in value['rank_info']"
              :key="info"
              class="text-subtitle2 q-mb-none text-center"
            >
              {{ info["text"] }}，排名 {{ info["rank"] }} {{ info["explain"] }}
            </p>
          </div>
          <img
            :src="cover_urls[series_id]"
            :style="{ width: '70%', margin: 'auto' }"
          />
          <p class="text-subtitle2 q-mb-none text-center">
            {{ value["car_size"].join(" x ") }}
          </p>
          <q-card-section>
            <q-list bordered separator></q-list>
            <q-item v-for="info in value['car_list']" :key="info['car_id']">
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
                <q-item-label caption>{{ info["dealer_price"] }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </q-intersection>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import cover_urls_json from "../../public/assets/cover_urls.json";
export default defineComponent({
  name: "CarInfo",

  props: {
    car_info_filtered: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();
    const hidden_series = ref(store.state.globaldata.hidden_series);
    const cover_urls = ref(cover_urls_json);
    const selected_car_ids = computed({
      get() {
        return store.state.globaldata.selected_car_ids;
      },
      set(newValue) {
        store.commit("globaldata/updateSelectedCarIds", newValue);
      },
    });
    const addHiddenSeries = (series_id, series_name) => {
      store.commit("globaldata/addHiddenSeries", {
        key: series_id,
        value: series_name,
      });
    };
    return {
      hidden_series,
      selected_car_ids,
      cover_urls,
      addHiddenSeries,
    };
  },
});
</script>
<style>
div.q-intersection > div {
  height: 100% !important;
}
</style>
