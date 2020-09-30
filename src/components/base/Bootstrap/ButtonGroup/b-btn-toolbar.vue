<template functional>
  <div
    v-if="slots().default"
    class="btn-toolbar"
    role="toolbar"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: "BBtnToolbar"
};
</script>
