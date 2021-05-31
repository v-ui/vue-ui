<template>
  <span
    class="align-middle text-center"
    data-type="serial"
  >
    <slot :value="value">{{ value }}</slot>
  </span>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: 'BTableSerial',
  props: {
    index: util.props.UInt,
    start: {
      ...util.props.UInt,
      default: 1,
    }
  },
  computed: {
    value: function() {
      return this.start + this.index
    },
  },
}
</script>
