<template>
  <span class="row text-center">
    <item
      v-for="(item, index) in items"
      :key="index"
      class="text-center"
      :text="item.text"
      :value="item.value"
      :select="item.select"
      :col-count="colCount"
      :disabled="item.disabled || disabled"
      @click="click"
    />
  </span>
</template>

<script>
import util from "@/components/util/index.js";

import item from "./b-dropdownpicker-item";

export default {
  name: "b-dropdownpicker-row",
  components: { item },
  props: {
    items: util.props.Array,
    disabled: util.props.Boolean,
    colCount: util.props.UInt,
  },
  methods: {
    click: function(value) {
      this.$emit("click", value);
    }
  }
};
</script>
