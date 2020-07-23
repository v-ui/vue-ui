<template>
  <b-button
    class="rounded-pill bg-transparent my-1"
    :class="objClass"
    style="min-width: 3em"
    :disabled="disabled"
    :aria-selected="isSelected"
    @click.stop="$emit('click', item)"
  >
    {{ value }}
  </b-button>
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
      return this.item[this.primaryKey] || this.item.value || this.item.label || this.item
    },
    objClass: function() {
      const s = this.isSelected
        ? "border border-primary text-primary"
        : "border-0 text-body";
      const c = 12 % this.colCount == 0 ? `col-${12 / this.colCount}` : "col-auto";
      return s + " " + c;
    },
  }
};
</script>
