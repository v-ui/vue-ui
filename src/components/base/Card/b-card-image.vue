<template>
  <img
    :src="src"
    :class="objClass"
    :alt="alt"
  />
</template>
<script>
import util from "@/components/util/index.js";

export default {
  name: "BCardImage",
  props: {
    src: util.props.src,
    set: {
      type: String,
      default: 'top',
      validator: value => ['', 'top', 'bottom'].includes(value),
    },
    alt: util.props.String,
  },
  computed: {
    objClass: function() {
      let set = this.set ? `card-img-${this.set}` : 'card-img'
      return `${set}`
    }
  }
};
</script>
