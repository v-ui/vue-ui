<template>
  <b-button
    class="rounded-pill my-1 p-1"
    style="min-width: 3em"
    :class="[item.objClass, objClass]"
    :style="item.objStyle"
    :disabled="disabled"
    :aria-selected="isSelected || (item.status && item.status.selected)"
    @click.native="$emit('item:click', item)"
  >
    {{ value }}
    <b-info
      :info="item.info"
      class="m-0"
      :info-color="item.infoColor || 'muted'"
      style="font-size: 0.5em"
    />
  </b-button>
</template>

<script>
import util from "@/components/util/index.js";

import BButton from "@/components/basic/Button/basic-button.vue";
import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BDropdownPanelItem",
  components: { BButton, BInfo },
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
      if (!this.item.objClass) {
        select = this.isSelected
          ? "bg-transparent text-body"
          : "border-0 bg-transparent text-body";
      }
      const col = 12 % this.colCount == 0 ? `col-${12 / this.colCount}` : "col-auto";
      return `${select} ${col}`
    },
  }
};
</script>
