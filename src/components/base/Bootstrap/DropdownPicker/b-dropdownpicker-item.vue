<template>
  <b-button
    class="rounded-pill text-monospace bg-white my-1"
    :class="objClass"
    :value="value"
    :disabled="disabled"
    style="min-width: 3em"
    @click.stop="$emit('click', value)"
  >{{ text }}</b-button>
</template>

<script>
import util from "@/components/util/index.js";

import BButton from "@/components/base/Bootstrap/Form/Button/b-button.vue";

export default {
  name: "b-dropdownpicker-item",
  components: { BButton },
  props: {
    value: util.props.String,
    text: util.props.String,
    select: util.props.Boolean,
    disabled: util.props.Boolean,
    colCount: util.props.UInt,
  },
  computed: {
    objClass: function() {
      const s = this.select
        ? "border border-primary text-primary"
        : "border-0 text-body";
      const c =
        12 % this.colCount == 0 ? `col-${12 / this.colCount}` : "col-auto";
      return s + " " + c;
    }
  }
};
</script>
