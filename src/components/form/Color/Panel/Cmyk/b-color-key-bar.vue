<template>
  <b-color-bar
    v-model="selectedValue"
    :max="1"
    :style="barStyle"
    :filter="filterStyle"
    :status="status"
    :disabled="disabled"
  />
</template>

<script>
import util from '@/components/util'

import BColorBar from '../../Basic/b-color-bar'

export default {
  name: 'BColorKeyBar',
  components: { BColorBar, },
  mixins: [ util.mixins.color.base, util.mixins.color.colorBar, ],
  computed: {
    barStyle: function() {
      return `background: ${this.color(0, 0, 0, 1, 'cmyk').css()}`
    },
    filterStyle: function() {
      return `background-image: linear-gradient(to ${this.status === 'row' ? 'left': 'top'}, hsla(0, 0%, 100%, 0), #fff);`
    },
  },
}
</script>
