<template functional>
  <label
    v-if="slots().default"
    class="col-form-label"
    :class="[ data.staticClass, {[`col-form-label-${props.size}`]: props.size}]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot>{{ props.label }}</slot>
  </label>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: 'BFormLanel',
  props: {
    label: util.props.String,
    size: util.props.size,
  },
}
</script>
