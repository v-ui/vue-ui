<template>
  <small
    v-if="info"
    :class="['text-' + infoColor,]"
  >
    {{ info }}
  </small>
</template>
<script>
import util from "@/components/util/index.js";

export default {
  name: "BasicInfo",
  props: {
    info: util.props.String,
    color: util.props.textColor,
  }
};
</script>
