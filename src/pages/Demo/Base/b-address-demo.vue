<template>
  <div>
    <h2>b-address</h2>
    <hr>
    type:
    country {{ country }}
    <b-address type="country" v-model="country" />
    province {{ province }}
    <b-address type="province" v-model="province" />
    city {{ city }}
    <b-address type="city" v-model="city" />
    area {{ area }}
    <b-address type="area" v-model="area" />
    town(default) {{ town }}
    <b-address type="town" v-model="town" />
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
