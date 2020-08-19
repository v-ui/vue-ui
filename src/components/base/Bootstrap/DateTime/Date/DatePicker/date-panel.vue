<template>
  <div>
    <picker-header
      :disabled="disabled"
      :hearder-text="hearderText"
      :now-disabled="nowDisabled"
      @clickHeader="clickHeader"
      @forward="forward"
      @checknow="checknow"
      @backward="backward"
    />
    <hr>
    <div class="text-center mx-3">
      <picker-row
        v-model="checkedValues"
        :list="list"
        :primary-key="primaryKey"
        :col-count="colCount"
        :disabled="disabled"
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
  mixins: [ util.mixins.select.check, ],
  props: {
    min: Date,
    max: Date,
    total: util.props.UInt,
    colCount: util.props.UInt,
    hearderText: util.props.String,
    hideHeader: util.props.Boolean,
    disabled: util.props.Boolean,
  },
  computed: {
    now: () => new Date(),
    rowCount: function() {
      return Math.ceil(this.total / this.colCount);
    },
    nowDisabled: function() {
      return this.now < this.min || this.now > this.max;
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
  },
}
</script>
