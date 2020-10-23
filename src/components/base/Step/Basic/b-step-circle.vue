<template>
  <span class="d-flex rounded-circle align-items-center">
    <b-ico class="m-auto" :class="iconClass" style="width: 50%; height: 50%" />
  </span>
</template>

<script>
import config from "@/config/index.js";
import util from "@/components/util/index.js";

export default {
  name: 'b-step-circle',
  props: {
    icon: util.props.String,
    status: {
      type: String,
      validator: val =>
        [
          "",
          "info",
          "system",
          "issue",
          "warning",
          "error",
          "success",
          "danger"
        ].includes(val)
    }
  },
  computed: {
    o: function() {
      return Object.getOwnPropertyDescriptor(config.ui.status, this.status);
    },
    iconClass: function() {
      let icon = this.icon,
        color = "";
      if (this.o && this.o.value) {
        (icon = this.o.value.icon), (color = this.o.value.color);
      }
      return `${icon} text-${color}`;
    },
  },
}
</script>
