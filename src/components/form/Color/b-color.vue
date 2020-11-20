<template>
  <b-drop-panel placeholder="请选择" :canHide="false">
    <div style="width: 240px">
      <div class="d-flex align-items-center px-2 py-1">
        <div class="d-flex align-items-center justify-content-center w-100">
          <span class="d-inline-block border border-primary m-1" style="width: 20px; height: 20px;" :style="`background: ${rgb}`"  />
          <strong class="text-center">{{ rgb }}</strong>
        </div>
        cotroller
      </div>
      <hr class="my-1">
      <div class="d-flex p-1">
        <b-color-panel class="m-1" :style="{ background: color(selected.h, 1, 0.5, 'hsl') }" v-model="sl"/>
        <b-color-hue-bar class="m-1" status="column" v-model="selected.h" />
      </div>
      <div class="p-1">
        <b-color-alpha-bar class="m-1" :style="{ background: rgb }" v-model="selected.a" />
      </div>
    </div>
  </b-drop-panel>
</template>

<script>
// https://wiki.developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Colors/Color_picker_tool
// https://codepen.io/pen/?&editable=true=https%3A%2F%2Fwiki.developer.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2FCSS_Colors%2FColor_picker_tool
import util from "@/components/util";

import BDropPanel from "@/components/base/DropdownPanel/b-dropdown-panel.vue";

import BColorHueBar from './Bar/b-color-hue-bar'
import BColorAlphaBar from './Bar/b-color-alpha-bar'
import BColorPanel from './Panel/b-color-panel'

export default {
  name: "BColor",
  components: { BDropPanel, BColorHueBar, BColorAlphaBar, BColorPanel },
  mixins: [ util.mixins.color.base ],
  data() {
    return {
      selected: { h: 100, s: 1, l: .5, a: 1 },
      sl: null,
    };
  },
  computed: {
    rgb: function() {
      return this.color(this.selected).css()
    },
  },
  watch: {
    selected: {
      handler: function() {
        this.sl = { s: this.selected.s, l: this.selected.l }
      },
      deep: true,
    },
    sl: {
      handler: function() {
        this.selected.s = this.sl.s
        this.selected.l = this.sl.l
      },
      deep: true,
    },
  },
  mounted() {
    this.sl = { s: this.selected.s, l: this.selected.l }
  },
};
</script>
