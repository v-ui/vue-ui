<template>
  <b-card>
    <template #header>
      <b-nav
        v-model="pickerType"
        class="card-header-tabs"
        :list="navList"
        tabs
      />
    </template>
    <address-country
      v-if="pickerType === enumTypeStatus.country"
      v-model="selectedValue"
      :list="list"
      :primary-key="primaryKey"
      @item:click="changePickerType"
    />
    <address-temp
      v-else
      v-model="selectedValue"
      :list="list"
      :primary-key="primaryKey"
      display-name="name"
      @item:click="changePickerType"
    />
  </b-card>
</template>

<script>
import util from "@/components/util/index.js";

import AddressTemp from './Basic/address-temp'
import AddressCountry from './Basic/address-country'
import BCard from '@/components/base/Card/b-card.vue'
import BNav from '@/components/base/Navigation/Nav/b-nav.vue'

export default {
  name: 'BAddress',
  components: { AddressTemp, AddressCountry, BCard, BNav, },
  mixins: [ util.mixins.address.base, ],
  computed: {
    navList: function() {
      let country = this.hideCountry ? false : { value: this.enumTypeStatus.country, label: this.countryLabel || '国家', }
      let province = this.hideProvince ? false : { value: this.enumTypeStatus.province, label: this.provinceLabel || '省级', }
      let city = this.hideCity ? false : { value: this.enumTypeStatus.city, label: this.cityLabel || '地级', }
      let area = this.hideArea ? false : { value: this.enumTypeStatus.area, label: this.areaLabel || '县级', }
      let town = this.hideTown ? false : { value: this.enumTypeStatus.town, label: this.townLabel || '乡级', }

      return [ country, province, city, area, town ].filter(e => e)
    },
  },
}
</script>
