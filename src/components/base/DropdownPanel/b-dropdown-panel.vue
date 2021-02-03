<template>
  <div class="form-group">
    <b-dropdown-picker
      ref="dropdownpanel"
      :class="[readonlyClass]"
      menu-width
      :label="showLabel"
      :menuWidth="false"
      :can-hide="canHide"
      :placeholder="fillPlaceholder"
      :disabled="disabled"
      :multiple="isMultiple"
      @delete:item="deleteItem"
    >
      <template #trigger>
        <slot name="trigger" />
      </template>
      <template #icon>
        <slot name="icon" />
      </template>
      <slot>
        <b-dropdown-panel-row
          v-model="selectedValues"
          :list="list"
          :primary-key="primaryKey"
          :multiple="isMultiple"
          :col-count="colCount"
        />
      </slot>
    </b-dropdown-picker>
    <b-valid
      v-if="validInfo || $slots.valid"
      state="valid"
    >
      <slot name="valid">
        {{ validInfo }}
      </slot>
    </b-valid>
    <b-valid
      v-if="invalidInfo || $slots.invalid"
      state="invalid"
    >
      <slot name="invalid">
        {{ invalidInfo }}
      </slot>
    </b-valid>
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BDropdownPicker from '@/components/base/DropdownPicker/b-dropdown-picker.vue'
import BDropdownPanelRow from './Row/b-dropdown-panel-row'

import BValid from "@/components/form/Other/b-form-valid.vue";
import BInfo from "@/components/basic/basic-info.vue"

export default {
  name: 'BDropdownPanel',
  components: {
    BDropdownPicker,
    BDropdownPanelRow,
    BValid,
    BInfo,
  },
  mixins: [
    util.mixins.form.base,
    util.mixins.form.readonly,
    util.mixins.form.validator,
    util.mixins.select.select,
  ],
  props: {
    info: util.props.String,
    canHide: {
      ...util.props.Boolean,
      default: true,
    },
    colCount: util.props.UInt,
    placeholder: util.props.String,
  },
  computed: {
    fillPlaceholder: function() {
      return this.placeholder || this.nullValue
    },
  },
  watch: {
    selectedValues: function(value) {
      this.validator(this.$refs.dropdownpanel.$el, value)
    },
  },
  methods: {
    deleteItem: function(index) {
      if (index >= 0) this.selectedValues.splice(index, 1)
    },
  },
}
</script>
