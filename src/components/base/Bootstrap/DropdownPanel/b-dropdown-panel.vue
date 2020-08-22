<template>
  <div class="form-group">
    <b-dropdown-picker
      ref="dropdownpanel"
      :class="[readonlyClass]"
      menu-width
      :menuWidth="false"
      :label="fillLabel"
      :canHide="canHide"
      :placeholder="fillPlaceholder"
      :disabled="disabled"
      :multiple="isMultiple"
      @deleteItem="deleteItem"
    >
      <template #trigger><slot name="trigger" /></template>
      <template #icon><slot name="icon" /></template>
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
    <b-valid v-if="validInfo || $slots.valid" state="valid">
      <slot name="valid">{{ validInfo }}</slot>
    </b-valid>
    <b-valid v-if="invalidInfo || $slots.invalid" state="invalid">
      <slot name="invalid">{{ invalidInfo }}</slot>
    </b-valid>
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BDropdownPicker from '@/components/base/Bootstrap/DropdownPicker/b-dropdown-picker.vue'
import BDropdownPanelRow from './b-dropdown-panel-row'

import BValid from "@/components/base/Bootstrap/Form/Other/b-form-valid.vue";
import BInfo from "@/components/Basic/basic-info.vue"

export default {
  name: 'b-dropdown-panel',
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
    label: util.props.String,
    info: util.props.String,
    canHide: {
      ...util.props.Boolean,
      default: true,
    },
    colCount: util.props.UInt,
    placeholder: util.props.String,
  },
  computed: {
    fillLabel: function() {
      return this.label || (this.isMultiple
        ? this.selectedValues && this.selectedValues.map && this.selectedValues.map(e => e[this.primaryKey] || e.label || e.value || e ) || null
        : this.selectedValues && (this.selectedValues[this.primaryKey] || this.selectedValues.label || this.selectedValues.value || this.selectedValues) || null)
    },
    fillPlaceholder: function() {
      return this.placeholder || '<Place select...>'
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
