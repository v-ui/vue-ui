<template>
  <div>
    <b-step-circle />
    <font>{{ title }}</font>
    <b-info />
  </div>
</template>

<script>

import BStepCircle from './b-step-circle'
import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: 'b-step-item',
  components: { BStepCircle, BInfo, },
}
</script>
