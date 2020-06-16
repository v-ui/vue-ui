<template>
  <div :class="objClass" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "b-loading",
  props: {
    color: {
      ...util.props.textColor,
      default: "body"
    },
    status: {
      type: String,
      default: "border",
      validator: value => ["border", "grow"].includes(value)
    },
    size: {
      type: String,
      default: "border",
      validator: value => ["sm"].includes(value)
    },
  },
  computed: {
    objClass: function() {
      let color = this.color ? `text-${this.color}` : "";
      let size = this.size ? `spinner-border-${this.size}` : "";
      return `spinner-${this.status} ${color} ${size}`;
    }
  }
};
</script>
