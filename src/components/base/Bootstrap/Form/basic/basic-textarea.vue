<template>
  <textarea
  v-model="value"
    :class="[cClass, readonlyClass]"
    :style="cStyle"
    :rows="Number(rows)"
    :cols="Number(cols)"
    :readonly="readonly"
    :aria-readonly="readonly"
    :disabled="disabled"
    :aria-disabled="disabled"
    v-on="inputListeners"
  />
</template>
<script>
import util from "@/components/util/index.js";

export default {
  name: "basic-textarea",
  mixins: [
    util.mixins.form.base,
    util.mixins.form.readonly,
  ],
  props: {
    value: util.props.String,
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
}
</script>

