<template>
  <b-grid-row
    :list="list"
    :primary-key="primaryKey"
  >
    <template #item="{ item }">
      <address-item
        :item="item"
        :primary-key="primaryKey"
        :selected="selectedValues"
        :disabled="item.disabled"
        @item:click="itemClick"
      />
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
      this.selectedValues = item
      this.$emit('item:click')
    }
  },
}
</script>
