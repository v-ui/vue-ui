<template>
  <div class="d-flex align-items-center p-1">
    <b-color-check
      v-for="(item, index) in list"
      :key="index"
      :item="item"
      class="m-1"
      primary-key="color"
      :selected="selected"
      :disabled="disabled"
      :aria-disabled="disabled"
      @click="click(item)"
    />
  </div>
</template>

<script>
import util from '@/components/util'

import BColorCheck from './b-color-check'

export default {
  name: 'BColorList',
  components: { BColorCheck, },
  mixins: [ util.mixins.select.select ],
  props: {
    disabled: util.props.Boolean,
  },
  data() {
    return {
      isMultiple: false,
    }
  },
  methods: {
    click: function(item) {
      if (item.disabled || this.disabled) return
      this.selectedValue = item
    },
  },
}
</script>
