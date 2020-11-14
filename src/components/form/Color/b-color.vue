<template>
  <b-drop-panel placeholder="请选择">
    <div style="width: 240px">
      <div class="d-flex px-2 py-1">
        <strong class="w-100 text-center">Header</strong>
        cotroller
      </div>
      <hr class="my-1">
      <div class="d-flex p-1">
        <b-color-panel class="m-1" />
        <b-color-bar class="m-1" />
      </div>
      <hr class="my-1">
      <div class="p-1">
        <b-color-check active color="transparent" class="m-1" />
        <b-color-check active color="#0f0" class="m-1" />
        <b-color-check class="m-1" />
        <b-color-check class="m-1" />
        <b-color-check class="m-1" />
        <b-color-check class="m-1" />
        <b-color-check class="m-1" />
        <b-color-check class="m-1" />
        <b-color-check class="m-1" />
        <b-color-check class="m-1" />
        <b-color-check class="m-1" />
        <b-color-check class="m-1" />
        <b-color-check class="m-1" />
        <b-color-check class="m-1" />
        <b-color-check class="m-1" />
      </div>
    </div>
  </b-drop-panel>
</template>

<script>
import BDropPanel from "@/components/base/DropdownPanel/b-dropdown-panel.vue";

import BColorBar from './Basic/b-color-bar.vue'
import BColorPanel from './Basic/b-color-panel'

import BColorCheck from './b-color-check'

export default {
  name: "BColor",
  components: { BDropPanel, BColorBar, BColorPanel, BColorCheck },
  data() {
    return {

    };
  },
  mounted() {
  },
};
</script>
