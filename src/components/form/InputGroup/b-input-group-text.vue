<template>
  <span
    v-if="$slots.default"
    class="input-group-text"
  >
    <slot />
  </span>
</template>

<script>
export default {
  name: 'BInputGroupText',
}
</script>
