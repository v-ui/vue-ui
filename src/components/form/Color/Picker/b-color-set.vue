<template>
  <div class="container cannt-hide py-1">
    <div class="row">
      <basic-button
        v-for="(item, index) in list"
        :key="index"
        class="col m-1"
        outline
        :value="item"
        :active="isSelected(item)"
        @click="selectedValue = item"
      />
    </div>
  </div>
</template>

<script>
import util from '@/components/util'

import BasicButton from '@/components/basic/Button/basic-button.vue'

export default {
  name: 'BColorSet',
  components: { BasicButton, },
  mixins: [ util.mixins.select.check ],
}
</script>
