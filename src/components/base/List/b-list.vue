<template>
  <draggable
    class="list-group"
    tag="ul"
    v-model="dataList"
    v-bind="dragOptions"
    handle=".handle"
    :class="{'list-group-flush': flush, 'list-group-horizontal': inline, }"
    @start="status = true"
    @end="status = false"
  >
    <transition-group type="transition" :name="!status ? 'flip-list' : null" :class="{ 'd-inline-flex': inline, }">
      <slot v-if="$slots.default" />
      <list-items
        v-for="(item, index) in dataList"
        v-else
        :key="'item' + index"
        :class="{'flex-fill': fill, 'border-0': borderLess}"
        :drop="drop"
        :hide-hanlder="hideHanlder"
        :label="item.label"
        :href="item.href"
        :color="item.color || color"
        :sr-msg="item.srMsg"
        :disabled="disabled || item.disabled"
      >
        <slot name="item" :item="item" />
      </list-items>
    </transition-group>
  </draggable>
</template>

<script>
import util from "@/components/util/index.js";

import draggable from 'vuedraggable'
import listItems from "./b-list-item";

export default {
  name: "BList",
  components: { draggable, listItems },
  props: {
    list: util.props.Array,
    color: {
      ...util.props.color,
      default: "white"
    },
    drop: util.props.Boolean,
    hideHanlder: util.props.Boolean,
    disabled: util.props.Boolean,
    flush: util.props.Boolean,
    inline: util.props.Boolean,
    fill: util.props.Boolean,
    borderLess: util.props.Boolean,
  },
  data() {
    return {
      dragOptions: {
        animation: 200,
        group: "description",
        disabled: !this.drop && this.disabled,
        ghostClass: "ghost"
      },
      dataList: this.list,
      status: false,
    }
  },
  watch: {
    dataList: function(value) {
      this.$emit('drop:changed', value)
    },
  },
};
</script>

<style>
.ghost {
  opacity: 0.5;
}
</style>
