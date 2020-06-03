<template>
  <div v-show="$slots.default" class="card-group">
    <slot />
  </div>
</template>
<script>
export default {
  name: "b-card-group"
};
</script>
