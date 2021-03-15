<template>
  <b-grid-row
    :list="list"
    :primary-key="key"
    :display-name="displayKey"
  >
    <template #item="{ item }">
      <slot name="item" :item="item">
        <address-item
          :item="item"
          :primary-key="key"
          :display-name="displayKey"
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
  name: 'address-temp',
  components: { AddressItem, BGridRow },
  mixins: [ util.mixins.select.select, ],
  methods: {
    itemClick: function(item) {
      this.selectedValue = item
      this.$emit('item:click')
    }
  },
}
</script>
