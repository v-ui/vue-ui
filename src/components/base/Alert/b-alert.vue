<template>
  <div
    v-show="$slots.default && isShow"
    class="alert fade show position-absolute"
    :class="objClass"
    style="min-width: 300px;"
    :style="objStyle"
    role="alert"
  >
    <h5
      v-if="$slots.header"
      class="alert-heading"
    >
      <slot name="header" />
      <button
        v-if="dismissible"
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      />
    </h5>
    <div
      class="overflow-auto"
      style="max-height: 200px;"
    >
      <slot />
    </div>
    <div v-if="$slots.footer">
      <hr>
      <p class="mb-0">
        <slot name="footer" />
      </p>
    </div>
    <button
      v-if="dismissible && !$slots.header"
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    />
  </div>
</template>
<script>
import util from "@/components/util/index.js";

export default {
  name: "BAlert",
  props: {
    show: util.props.Boolean,
    color: util.props.color,
    size: util.props.size,
    position: util.props.position,
    dismissible: util.props.Boolean,
  },
  data() {
    return {
      isShow: this.show,
    };
  },
  computed: {
    objClass: function() {
      let color = this.color ? `alert-${this.color}` : ''
      let dismissible = `${this.dismissible ? "alert-dismissible" : ""}`
      let size = ''
      if (this.size === 'lg') size = 'w-75'
      else if (this.size == 'sm') size = 'w-25'
      else size = 'w-50'
      return `${color} ${dismissible} ${size}`
    },
    objStyle: function() {
      let position = {};
      switch (this.position) {
        case "top-center":
          position = { left: `${document.body.offsetWidth / 4}px` };
          break;
        case "top-end":
          position = { right: 0 };
          break;
        case "bottom-start":
          position = { bottom: 0, left: 0 };
          break;
        case "bottom-center":
          position = { bottom: 0, left: `${document.body.offsetWidth / 4}px` };
          break;
        case "bottom-end":
          position = { bottom: 0, right: 0 };
          break;
      }
      return position
    },
  },
  watch: {
    show: function(newVal) {
      this.isShow = newVal;
    },
  },
};
</script>
