<template>
  <b-button
    class="rounded-pill my-1 p-1"
    style="min-width: 2.2em"
    :class="objClass"
    :style="objStyle"
    :disabled="disabled"
    :aria-selected="item.status && item.status.selected"
    @click.native="$emit('item:click', item)"
  >
    {{ item.label }}
  </b-button>
</template>

<script>
import util from "@/components/util/index.js";

import BButton from "@/components/basic/Button/basic-button.vue";
export default {
  name: 'date-panel-item',
  components: { BButton },
  props: {
    item: util.props.Object,
    disabled: util.props.Boolean,
  },
  computed: {
    objClass: function() {
      let style = ''
      if (this.item.status) {
        if (this.item.status.now) style = 'border-0 bg-transparent text-danger '
        if (this.item.status.start || this.item.status.end || this.item.status.between) style = this.item.status.now ? 'border-0 rounded-0 bg-danger' : 'border-0 rounded-0 bg-primary'
        if (this.item.status.selected) style = this.item.status.now ? "border-danger bg-transparent text-danger" : "bg-transparent text-primary"
        if (style.length === 0) style = 'border-0 bg-transparent text-body'
        style += this.item.status.isWeekend ? ' font-weight-light' : ' font-weight-bolder'
      } else {
        style = 'border-0 bg-transparent text-body'
      }
      return `${style}`
    },
    objStyle: function () {
      return this.item.status && this.item.status.between ? 'opacity: .3' : ''
    }
  },
}
</script>
