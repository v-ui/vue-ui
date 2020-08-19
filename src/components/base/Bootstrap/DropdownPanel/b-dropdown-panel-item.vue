<template>
  <b-button
    class="rounded-pill bg-transparent my-1"
    :class="objClass"
    style="min-width: 3em"
    :disabled="disabled"
    :aria-selected="isSelected || (item.status && item.status.selected)"
    @click.stop="$emit('click', item)"
  >{{ value }}</b-button>
</template>

<script>
import util from "@/components/util/index.js";

import BButton from "@/components/Basic/Button/basic-button.vue";

export default {
  name: "b-dropdown-panel-item",
  components: { BButton },
  mixins: [ util.mixins.select.selectItem, ],
  props: {
    disabled: util.props.Boolean,
    colCount: util.props.UInt,
  },
  computed: {
    value: function() {
      return this.item.label || this.item[this.primaryKey] || this.item.value || this.item
    },
    objClass: function() {
      let s = ''
      let sta = ''
      if (this.item.status) {
        if (this.item.status.now) sta = 'border-0 text-danger '
        if (this.item.status.start || this.item.status.end) sta = 'border border-primary text-info '
        if (this.item.status.between) sta = 'text-secondary '
        if (this.item.status.selected) sta = "border border-primary text-primary "
        if (sta.length === 0) sta = 'border-0 text-body'
      } else {
        s = this.isSelected
          ? "border border-primary text-primary"
          : "border-0 text-body";
      }
      const c = 12 % this.colCount == 0 ? `col-${12 / this.colCount}` : "col-auto";
      return s + " " + c + ' ' + sta;
    },
  }
};
</script>
