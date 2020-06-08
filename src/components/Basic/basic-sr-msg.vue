<template>
  <span class="sr-only" v-show="$slots.default">
    <slot />
  </span>
</template>

<script>
export default {
  name: "basic-sr-msg"
};
</script>
