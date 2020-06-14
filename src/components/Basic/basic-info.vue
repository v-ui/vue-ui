<template functional>
  <small v-if="props.info" class="form-text" :class="'text-' + props.textColor" v-bind="data.attrs" v-on="listeners">
    {{ props.info }}
  </small>
</template>
<script>
import util from "@/components/util/index.js";

export default {
  name: "basic-info",
  props: {
    info: util.props.String,
    textColor: {
      ...util.props.textColor,
      default: "muted"
    }
  }
};
</script>
