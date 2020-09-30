<template functional>
  <div
    v-if="slots().default"
    class="tab-content"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot />
  </div>
</template>

<script>
export default {
  nmae: "box-tab-content"
};
</script>
