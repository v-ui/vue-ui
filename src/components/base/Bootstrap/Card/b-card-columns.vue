<template>
  <div v-show="$slots.default" class="card-columns">
    <slot />
  </div>
</template>
<script>
export default {
  name: "b-card-columns"
};
</script>
