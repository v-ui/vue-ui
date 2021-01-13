<template>
  <b-button
    class="rounded-pill my-1 p-1"
    style="min-width: 2.2em"
    :class="objClass"
    :style="objStyle"
    :disabled="disabled"
    :aria-selected="isSelected || (item.status && item.status.selected)"
    @click.native="$emit('item:click', item)"
  >
    {{ value }}
    <b-info
      :info="item.info"
      class="m-0"
      :info-color="isSelected || (item.status && item.status.selected) ? 'white' : 'muted'"
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
      let status = ''
      if (this.item.status) {
        if (this.item.status.now) status = 'border-0 bg-transparent text-danger '
        if (this.item.status.start || this.item.status.end || this.item.status.between) status = 'rounded-0 bg-primary'
        if (this.item.status.selected) status = this.item.status.now ? "border-0 bg-danger text-white" : "text-white"
        if (status.length === 0) status = 'border-0 bg-transparent text-body'
      } else {
        select = this.isSelected
          ? ""
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
