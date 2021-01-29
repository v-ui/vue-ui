<template>
  <div>
    <panel-header
      v-if="!hideHeader"
      :disabled="disabled"
      :disabled-now="disabledNow"
      :diesable-header-click="diesableHeaderClick"
      :header-text="headerText"
      @clickHeader="clickHeader"
      @forward="forward"
      @checknow="checknow"
      @backward="backward"
    />
    <hr v-show="!$slots.week && !hideHeader" class="my-1">
    <slot name="week" />
    <slot>
      <date-panel-tabel
        :list="list"
        :col-count="colCount"
        :disabled="disabled"
      >
        <template #item="{ item }">
          <panel-item
            :item="item"
            class="w-100"
            :disabled="item.disabled"
            @item:click="click"
          />
        </template>
      </date-panel-tabel>
    </slot>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import panelHeader from "./date-panel-header";
import panelItem from './date-panel-item'
import DatePanelTabel from './date-panel-tabel.vue';

export default {
  name: 'DatePanelTemp',
  components: { panelHeader, panelItem, DatePanelTabel, },
  props: {
    list: util.props.Array,
    colCount: util.props.UInt,
    headerText: util.props.String,
    hideHeader: util.props.Boolean,
    disabled: util.props.Boolean,
    diesableHeaderClick: util.props.Boolean,
    disabledNow: util.props.Boolean,
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
