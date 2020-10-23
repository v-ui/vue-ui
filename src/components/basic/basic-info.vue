<template>
  <small
    v-if="info"
    class="form-text"
    :class="['text-' + textColor,]"
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
    textColor: {
      ...util.props.textColor,
      default: "muted"
    }
  }
};
</script>
