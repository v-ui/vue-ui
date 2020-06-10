<template>
  <div>
    <b-checkbox-tree-item
      v-for="(item, index) in list"
      :key="index"
      v-model="values"
      :item="item"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "b-checkbox-tree",
  components: { BCheckboxTreeItem: () => import("./b-checkbox-tree-item") },
  model: {
    prop: "values",
    event: "input"
  },
  props: {
    list: util.props.Array,
    disabled: util.props.Boolean,
    values: util.props.Array,
  },
  watch: {
    "values.length": function() {
      this.$emit("input", this.values);
    }
  }
};
</script>

