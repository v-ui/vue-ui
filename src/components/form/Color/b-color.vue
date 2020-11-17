<template>
  <b-drop-panel placeholder="请选择" :canHide="false">
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
      <b-color-list :list="list" v-model="selected" />
    </div>
  </b-drop-panel>
</template>

<script>
import BDropPanel from "@/components/base/DropdownPanel/b-dropdown-panel.vue";

import BColorBar from './Basic/b-color-bar.vue'
import BColorPanel from './Basic/b-color-panel'

import BColorList from './Basic/b-color-list.vue'

export default {
  name: "BColor",
  components: { BDropPanel, BColorBar, BColorPanel, BColorList },
  data() {
    return {
      list: [
        { color: "transparent", },
        { color: "red", },
        { color: "black", disabled: true, },
        { color: "#ccc", },
        { color: "rgb(0, 0, 0)", },
      ],
      selected: '#ccc',
    };
  },
  mounted() {
  },
};
</script>
