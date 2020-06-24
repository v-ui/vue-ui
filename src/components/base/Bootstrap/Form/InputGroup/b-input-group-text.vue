<template functional>
  <span v-if="slots().default" class="input-group-text" :class="data.staticClass" v-bind="data.attrs" v-on="listeners">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'b-input-group-text',
}
</script>
