<template>
  <b-button
    class="my-1"
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
      let base = 'bg-transparent rounded-pill'
      let select = ''
      let status = ''
      if (this.item.status) {
        if (this.item.status.now) status = 'border-0 bg-transparent text-danger '
        if (this.item.status.start || this.item.status.end) status = 'border border-primary text-info '
        if (this.item.status.between) status = 'rounded-0 bg-primary text-secondary '
        if (this.item.status.selected) status = "bg-transparent text-primary "
        if (status.length === 0) status = 'border-0 bg-transparent text-body'
      } else {
        select = this.isSelected
          ? "border border-primary text-primary"
          : "border-0 text-body";
      }
      const col = 12 % this.colCount == 0 ? `col-${12 / this.colCount}` : "col-auto";
      return `${base} ${select} ${col} ${status}`
    },
  }
};
</script>
