<template functional>
  <div v-if="slots().default" class="card-columns" v-bind="data.attrs" v-on="listeners">
    <slot />
  </div>
</template>
<script>
export default {
  name: "b-card-columns"
};
</script>
