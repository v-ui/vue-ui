<template>
  <div>
    <date-panel-header
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
    </date-panel-header>
    <hr
      v-show="!showWeek && !hideHeader"
      class="my-1"
    >
    <date-week-grid
      v-if="showWeek"
      disabled
    />
    <slot>
      <b-grid-table
        :list="list"
        class="h-100"
        :border="border"
        :col-count="colCount"
        :disabled="disabled"
      >
        <template #item="{ item }">
          <slot
            name="item"
            :item="item"
          >
            <date-panel-item
              v-if="item.label"
              :item="item"
              class="w-100"
              :disabled="item.disabled"
              @item:click="click"
            />
            <span v-else />
          </slot>
        </template>
      </b-grid-table>
    </slot>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import DatePanelHeader from "./date-panel-header";
import DatePanelItem from './date-panel-item'
import DateWeekGrid from './date-week-grid.vue'
import BGridTable from '@/components/base/Grid/b-grid-table.vue';
export default {
  name: 'DatePanelTemp',
  components: { DatePanelHeader, DatePanelItem, DateWeekGrid, BGridTable, },
  props: {
    list: util.props.Array,
    colCount: util.props.UInt,
    border: util.props.Boolean,
    disabled: util.props.Boolean,
    showWeek : util.props.Boolean,
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
