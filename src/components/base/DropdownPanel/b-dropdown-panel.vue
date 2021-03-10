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
        <b-grid-row
          v-if="type === 'row'"
          v-model="selectedValue"
          :list="list"
          :primary-key="primaryKey"
          :multiple="isMultiple"
          :col-count="colCount"
        />
        <b-grid-table
          v-else-if="type === 'table'"
          v-model="selectedValue"
          class="h-100"
          :list="list"
          :border="border"
          :disabled="disabled"
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
import BGridRow from '@/components/base/Grid/b-grid-row.vue'
import BGridTable from '@/components/base/Grid/b-grid-table.vue'

import BValid from "@/components/form/Other/b-form-valid.vue";
import BInfo from "@/components/basic/basic-info.vue"

export default {
  name: 'BDropdownPanel',
  components: {
    BDropdownPicker,
    BGridRow,
    BGridTable,
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
    canHide: {
      ...util.props.Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'row',
      validator: function(value) {
        return [ 'row', 'table' ].includes(value)
      },
    },
    info: util.props.String,
    colCount: util.props.UInt,
    border: util.props.Boolean,
    placeholder: util.props.String,
  },
  computed: {
    fillPlaceholder: function() {
      return this.placeholder || this.nullValue
    },
  },
  watch: {
    selectedValue: function(value) {
      this.validator(this.$refs.dropdownpanel.$el, value)
    },
  },
  methods: {
    deleteItem: function(index) {
      if (index >= 0) this.selectedValue.splice(index, 1)
    },
  },
}
</script>
