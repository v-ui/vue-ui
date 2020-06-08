<template>
  <ul class="list-group" :class="{'list-group-flush': flush, 'list-group-horizontal': inline, }">
    <slot v-if="$slots.default" />
    <list-items
      v-for="(item, index) in list"
      v-else
      :key="index"
      :class="{'flex-fill': fill}"
      :text="item.text"
      :href="item.href"
      :color="item.color || color"
      :sr-message="item.srMsg"
      :disabled="disabled || item.disabled"
      :active="select ? select == item.value || select == item.text : item.active"
      @click.native="$emit('click', item.value || item.text)"
    />
  </ul>
</template>

<script>
import utilities from "@/components/utilities/index.js";

import listItems from "./b-list-item";

export default {
  name: "b-list",
  components: { listItems },
  model: {
    prop: "select",
    event: "click"
  },
  props: {
    list: utilities.props.list,
    color: {
      ...utilities.props.color,
      default: "white"
    },
    select: [String, Number],
    disabled: utilities.props.disabled,
    flush: Boolean,
    inline: Boolean,
    fill: Boolean
  }
};
</script>

