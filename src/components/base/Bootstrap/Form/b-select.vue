<template>
  <div class="form-group my-0">
    <basic-select
      v-model="selectedValue"
      :list="list"
      :size="size"
      :row="row"
      :multiple="multiple"
      :disabled="disabled"
      v-bind="$attrs"
      v-on="$listeners"
      @change.native="validator($event, selectedValue)"
    >
      <slot />
    </basic-select>
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

import BasicSelect from '@/components/base/Bootstrap/Form/Basic/Select/basic-select.vue'
import BValid from "@/components/base/Bootstrap/Form/Other/b-form-valid.vue";
import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-select",
  components: { BasicSelect, BValid, BInfo },
  mixins: [util.mixins.form.base, util.mixins.form.validator],
  inheritAttrs: false,
  model: {
    prop: "selected",
    event: "select:selected"
  },
  props: {
    list: util.props.Array,
    disabled: util.props.Boolean,
    info: util.props.String,
    hideNull: util.props.Boolean,
    selected: {
      type: [String, Number, Array, Object],
      default: function() {
        return this.multiple ? [] : "";
      }
    },
    row: {
      type: [Number, String],
      default: function() {
        return this.multiple ? this.list.length + 1 : null;
      },
    },
    multiple: util.props.Boolean,
  },
  data() {
    return {
      selectedValue: this.selected,
    }
  },
  watch: {
    selected: function(value) {
      this.selectedValue = value
      this.$emit('select:selected', value)
    }
  },
};
</script>

