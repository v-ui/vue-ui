<template>
  <div>
    <h2>b-address</h2>
    <hr>
    type:
    country {{ country }}
    <b-address
      v-model="country"
      type="country"
    />
    province {{ province }}
    <b-address
      v-model="province"
      type="province"
    />
    city {{ city }}
    <b-address
      v-model="city"
      type="city"
    />
    area {{ area }}
    <b-address
      v-model="area"
      type="area"
    />
    town(default) {{ town }}
    <b-address
      v-model="town"
      type="town"
    />
  </div>
</template>

<script>
import BAddress from '@/components/base/Address/b-address.vue'

export default {
  name: 'BAddressDemo',
  components: { BAddress, },
  data() {
    return {
      country: { "id": 45, "cnname": "中国", "name": "China", "fullname": "the People's Republic of China", "alpha2": "CN", "alpha3": "CHN", "numeric": 156 },
      province: { "code": "150524200000", "name": "茫汗苏木", "province": "15", "city": "05", "area": "24", "town": "200000" },
      city: { "code": "150524200000", "name": "茫汗苏木", "province": "15", "city": "05", "area": "24", "town": "200000" },
      area: { "code": "150524200000", "name": "茫汗苏木", "province": "15", "city": "05", "area": "24", "town": "200000" },
      town: { "code": "150524200000", "name": "茫汗苏木", "province": "15", "city": "05", "area": "24", "town": "200000" },
    }
  },
}
</script>
