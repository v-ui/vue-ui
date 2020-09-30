<template functional>
  <transition-group
    name="staggered-fade"
    tag="div"
    :css="false"
    @:before-enter="beforeEnter"
    @::enter="enter"
    @::leave="leave"
  >
    <slot />
  </transition-group>
</template>

<script>
import Velocity from "velocity-animate";

export default {
  name: "TranList",
  methods: {
    beforeEnter: function(el) {
      el.style.opacity = 0;
      el.style.height = 0;
    },
    enter: function(el, done) {
      var delay = el.dataset.index * 150;
      setTimeout(function() {
        Velocity(el, { opacity: 1, height: "1.6em" }, { complete: done });
      }, delay);
    },
    leave: function(el, done) {
      var delay = el.dataset.index * 150;
      setTimeout(function() {
        Velocity(el, { opacity: 0, height: 0 }, { complete: done });
      }, delay);
    }
  }
};
</script>
