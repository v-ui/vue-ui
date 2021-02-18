<template>
  <div>
    <div v-for="(alpha, index) in alphas" :key="index">
      <h5>{{ alpha.toUpperCase() }}</h5>
      <address-temp
        v-model="selectedValues"
        :list="list.filter(e => e.name[0].toUpperCase() === alpha.toUpperCase())"
        :primary-key="primaryKey"
        @item:click="itemClick"
      >
        <template #item='{ item }'>
          <address-item
            :item="item"
            :primary-key="primaryKey"
            :selected="selectedValues"
            :disabled="item.disabled"
            @item:click="itemClick"
          >
            {{ `${item.cnname}(${item.name})` }}
          </address-item>
        </template>
      </address-temp>
    </div>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import AddressTemp from './address-temp'
import AddressItem from './address-item'
export default {
  name: 'address-country',
  components: { AddressTemp, AddressItem, },
  mixins: [ util.mixins.select.select, ],
  data() {
    return {
      alphas: [
        'a', 'b', 'c', 'd', 'e', 'f', 'g',
        'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z',
      ]
    }
  },
  methods: {
    itemClick: function(item) {
      this.selectedValues = item
      this.$emit('item:click')
    }
  },
}
</script>
