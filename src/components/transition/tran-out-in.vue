<template functional>
  <transition
    name="out-in-fade"
    mode="out-in"
  >
    <slot />
  </transition>
</template>

<script>
export default {
  name: "TranOutIn"
};
</script>
<style>
.out-in-fade-enter-active,
.out-in-fade-leave-active {
  transition: opacity 0.3s ease;
}
.out-in-fade-enter, .out-in-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
