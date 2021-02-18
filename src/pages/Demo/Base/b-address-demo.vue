<template>
  <div>
    <h2>b-address</h2>
    <hr>
    type:
    country
    <b-address type="country" />
    province
    <b-address type="province" />
    city
    <b-address type="city" />
    area
    <b-address type="area" />
    town(default)
    <b-address type="town" />
  </div>
</template>

<script>
import BAddress from '@/components/base/Address/b-address.vue'

export default {
  name: 'b-address-demo',
  components: { BAddress, },
}
</script>
