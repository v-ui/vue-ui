<template>
  <div>
    <b-checkbox-tree-item
      v-for="(item, index) in list"
      :key="index"
      :item="item"
      :primary-key="primaryKey"
      :disabled="disabled"
      :selected="selected" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BCheckboxTreeItem from "./b-checkbox-tree-item";

export default {
  name: "b-checkbox-tree",
  components: {
    BCheckboxTreeItem
  },
  model: {
    prop: 'selected',
    event: 'update:selected',
  },
  props: {
    list: util.props.Array,
    disabled: util.props.Boolean,
    selected: util.props.Array,
    primaryKey: {
      ...util.props.String,
      default: 'value',
    },
  },
  watch: {
    'selected.length': function (value) {
      this.$emit('update:selected', value)
    }
  },
};
</script>

