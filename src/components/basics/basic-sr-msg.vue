<template functional>
  <span
    v-if="slots().default"
    class="sr-only sr-only-focusable"
  >
    <slot />
  </span>
</template>

<script>
export default {
  name: "BasicSrMsg"
};
</script>
