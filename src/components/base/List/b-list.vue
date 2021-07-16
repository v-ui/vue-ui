<template>
  <ul
    class="list-group"
    :class="{'list-group-flush': flush, 'list-group-horizontal': inline }"
  >
    <slot v-if="$slots.default" :list="list" />
    <list-items
      v-for="(item, index) in list"
      v-else
      :key="'item' + index"
      :class="{'flex-fill': fill}"
      :index="index + 1"
      :numbered="numbered"
      :label="getDisplay(item)"
      :href="item.href"
      :icon="item.icon"
      :info="item.info"
      :active="isSelected(item)"
      :color="item.color || color"
      :disabled="disabled || item.disabled"
      @click.native="itemClick(item)"
    >
      <slot
        name="item"
        :item="item"
      />
    </list-items>
  </ul>
</template>

<script>
import util from "@/components/util/index.js";

import listItems from "./b-list-item";

export default {
  name: "BList",
  components: { listItems },
  mixins: [ util.mixins.select.check ],
  props: {
    list: util.props.Array,
    color: {
      ...util.props.color,
      default: "white"
    },
    numbered: util.props.Boolean,
    disabled: util.props.Boolean,
    flush: util.props.Boolean,
    inline: util.props.Boolean,
    fill: util.props.Boolean,
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
