<template>
  <div>
    <picker-header
      :disabled="disabled"
      :disabled-now="disabledNow"
      :diesable-header-click="diesableHeaderClick"
      :header-text="headerText"
      @clickHeader="clickHeader"
      @forward="forward"
      @checknow="checknow"
      @backward="backward"
    />
    <hr v-show="!$slots.week" class="my-1">
    <div class="text-center">
      <slot name="week" />
      <picker-row
        :list="list"
        :col-count="colCount"
        :disabled="disabled"
        @click="click"
      />
    </div>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import pickerHeader from "./date-picker-header";
import pickerRow from "@/components/base/Bootstrap/DropdownPanel/b-dropdown-panel-row.vue"

export default {
  name: 'date-panel',
  components: { pickerHeader, pickerRow, },
  props: {
    list: util.props.Array,
    colCount: util.props.UInt,
    headerText: util.props.String,
    hideHeader: util.props.Boolean,
    disabled: util.props.Boolean,
    diesableHeaderClick: util.props.Boolean,
    disabledNow: util.props.Boolean,
  },
  computed: {
    rowCount: function() {
      return Math.ceil(this.total / this.colCount);
    },
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
      this.$emit('panel:checked', value)
    },
  },
}
</script>
