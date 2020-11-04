<template>
  <svg class="svg-icon" focusable="false" role="img" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: 'basic-icon',
  props: {
    icon: {
      ...util.props.string,
      required: true
    }
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
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
