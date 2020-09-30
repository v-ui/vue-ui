<template>
  <input
    ref="text"
    :type="cImputType"
    :class="[cClass, readonlyClass]"
    :size="Number(length)"
    :readonly="readonly"
    :aria-readonly="readonly"
    :disabled="disabled"
    :aria-disabled="disabled"
    v-on="inputListeners"
  >
</template>
<script>
import util from "@/components/util/index.js";

export default {
  name: "BasicText",
  mixins: [util.mixins.form.base, util.mixins.form.readonly],
  props: {
    type: {
      type: String,
      default: "text",
      validator: value => {
        // 这个值必须匹配下列字符串中的一个
        return [
          "text",
          "password",
          "search",
          "email",
          "url",
          "ip",
          "tel",
          "phone",
          "number"
        ].includes(value);
      }
    },
    length: util.props.UInt
  },
  computed: {
    cImputType: function() {
      if (this.type == "phone") return "tel";
      if (this.type == "ip") return "text";
      return this.type;
    }
  }
};
</script>
<style scoped>
/* 隐藏数字控件的默认上下箭头 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: test-field;
}
</style>
