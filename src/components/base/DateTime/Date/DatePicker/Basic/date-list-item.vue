<template>
  <b-dropdown-item
    :active="item.status.selected"
    :disabled="disabled || item.disabled"
    @click.native="$emit('item:click', item)"
  >
    <basic-label
      :label="item.label"
      :info="item.info"
      :label-color="color"
      strong
    />
  </b-dropdown-item>
</template>

<script>
import util from "@/components/util/index.js";

import BDropdownItem from '@/components/base/Dropdown/b-dropdown-item.vue';
import BasicLabel from '@/components/basic/basic-label.vue'

export default {
  name: 'DateListItem',
  components: { BDropdownItem, BasicLabel, },
  props: {
    item: [ Object, String, Number, ],
    disabled: util.props.Boolean,
  },
  computed: {
    color: function() {
      if (!this.item.status) return ''
      if (this.item.status.now) return 'danger'
      return ''
    },
  },
}
</script>
