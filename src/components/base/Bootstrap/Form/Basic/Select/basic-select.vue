<template>
  <select
    class="custom-select"
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
        :selected="selected.length == 0"
        :aria-selected="selected.length == 0"
        v-text="nullValue"
      />
      <basic-select-option
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        :isMultiple="isMultiple"
        :selected="selectedValue"
      />
    </slot>
  </select>
</template>

<script>
import util from "@/components/util/index.js";

import BasicSelectOption from "./basic-select-option.vue";

export default {
  name: "basic-select",
  components: { BasicSelectOption },
  mixins: [util.mixins.form.base, util.mixins.select.select],
  props: {
    primaryKey: {
      ...util.props.String,
      default: "value"
    },
    disabled: util.props.Boolean,
    hideNull: util.props.Boolean,
    row: {
      type: [Number, String],
      default: function() {
        return this.isMultiple ? this.list.length + 1 : null;
      }
    }
  },
  computed: {
    sizeClass: function() {
      return this.size ? `custom-select-${this.size}` : "";
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
      this.selectedValue = this.isMultiple
        ? Array.prototype.filter
            .call(event.target.options, o => o.selected && o.value)
            .map(o => o.value == this.nullValue ? null : list.find(e => (e.value || e) == o.value)
            ).filter(e => e)
        : list.find(e => (e.value || e) == event.target.value);
    }
  }
};
</script>

