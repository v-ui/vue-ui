<template functional>
  <transition name="fade">
    <slot />
  </transition>
</template>

<script>
export default {
  name: "TranDrop"
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
