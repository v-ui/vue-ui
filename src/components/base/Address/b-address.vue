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
      v-model="selectedValues"
      :list="list"
      :primary-key="primaryKey"
      @item:click="itemClick"
    />
    <address-temp
      v-else
      v-model="selectedValues"
      :list="list"
      :primary-key="primaryKey"
      @item:click="itemClick"
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
  name: 'b-address',
  components: { AddressTemp, AddressCountry, BCard, BNav, },
  mixins: [
    util.mixins.address.type,
    util.mixins.address.country,
    util.mixins.address.data,
    util.mixins.address.town,
  ],
  model: {
    prop: 'selected',
    event: 'select:selected',
  },
  props: {
    selected: util.props.Object,
  },
  data() {
    return {
      list: [],
      primaryKey: 'code',
      selectedValues: this.selected,
    }
  },
  computed: {
    navList: function() {
      let country = this.hideCountry ? false : { value: this.enumTypeStatus.country, label: this.countryLabel || '国家', }
      let province = this.hideProvince ? false : { value: this.enumTypeStatus.province, label: this.provinceLabel || '省级', }
      let city = this.hideCity ? false : { value: this.enumTypeStatus.city, label: this.cityLabel || '地级', }
      let area = this.hideArea ? false : { value: this.enumTypeStatus.area, label: this.areaLabel || '县级', }
      let town = this.hideTown ? false : { value: this.enumTypeStatus.town, label: this.townLabel || '乡级', }

      return [ country, province, city, area, town ].filter(e => e)
    },
    selectedObj: function() {
      if (!this.selectedValues) return {}
      return {
        country: this.selectedValues.id,
        province: this.selectedValues.province,
        city: this.selectedValues.city,
        area: this.selectedValues.area,
        town: this.selectedValues.town,
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
              ? this.hideProvince || this.type === this.enumTypeStatus.province || this.type === this.enumTypeStatus.city
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
    countryLabel: function() {
      let item = this.getCountry.find(e => e && e.id === this.selectedObj.country)
      return item && `${item.cnname}(${item.name})`
    },
    provinceLabel: function() {
      let item = this.getProvince.find(e => e && e.province === this.selectedObj.province)
      return item && item.name
    },
    cityLabel: function() {
      let item = this.getCity.find(e => e && e.city === this.selectedObj.city)
      return item && item.name
    },
    areaLabel: function() {
      let item = this.getArea.find(e => e && e.area === this.selectedObj.area)
      return item && item.name
    },
    townLabel: function() {
      let item = this.getTown.find(e => e && e.town === this.selectedObj.town)
      return item && item.name
    },
    label: function() {
      let country = !this.hideCountry && this.countryLabel || ''
      let provide = !this.hideProvince && this.provinceLabel || ''
      let city = !this.hideCity && this.cityLabel || ''
      let area = !this.hideArea && this.areaLabel || ''
      let town = !this.hideTown && this.townLabel || ''
      return `${country} ${provide} ${city} ${area} ${town}`.trim()
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
    selected: function (value) {
      this.selectedValues = value
    },
    selectedValues: function (value) {
      this.$emit('select:selected', value, )
    },
  },
  mounted() {
    this.pickerType = this.type !== this.enumTypeStatus.country ? this.enumTypeStatus.province : this.enumTypeStatus.country
    this.init(this.pickerType)
  },
  methods: {
    init: function(value) {
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

      switch(this.pickerType?.value || this.pickerType) {
        case this.enumTypeStatus.country:
          if (this.hideProvince) return
          this.pickerType = this.enumTypeStatus.province
          break
        case this.enumTypeStatus.province:
          if (this.noCityHasArea && !this.hideArea) this.pickerType = this.enumTypeStatus.area
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
