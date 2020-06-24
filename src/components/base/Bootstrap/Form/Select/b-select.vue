<template>
  <div class="form-group my-0">
    <basic-select
      v-model="dataValue"
      :list="list"
      :size="size"
      :row="row"
      :multiple="multiple"
      :disabled="disabled"
      v-bind="$attrs"
      v-on="$listeners"
      @change.native="validator"
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

import BasicSelect from '@/components/base/Bootstrap/Form/basic/select/basic-select.vue'
import BValid from "@/components/base/Bootstrap/Form/Other/b-form-valid.vue";
import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-select",
  components: { BasicSelect, BValid, BInfo },
  mixins: [util.mixins.form.base, util.mixins.form.validator],
  inheritAttrs: false,
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    list: util.props.Array,
    select: util.props.String,
    disabled: util.props.Boolean,
    info: util.props.String,
    hideNull: util.props.Boolean,
    value: {
      type: [String, Number, Array],
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
      dataValue: this.value,
    }
  },
  watch: {
    value: function(value) {
      this.dataValue = value
      this.$emit('input', value)
    }
  },
};
</script>

