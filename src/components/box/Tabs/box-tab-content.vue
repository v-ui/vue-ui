<template>
  <div v-if="$slots.default" class="tab-content">
    <slot />
  </div>
</template>

<script>
export default {
  nmae: "box-tab-content"
};
</script>
