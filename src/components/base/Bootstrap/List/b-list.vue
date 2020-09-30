<template>
  <ul
    class="list-group"
    :class="{'list-group-flush': flush, 'list-group-horizontal': inline, }"
  >
    <slot v-if="$slots.default" />
    <list-items
      v-for="(item, index) in list"
      v-else
      :key="index"
      :class="{'flex-fill': fill}"
      :label="item.label"
      :href="item.href"
      :color="item.color || color"
      :sr-msg="item.srMsg"
      :disabled="disabled || item.disabled"
      :active="select ? select == item.value || select == item.label : item.active"
      @click.native="$emit('click', item.value || item.label)"
    />
  </ul>
</template>

<script>
import util from "@/components/util/index.js";

import listItems from "./b-list-item";

export default {
  name: "BList",
  components: { listItems },
  model: {
    prop: "select",
    event: "click"
  },
  props: {
    list: util.props.Array,
    color: {
      ...util.props.color,
      default: "white"
    },
    select: util.props.String,
    disabled: util.props.Boolean,
    flush: util.props.Boolean,
    inline: util.props.Boolean,
    fill: util.props.Boolean,
  }
};
</script>

