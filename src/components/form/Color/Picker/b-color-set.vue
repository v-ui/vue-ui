<template>
  <div class="container cannt-hide py-1">
    <div class="row">
      <basic-button
        v-for="(item, index) in list"
        :key="index"
        class="col m-1"
        color="light"
        :value="item"
        :active="isChecked(item)"
        @click="checkedValues = item" />
    </div>
  </div>
</template>

<script>
import util from '@/components/util'

import BasicButton from '@/components/basic/Button/basic-button.vue'

export default {
  name: 'b-color-set',
  components: { BasicButton, },
  mixins: [ util.mixins.select.check ],
}
</script>
