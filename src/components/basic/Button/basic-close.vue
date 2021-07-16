<template>
  <button
    type="button"
    class="btn-close"
    :class="{'btn-close-white': white}"
    aria-label="Close"
  />
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: 'basic-close',
  props: {
    disabled: util.props.Boolean,
    white: util.props.Boolean,
  },
}
</script>
