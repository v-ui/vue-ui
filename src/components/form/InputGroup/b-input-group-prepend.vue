<template>
  <span
    v-if="$slots.default"
    class="input-group-prepend"
  >
    <slot />
  </span>
</template>

<script>
export default {
  name: 'BInputGroupPrepend',
}
</script>
