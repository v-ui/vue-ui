<template>
  <b-drop-panel
    placeholder="请选择"
    :can-hide="false"
    :disabled="disabled"
  >
    <template #trigger>
      <div class="d-flex align-items-center w-100">
        <span class="d-inline-block border border-primary m-1" style="width: 20px; height: 20px;" :style="`background: ${color}`"  />
        <strong class="text-center">{{ color }}</strong>
      </div>
    </template>
    <b-color-picker style="width: 240px" v-model="color" />
  </b-drop-panel>
</template>

<script>
// https://wiki.developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Colors/Color_picker_tool
// https://codepen.io/pen/?&editable=true=https%3A%2F%2Fwiki.developer.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2FCSS_Colors%2FColor_picker_tool
import util from "@/components/util";

import BDropPanel from "@/components/base/DropdownPanel/b-dropdown-panel.vue";

import BColorPicker from './Picker/b-color-picker'

export default {
  name: "BColor",
  components: {  BDropPanel, BColorPicker, },
  mixins: [
    util.mixins.color.base,
    util.mixins.form.readonly,
  ],
  model: {
    prop: 'value',
    event: 'drop:changed',
  },
  props: {
    value: {
      type: [ String, Number, Object ],
      default: 'rgb(0, 0, 0)',
    },
  },
  data() {
    return {
      color: this.value
    };
  },
  watch: {
    value: function(value) {
      this.color = value
    },
    color: function(value) {
      this.$emit('drop:changed', value)
    },
  },
};
</script>
