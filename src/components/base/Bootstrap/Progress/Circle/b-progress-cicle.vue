<template>
  <svg version="1.1" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M100,20 A80,80 -30 1,1 99,20"
      fill="none"
      class="progress-bg"
      stroke-width="10"
      stroke-linecap="round"
    />
    <path
      d="M100,20 A80,80 -30 0,1 180,100"
      fill="none"
      class="stroke-primary"
      stroke-width="10"
      stroke-linecap="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'b-progress-circle',
}
</script>

<style lang="scss" scoped>
@import "../../../../../../node_modules/bootstrap/scss/functions";
@import "../../../../../../node_modules/bootstrap/scss/variables";
@import "../../../../../../node_modules/bootstrap/scss/mixins";

.progress-bg {
  stroke: $progress-bg;
}

// Generate `.fill-*` color utilities
@each $color, $value in $theme-colors {
  .fill-#{$color} {
    fill: $value;
  }
}

// Generate `.stroke-*` color utilities
@each $color, $value in $theme-colors {
  .stroke-#{$color} {
    stroke: $value;
  }
}

// Optional
@import "../../../../../../node_modules/bootstrap/scss/root";
@import "../../../../../../node_modules/bootstrap/scss/reboot";
@import "../../../../../../node_modules/bootstrap/scss/type";
</style>
