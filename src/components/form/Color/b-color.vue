<template>
  <b-drop-panel placeholder="请选择" :canHide="false">
    <div style="width: 240px">
      <div class="d-flex align-items-center px-2 py-1">
        <div class="d-flex align-items-center justify-content-center w-100">
          <span class="d-inline-block border border-primary m-1" style="width: 20px; height: 20px;" :style="`background: ${cssColor}`"  />
          <strong class="text-center">{{ cssColor }}</strong>
        </div>
        cotroller
      </div>
      <hr class="my-1">
      <div class="d-flex p-1">
        <b-color-panel class="m-1" :style="{ background: color(selected2.h, 1, 0.5, 'hsl') }" v-model="sl"/>
        <b-color-bar class="m-1" v-model="selected2.h" />
      </div>
      <hr class="my-1">
      <b-color-list :list="list" v-model="selected" />
    </div>
  </b-drop-panel>
</template>

<script>
import util from "@/components/util";

import BDropPanel from "@/components/base/DropdownPanel/b-dropdown-panel.vue";

import BColorBar from './Basic/b-color-bar.vue'
import BColorPanel from './Basic/b-color-panel'

import BColorList from './Basic/b-color-list.vue'

export default {
  name: "BColor",
  components: { BDropPanel, BColorBar, BColorPanel, BColorList },
  mixins: [ util.mixins.color.base ],
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
      selected2: { h: 100, s: 1, l: .5 },
      sl: null,
    };
  },
  computed: {
    cssColor: function() {
      return this.color(this.selected2).css('hsl')
    },
  },
  watch: {
    selected2: {
      handler: function() {
        this.sl = { s: this.selected2.s, l: this.selected2.l }
      },
      deep: true,
    },
    sl: {
      handler: function() {
        this.selected2.s = this.sl.s
        this.selected2.l = this.sl.l
      },
      deep: true,
    },
  },
  mounted() {
    this.sl = { s: this.selected2.s, l: this.selected2.l }
  },
};
</script>
