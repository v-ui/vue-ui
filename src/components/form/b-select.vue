<template>
  <div class="p-0" :class="{'form-floating': floatLabel}">
    <basic-select
      v-model="selectedValue"
      :id="id"
      :list="list"
      :size="size"
      :row="row"
      :multiple="isMultiple"
      :disabled="disabled"
      :hide-null="hideNull"
      :primary-key="key"
      :display-name="display"
      v-bind="$attrs"
      v-on="$listeners"
      @change.native="validator($event, selectedValue)"
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
    <b-form-text :info="info" />
    <label :for="id">{{ floatLabel }}</label>
  </div>
</template>

<script>
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import BasicSelect from '@/components/form/Basic/Select/basic-select.vue'
import BValid from "@/components/form/Other/b-form-valid.vue";
import BFormText from "@/components/form/Other/b-form-text";

export default {
  name: "BSelect",
  components: { BasicSelect, BValid, BFormText },
  mixins: [
    util.mixins.select.select,
    util.mixins.form.validator,
  ],
  inheritAttrs: false,
  props: {
    floatLabel: util.props.String,
    disabled: util.props.Boolean,
    info: util.props.String,
    hideNull: util.props.Boolean,
    size: util.props.size,
    row: {
      type: [Number, String],
      default: function() {
        return this.multiple ? this.list.length + 1 : null;
      },
    },
    id: {
      type: String,
      default: function() {
        return "text-" + tools.random.getRandomString();
      }
    },
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

