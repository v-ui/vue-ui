<template>
  <div
    :class="objClass"
    role="status"
  >
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "BLoading",
  props: {
    color: {
      ...util.props.textColor,
      default: ""
    },
    status: {
      type: String,
      default: "border",
      validator: value => ["border", "grow"].includes(value)
    },
    size: {
      type: String,
      default: "",
      validator: value => ['', "sm"].includes(value)
    },
  },
  computed: {
    objClass: function() {
      let color = this.color ? `text-${this.color}` : "";
      let size = this.size ? `spinner-${this.status}-${this.size}` : "";
      return `spinner-${this.status} ${size} ${color}`;
    }
  }
};
</script>
