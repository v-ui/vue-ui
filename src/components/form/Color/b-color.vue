<template>
  <b-drop-panel
    placeholder="请选择"
    :can-hide="false"
    :disabled="disabled"
  >
    <template #trigger>
      <b-color-label class="w-100" :color="color" />
    </template>
    <b-color-picker :mode="mode" :hideInput="hideInput" v-model="color" />
  </b-drop-panel>
</template>

<script>
// https://wiki.developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Colors/Color_picker_tool
// https://codepen.io/pen/?&editable=true=https%3A%2F%2Fwiki.developer.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2FCSS_Colors%2FColor_picker_tool
import util from "@/components/util";

import BDropPanel from "@/components/base/DropdownPanel/b-dropdown-panel.vue";
import BColorLabel from './Basic/b-color-label'
import BColorPicker from './Picker/b-color-picker'

export default {
  name: "b-color",
  components: {  BDropPanel, BColorLabel, BColorPicker, },
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
      default: '#ff0000',
    },
    mode: {
      type: String,
      default: 'hsl',
    },
    hideInput: util.props.Boolean,
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
