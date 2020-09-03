<template>
  <b-button
    class="rounded-pill my-1"
    :class="objClass"
    style="min-width: 3em"
    :style="objStyle"
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
      let select = ''
      let status = ''
      if (this.item.status) {
        if (this.item.status.now) status = 'border-0 bg-transparent text-danger '
        if (this.item.status.start || this.item.status.end || this.item.status.between) status = 'rounded-0 bg-primary'
        if (this.item.status.selected) status = "bg-transparent text-primary "
        if (status.length === 0) status = 'border-0 bg-transparent text-body'
      } else {
        select = this.isSelected
          ? "border bg-transparent border-primary text-primary"
          : "border-0 bg-transparent text-body";
      }
      const col = 12 % this.colCount == 0 ? `col-${12 / this.colCount}` : "col-auto";
      return `${select} ${col} ${status}`
    },
    objStyle: function () {
      return this.item && this.item.status && this.item.status.between ? 'opacity: .3' : ''
    }
  }
};
</script>
