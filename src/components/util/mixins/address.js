import {
  data as adData,
  level as adLevel,
  country as adCountry,
  province as adProvince,
  city as adCity,
  area as adArea,
  town as adTown,
} from './plugin/administrative'

import props from './../props'

const data = {
  computed: {
    data: function() {
      return adData
    }
  },
}

const level = {
  computed: {
    level: function() {
      return adLevel
    }
  },
}

const country = {
  computed: {
    country: function() {
      return adCountry
    }
  },
}

const province = {
  computed: {
    province: function() {
      return adProvince
    }
  },
}

const city = {
  computed: {
    city: function() {
      return adCity
    }
  },
}

const area = {
  computed: {
    area: function() {
      return adArea
    }
  },
}

const town = {
  computed: {
    town: function() {
      return adTown
    }
  },
}

const type = {
  props: {
    type: {
      type: String,
      default: "town",
      validator: value => ["country", "province", "city", "area", "town"].includes(value),
    },
  },
  data() {
    return {
      pickerType: null,
      enumTypeStatus: {
        country: 'country',// 国
        province: 'province',// 省
        city: 'city',// 市
        area: 'area',// 县
        town: 'town',// 镇
      },
    }
  },
}

const base = {
  mixins: [ country, data, town, type ],
  model: {
    prop: 'selected',
    event: 'select:selected',
  },
  props: {
    selected: props.Object,
  },
  data() {
    return {
      list: [],
      primaryKey: 'code',
      selectedValue: []
    }
  },
  computed: {
    selectedObj: function() {
      if (!this.selectedValue) return {}
      return {
        country: this.selectedValue.id,
        province: this.selectedValue.province,
        city: this.selectedValue.city,
        area: this.selectedValue.area,
        town: this.selectedValue.town,
      }
    },
    // show or hide
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
    // get data
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
    // label
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
      this.selectedValue = value
    },
    selectedValue: function (value) {
      this.$emit('select:selected', value )
    },
  },
  mounted() {
    this.selectedValue = this.getValue(this.selected)
    this.pickerType = this.type !== this.enumTypeStatus.country ? this.enumTypeStatus.province : this.enumTypeStatus.country
    this.init(this.pickerType)
  },
  methods: {
    getValue: function(value) {
      let select = []
      switch(this.type) {
        case this.enumTypeStatus.country:
          select = this.country.find(e => e.id === value.id)
          break
        case this.enumTypeStatus.province:
          select = this.data.find(e => e.province === value.province && !e.city && !e.area && !e.town)
          break
        case this.enumTypeStatus.city:
          select = this.data.find(e => e.province === value.province && e.city === value.city && !e.area && !e.town)
          break
        case this.enumTypeStatus.area:
          select = this.data.find(e => e.province === value.province && e.city === value.city && e.area === value.area && !e.town)
          break
        case this.enumTypeStatus.town:
          select = this.town.find(e => e.province === value.province && e.city === value.city && e.area === value.area && e.town === value.town)
          break
      }
      return select
    },
    init: function(value) {
      this.primaryKey = value !== this.enumTypeStatus.country ? 'id' : value

      // this.list = this[`get${value[0].toUpperCase()}${value.slice(1)}`]
      switch(value) {
        case this.enumTypeStatus.country:
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
    changePickerType: async function() {
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

export default {
  data,
  level,

  country,
  province,
  city,
  area,
  town,

  type,
  base,
}
