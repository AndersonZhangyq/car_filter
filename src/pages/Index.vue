<template>
  <q-page class="flex flex-center">
    <car-filter></car-filter>
  </q-page>
</template>

<script>
import CarFilter from "components/CarFilter.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  components: { CarFilter },
});
</script>
