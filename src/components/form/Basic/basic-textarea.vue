<template>
  <textarea
    :class="[cClass, readonlyClass]"
    :style="cStyle"
    :rows="Number(rows)"
    :cols="Number(cols)"
    :readonly="readonly"
    :aria-readonly="readonly"
    :disabled="disabled"
    :aria-disabled="disabled"
    v-bind="$attrs"
    v-on="inputListeners"
  />
</template>
<script>
import util from "@/components/util/index.js";

export default {
  name: "BasicTextarea",
  mixins: [
    util.mixins.form.base,
    util.mixins.form.readonly,
  ],
  inheritAttrs: false,
  props: {
    rows: {
      ...util.props.UInt,
      default: 3
    },
    cols: util.props.UInt,
    maxlength: {
      ...util.props.UInt,
      default: 1024
    },
    resize: util.props.Boolean
  },
  computed: {
    cStyle: function() {
      return this.resize ? "" : "resize: none";
    }
  },
};
</script>
