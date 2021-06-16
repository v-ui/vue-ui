<template>
  <select
    class="form-select"
    :class="[cClass, sizeClass]"
    :size="row"
    :multiple="isMultiple"
    :disabled="disabled"
    :aria-disabled="disabled"
    v-on="inputListeners"
    @change.stop="change"
  >
    <slot>
      <option
        v-if="!hideNull"
        :selected="selectedValue && selectedValue.length == 0"
        :aria-selected="selectedValue && selectedValue.length == 0"
        v-text="nullValue"
      />
      <basic-select-option
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        :multiple="isMultiple"
        :primary-key="key"
        :display-name="displayKey"
        :selected="selectedValue"
      />
    </slot>
  </select>
</template>

<script>
import util from "@/components/util/index.js";

import BasicSelectOption from "./basic-select-option.vue";
export default {
  name: "BasicSelect",
  components: { BasicSelectOption },
  mixins: [util.mixins.form.base, util.mixins.select.select],
  props: {
    disabled: util.props.Boolean,
    hideNull: util.props.Boolean,
    row: {
      type: [Number, String],
      default: function() {
        return this.multiple ? this.list.length + 1 : null;
      }
    }
  },
  computed: {
    sizeClass: function() {
      return this.size ? `form-select-${this.size}` : "";
    }
  },
  methods: {
    change: function(event) {
      // ie 和 edge 不支持 flat
      // this.list.map(e => e.children ? [...e.children] : e).flat())
      // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#替代方案

      let list = this.list
        .map(e => (e.children ? [...e.children] : e))
        .reduce((acc, val) => acc.concat(val), []);

      if (this.isMultiple) {
        let value = Array.prototype.filter
          .call(event.target.options, o => o.selected)
          .map(e => this.getKey(e))
        this.selectedValue = list.filter(e => value.some(o => this.getKey(e) === o))
      } else {
        let item = Array.prototype.find
          .call(event.target.options, e => e.selected)
        this.selectedValue = list.find(e => this.getKey(e) === this.getKey(item)) || ''

      }
    }
  }
};
</script>

