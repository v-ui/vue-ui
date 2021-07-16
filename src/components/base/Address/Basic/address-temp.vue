<template>
  <b-grid-row
    :list="list"
    :primary-key="key"
    :display-name="display"
  >
    <template #item="{ item }">
      <slot
        name="item"
        :item="item"
      >
        <address-item
          :item="item"
          :primary-key="key"
          :display-name="display"
          :selected="selectedValue"
          :disabled="item.disabled"
          @item:click="itemClick"
        />
      </slot>
    </template>
  </b-grid-row>
</template>

<script>
import util from "@/components/util/index.js";

import AddressItem from './address-item'
import BGridRow from '@/components/base/Grid/b-grid-row.vue'

export default {
  name: 'AddressTemp',
  components: { AddressItem, BGridRow },
  mixins: [ util.mixins.select.select, ],
  props: {
    list: util.props.Array,
  },
  methods: {
    itemClick: function(item) {
      this.selectedValue = item
      this.$emit('item:click')
    }
  },
}
</script>
