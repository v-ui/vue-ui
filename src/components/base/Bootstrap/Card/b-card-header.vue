<template>
  <div v-show="$slots.default" class="card-header">
    <slot />
  </div>
</template>

<script>
export default {
  name: "b-card-header"
};
</script>
