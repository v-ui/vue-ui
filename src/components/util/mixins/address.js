import {
  data as adData,
  level as adLevel,
  country as adCountry,
  province as adProvince,
  city as adCity,
  area as adArea,
  town as adTown,
} from './plugin/administrative'

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
      default: "province",
      validator: value => ["country", "province", "city", "area", "town"].includes(value),
    },
  },
  data() {
    return {
      pickerType: this.type,
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

export default {
  data,
  level,

  country,
  province,
  city,
  area,
  town,

  type,
}
