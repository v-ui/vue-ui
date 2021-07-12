<template>
  <span class="row m-1">
    <template v-for="(item, index) in list">
      <div :key="index" :class="itemClass">
        <slot
          name="item"
          :item="item"
          :disabled="disabled"
        >
          <b-grid-item
            :item="item"
            class="text-center"
            :primary-key="key"
            :display-name="display"
            :multiple="isMultiple"
            :selected="selectedValue"
            :disabled="item.disabled || disabled"
            @item:click="itemClick"
          />
        </slot>
      </div>
    </template>
  </span>
</template>

<script>
import util from "@/components/util/index.js";

import BGridItem from "./b-grid-item";

export default {
  name: "BGridRow",
  components: { BGridItem },
  mixins: [ util.mixins.select.select, ],
  props: {
    list: util.props.Array,
    disabled: util.props.Boolean,
    colCount: util.props.UInt,
  },
  computed: {
    itemClass: function() {
      return 12 % this.colCount == 0 && this.list.length >= this.colCount ? `col-${12 / this.colCount}` : "col-auto";
    },
  },
  methods: {
    itemClick: function(item) {
      if (this.isMultiple) {
        const value = this.getKey(item)
        let index = this.selectedMap.indexOf(value)
        index >= 0
          ? this.selectedValue.splice(index, 1)
          : this.selectedValue.push(item)
      } else {
        this.selectedValue = item
      }
      this.$emit('item:click', this.selectedValue)
    },
  },
};
</script>
