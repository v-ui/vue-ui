<template>
  <div class="p-2">
    <header v-if="!hideHeader">
      <slot name="header" />
      <hr class="my-1">
    </header>
    <div v-if="!hideInfo">
      <slot name="info" />
    </div>
    <slot v-else />
    <slot name="footer" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: 'BasicDataTemp',
  props: {
    hideInfo: util.props.Boolean,
    hideHeader: util.props.Boolean,
  },
}
</script>
