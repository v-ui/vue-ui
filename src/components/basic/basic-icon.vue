<template>
  <i
    v-if="icon"
    class="d-flex align-items-center"
    :class="color ? 'text-' + color : ''"
  >
    <svg
      class="svg-icon"
      focusable="false"
      role="img"
      aria-hidden="true"
    >
      <use :xlink:href="iconName" />
    </svg>
  </i>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: 'BasicIcon',
  props: {
    icon: {
      ...util.props.string,
      required: true
    },
    color: util.props.textColor,
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`
    }
  }
}
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
