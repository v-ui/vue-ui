
<template>
  <img :src="src" :class="isTop" :alt="alt" />
</template>
<script>
import util from "@/components/util/index.js";

export default {
  name: "b-card-image",
  props: {
    src: util.props.src,
    top: {
      type: Boolean,
      default: true
    },
    alt: {
      type: String
    }
  },
  computed: {
    isTop: function() {
      return this.top ? "card-img-top" : "card-img";
    }
  }
};
</script>
