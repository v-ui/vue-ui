<template>
  <span
    v-if="$slots.default"
    class="visually-hidden visually-hidden-focusable"
  >
    <slot />
  </span>
</template>

<script>
export default {
  name: "BasicSrMsg"
};
</script>
