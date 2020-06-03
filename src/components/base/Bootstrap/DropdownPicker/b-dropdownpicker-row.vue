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
import utilities from "@/components/utilities/index.js";

import item from "./b-dropdownpicker-item";

export default {
  name: "b-dropdownpicker-row",
  components: { item },
  props: {
    items: utilities.props.list,
    disabled: utilities.props.disabled,
    colCount: Number
  },
  methods: {
    click: function(value) {
      this.$emit("click", value);
    }
  }
};
</script>
