<template functional>
  <h6 v-if="slots().default" class="card-subtitle text-muted" v-bind="data.attrs" v-on="listeners">
    <slot />
  </h6>
</template>
<script>
export default {
  mame: "b-card-subtitle"
};
</script>
