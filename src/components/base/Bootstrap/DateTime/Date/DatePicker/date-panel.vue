<template>
  <div>
    <picker-header
      :disabled="disabled"
      :disabled-now="disabledNow"
      :header-text="headerText"
      @clickHeader="clickHeader"
      @forward="forward"
      @checknow="checknow"
      @backward="backward"
    />
    <hr v-show="!$slots.week">
    <div class="text-center">
      <slot name="week" />
      <picker-row
        :list="list"
        :primary-key="primaryKey"
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
      this.$emit('canntHide')
    },
    forward: function() {
      this.$emit('panel:forward')
      this.$emit('canntHide')
    },
    checknow: function() {
      this.$emit('panel:checknow')
    },
    backward: function() {
      this.$emit('panel:backward')
      this.$emit('canntHide')
    },
    click: function(value) {
      this.$emit('panel:checked', value)
    },
  },
}
</script>
