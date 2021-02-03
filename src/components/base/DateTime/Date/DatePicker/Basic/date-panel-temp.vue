<template>
  <div>
    <panel-header
      v-if="!hideHeader"
      :disabled="disabled"
      :header-text="headerText"
      :disabled-now="disabledNow"
      :hide-controller="hideController"
      :diesable-header-click="diesableHeaderClick"
      @clickHeader="clickHeader"
      @forward="forward"
      @checknow="checknow"
      @backward="backward"
    >
      <template #header>
        <slot name="header" />
      </template>
    </panel-header>
    <hr v-show="!$slots.week && !hideHeader" class="my-1">
    <slot name="week" />
    <slot>
      <date-panel-table
        :list="list"
        class="h-100"
        :border="border"
        :col-count="colCount"
        :disabled="disabled"
      >
        <template #item="{ item }">
          <slot name="item" :item="item">
            <panel-item
              :item="item"
              class="w-100"
              :disabled="item.disabled"
              @item:click="click"
            />
          </slot>
        </template>
      </date-panel-table>
    </slot>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import panelHeader from "./date-panel-header";
import panelItem from './date-panel-item'
import DatePanelTable from './date-panel-table.vue';

export default {
  name: 'DatePanelTemp',
  components: { panelHeader, panelItem, DatePanelTable, },
  props: {
    list: util.props.Array,
    colCount: util.props.UInt,
    border: util.props.Boolean,
    disabled: util.props.Boolean,
    headerText: util.props.String,
    hideHeader: util.props.Boolean,
    disabledNow: util.props.Boolean,
    hideController: util.props.Boolean,
    diesableHeaderClick: util.props.Boolean,
  },
  methods: {
    clickHeader: function() {
      this.$emit('panel:clickHeader')
    },
    forward: function() {
      this.$emit('panel:forward')
    },
    checknow: function() {
      this.$emit('panel:checknow')
    },
    backward: function() {
      this.$emit('panel:backward')
    },
    click: function(value) {
      this.$emit('panel:checked', value && value.value)
    },
  },
}
</script>
