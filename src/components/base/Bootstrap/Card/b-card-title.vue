<template functional>
  <h5 v-if="slots().default" class="card-title" v-bind="data.attrs" v-on="listeners">
    <slot />
  </h5>
</template>
<script>
export default {
  mame: "b-card-title"
};
</script>
