<template>
  <div class="form-group my-0">
    <basic-select
      v-model="selectedValues"
      :list="list"
      :size="size"
      :row="row"
      :multiple="multiple"
      :disabled="disabled"
      :primary-key="keyValue"
      v-bind="$attrs"
      v-on="$listeners"
      @change.native="validator($event, selectedValues)"
    >
      <slot />
    </basic-select>
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

import BasicSelect from '@/components/form/Basic/Select/basic-select.vue'
import BValid from "@/components/form/Other/b-form-valid.vue";
import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BSelect",
  components: { BasicSelect, BValid, BInfo },
  mixins: [util.mixins.form.base, util.mixins.select.select, util.mixins.form.validator],
  inheritAttrs: false,
  props: {
    primaryKey: util.props.Boolean,
    disabled: util.props.Boolean,
    info: util.props.String,
    hideNull: util.props.Boolean,
    row: {
      type: [Number, String],
      default: function() {
        return this.multiple ? this.list.length + 1 : null;
      },
    },
  },
  data() {
    return {
      keyValue: this.primaryKey ? 'value' : null
    }
  },
  methods: {
    // 验证集合 通过返回 true，不通过返回 false
    validating: function (value) {
      // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
      if (!this.validateRequired(value)) return false
      // 验证成功
      return true
    },
  },
};
</script>

