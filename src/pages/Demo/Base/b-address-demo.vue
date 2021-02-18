<template>
  <div>
    <h2>b-address</h2>
    <hr>
    type:
    country {{ country }}
    <b-address type="country" v-model="country" />
    province {{ value }}
    <b-address type="province" v-model="value" />
    city {{ value }}
    <b-address type="city" v-model="value" />
    area {{ value }}
    <b-address type="area" v-model="value" />
    town(default) {{ value }}
    <b-address type="town" v-model="value" />
  </div>
</template>

<script>
import BAddress from '@/components/base/Address/b-address.vue'

export default {
  name: 'b-address-demo',
  components: { BAddress, },
  data() {
    return {
      country: { "id": 45, "cnname": "中国", "name": "China", "fullname": "the People's Republic of China", "alpha2": "CN", "alpha3": "CHN", "numeric": 156 },
      value: { "code": "150524200000", "name": "茫汗苏木", "province": "15", "city": "05", "area": "24", "town": "200000" },
    }
  },
}
</script>
