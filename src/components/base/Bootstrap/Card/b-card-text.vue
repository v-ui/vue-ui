<template functional>
  <p v-if="slots().default" class="card-text" v-bind="data.attrs" v-on="listeners">
    <slot />
  </p>
</template>
<script>
export default {
  name: "b-card-text"
};
</script>
