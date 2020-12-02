<template>
  <i>
    <svg class="svg-icon" focusable="false" role="img" aria-hidden="true">
      <use :xlink:href="iconName"></use>
    </svg>
  </i>
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
  fill: currentColor;
  overflow: hidden;
}
</style>
