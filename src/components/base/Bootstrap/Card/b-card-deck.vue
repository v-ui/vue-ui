<template>
  <div v-show="$slots.default" class="card-deck">
    <slot />
  </div>
</template>
<script>
export default {
  name: "b-card-deck"
};
</script>
