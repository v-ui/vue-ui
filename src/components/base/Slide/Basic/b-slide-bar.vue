<template>
  <div class="round rounded-pill" :style="`width: ${value || 0}%`" />
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: 'b-slide-bar',
  props: {
    value: {
      ...util.props.UNumber,
      validator: (value) => util.props.UNumber.validator(value) && value <= 100,
    },
  },
}
</script>
