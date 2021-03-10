<template>
  <b-color-bar
    v-model="selectedValue"
    :max="255"
    :style="barStyle"
    :status="status"
    :disabled="disabled"
  />
</template>

<script>
import util from '@/components/util'

import BColorBar from '../../Basic/b-color-bar'

export default {
  name: 'BColorGreenBar',
  components: { BColorBar, },
  mixins: [ util.mixins.color.colorBar, ],
  computed: {
    barStyle: function() {
      return `background-image: linear-gradient(to ${this.status === 'row' ? 'right': 'bottom'}, rgb(0, 0, 0), rgb(0, 255, 0));`
    },
  },
}
</script>
