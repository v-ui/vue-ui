<template>
  <BasicDiv v-show="$slots.default" class="card-columns">
    <slot />
  </BasicDiv>
</template>
<script>
export default {
  name: "b-card-columns"
};
</script>
