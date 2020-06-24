<template functional>
  <div v-if="slots().default" class="input-group" :class="[ data.staticClass, {[`input-group-${props.size}`]: props.size}]" v-bind="data.attrs" v-on="listeners" >
    <slot />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: 'b-input-group',
  props: {
    size: util.props.size,
  },
}
</script>
