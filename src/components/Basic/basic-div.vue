<template functional>
  <div v-show="slots().default" v-bind="data.attrs" v-on="listeners">
    <slot />
  </div>
</template>

<script>
export default {
  name: "basic-div"
};
</script>
