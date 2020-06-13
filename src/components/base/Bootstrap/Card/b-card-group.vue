<template functional>
  <div v-if="slots().default" class="card-group" v-bind="data.attrs" v-on="listeners">
    <slot />
  </div>
</template>
<script>
export default {
  name: "b-card-group"
};
</script>
