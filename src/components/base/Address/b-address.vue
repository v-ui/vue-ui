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
    <address-temp
      v-model="selectedValue"
      :list="list"
      :primary-key="primaryKey"
      @item:click="itemClick"
    />
  </b-card>
</template>

<script>
import util from "@/components/util/index.js";

import AddressTemp from './Basic/address-temp'
import BCard from '@/components/base/Card/b-card.vue'
import BNav from '@/components/base/Navigation/Nav/b-nav.vue'
export default {
  name: 'b-address',
  components: { AddressTemp, BCard, BNav, },
  mixins: [
    util.mixins.address.type,
    util.mixins.address.country,
    util.mixins.address.data,
    util.mixins.address.province,
    util.mixins.address.city,
    util.mixins.address.area,
    util.mixins.address.town,
  ],
  data() {
    return {
      list: [],
      primaryKey: 'code',
      selectedValue: '',
      selected: '',
    }
  },
  computed: {
    navList: function() {
      let country = { value: this.enumTypeStatus.country, label: '国家', }
      let province = { value: this.enumTypeStatus.province, label: '省级', }
      let city = { value: this.enumTypeStatus.city, label: '地级', }
      let area = { value: this.enumTypeStatus.area, label: '县级', }
      let town = { value: this.enumTypeStatus.town, label: '乡级', }

      let array = [ country, province, city, area, town ]

      if (this.hideCountry) array.splice(array.findIndex(e => e && e.value === this.enumTypeStatus.country), 1)
      if (this.hideProvince) array.splice(array.findIndex(e => e && e.value === this.enumTypeStatus.province), 1)
      if (this.hideCity) array.splice(array.findIndex(e => e && e.value === this.enumTypeStatus.city), 1)
      if (this.hideArea) array.splice(array.findIndex(e => e && e.value === this.enumTypeStatus.area), 1)
      if (this.hideTown) array.splice(array.findIndex(e => e && e.value === this.enumTypeStatus.town), 1)

      return array
    },
    selectedObj: function() {
      if (!this.selectedValue) return {}
      return {
        country: null,
        province: this.selectedValue.province,
        city: this.selectedValue.city,
        area: this.selectedValue.area,
        town: this.selectedValue.town,
      }
    },
    hideCountry: function() {
      return this.type !== this.enumTypeStatus.country
    },
    hideProvince: function() {
      return !this.hideCountry
    },
    hideCity: function() {
      return this.hideProvince || this.type === this.enumTypeStatus.province
            || this.noProvinceChild || this.noCityHasArea
    },
    hideArea: function() {
      return this.noCityHasArea
              ? this.hideProvince || this.type === this.enumTypeStatus.city
              : this.hideCity || this.type === this.enumTypeStatus.city || this.noCityChild
    },
    hideTown: function() {
      return this.hideArea || this.type === this.enumTypeStatus.area
            || this.noTown
    },
    getCountry: function() {
      return this.country
    },
    getProvince: function() {
      return this.data.filter(e => e && !e.city)
    },
    noProvinceChild: function() {
      return !this.data.some(e => e && e.province === this.selectedObj.province && (e.city || e.area || e.town))
    },
    getCity: function() {
      if (!this.selectedObj.province) return []
      return this.data.filter(e =>
          e && e.province === this.selectedObj.province
            && e.city && !e.area && !e.town
        )
    },
    noCityChild: function() {
      return !this.data.some(e =>
        e && e.province === this.selectedObj.province
          && e.city === this.selectedObj.city
          && (e.area || e.town))
    },
    noCityHasArea: function() {
      return this.getCity.length === 0 && this.data.some(e =>
          e && e.province === this.selectedObj.province
            && e.area && !e.town
        )
    },
    getArea: function() {
      if (this.noCityHasArea) return this.data.filter(e =>
          e && e.province === this.selectedObj.province
            && e.area && !e.town
        )
      if (!this.selectedObj.city) return []
      return this.data.filter(e =>
          e && e.province === this.selectedObj.province
            && e.city === this.selectedObj.city
            && e.area && !e.town
        )
    },
    noTown: function() {
      return !this.town.some(e =>
          e && e.province === this.selectedObj.province
            && e.city === this.selectedObj.city
            && e.area === this.selectedObj.area
        )
    },
    getTown: function() {
      if (!this.selectedObj.area) return []
      return this.town.filter(e =>
          e && e.province === this.selectedObj.province
            && e.city === this.selectedObj.city
            && e.area === this.selectedObj.area
        )
    },
  },
   watch: {
    'pickerType.value': function(value) {
      if (!value) return
      this.pickerType = value
      this.init(value)
    },
    pickerType: function(value) {
      this.init(value)
    },
  },
  mounted() {
    this.pickerType = this.type !== this.enumTypeStatus.country ? this.enumTypeStatus.province : this.enumTypeStatus.country
    this.init(this.pickerType)
  },
  methods: {
    init: function(value) {
      debugger
      if (value !== this.enumTypeStatus.country) this.primaryKey = value

      switch(value) {
        case this.enumTypeStatus.country:
          this.primaryKey = 'id'
          this.list = this.getCountry
          break
        case this.enumTypeStatus.province:
          this.list = this.getProvince
          break
        case this.enumTypeStatus.city:
          this.list = this.getCity
          break
        case this.enumTypeStatus.area:
          this.list = this.getArea
          break
        case this.enumTypeStatus.town:
          this.list = this.getTown
          break
      }
    },
    itemClick: async function() {
      await this.$nextTick()
      debugger
      switch(this.pickerType?.value || this.pickerType) {
        case this.enumTypeStatus.country:
          if (this.hideProvince) return
          this.pickerType = this.enumTypeStatus.province
          break
        case this.enumTypeStatus.province:
          if (this.noCityHasArea) this.pickerType = this.enumTypeStatus.area
          if (this.hideCity) return
          this.pickerType = this.enumTypeStatus.city
          break
        case this.enumTypeStatus.city:
          if (this.hideArea) return
          this.pickerType = this.enumTypeStatus.area
          break
        case this.enumTypeStatus.area:
          if (this.hideTown) return
          this.pickerType = this.enumTypeStatus.town
          break
      }
      await this.init(this.pickerType)
    },
  },
}
</script>
