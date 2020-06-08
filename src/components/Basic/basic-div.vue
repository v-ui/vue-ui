<template>
  <div v-show="$slots.default" >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'basic-div'
}
</script>
