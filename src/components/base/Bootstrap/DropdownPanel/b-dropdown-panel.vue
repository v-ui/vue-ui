<template>
  <div class="form-group" ref="dropdownpanel">
    <b-dropdown-picker

      :class="[readonlyClass]"
      menu-width
      :show="show"
      :label="label"
      :disabled="disabled"
      :menuWidth="false"
      :placeholder="placeholder">
      <!-- <template #icon>
        <i class="far fa-calendar-alt" />
      </template> -->
      <template #default>
        <b-dropdown-panel-row
          v-model="selectedValuess"
          :list="list"
          :primary-key="primaryKey"
          :multiple="isMultiple"
          :col-count="colCount"
        />
      </template>
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
  mixins: [
    util.mixins.form.base,
    util.mixins.form.readonly,
    util.mixins.form.validator,
    util.mixins.select.select,
  ],
  components: {
    BDropdownPicker,
    BDropdownPanelRow,
    BValid,
    BInfo,
  },
  props: {
    info: util.props.String,
    colCount: {
      ...util.props.UInt,
      default: 6,
    }
  },
  data() {
    return {
      show: false,
      label: null,
      placeholder: '<Place select...>',
    }
  },
  watch: {
    selectedValuess: function(value) {
      this.validator(this.$refs.dropdownpanel, value)
    },
  },
}
</script>
