<template>
  <span class="row mx-1">
    <item
      v-for="(item, index) in list"
      :key="index"
      class="text-center"
      :item="item"
      :is-multiple="isMultiple"
      :primary-key="primaryKey"
      :selected="selectedValuess"
      :col-count="colCount"
      :disabled="item.disabled || disabled"
      @click="click"
    />
  </span>
</template>

<script>
import util from "@/components/util/index.js";

import item from "./b-dropdown-panel-item";

export default {
  name: "b-dropdown-panel-row",
  components: { item },
  mixins: [ util.mixins.select.select, ],
  props: {
    disabled: util.props.Boolean,
    colCount: util.props.UInt,
  },
  methods: {
    click: function(item) {
      let value = this.primaryKey ? item : item && item.value || item
      if (this.isMultiple) {
        let index = this.selectedValuess.indexOf(value)
        index >= 0
          ? this.selectedValuess.splice(index, 1)
          : this.selectedValuess.push(value)
      } else {
        this.selectedValuess = value
      }
    },
  },
};
</script>
