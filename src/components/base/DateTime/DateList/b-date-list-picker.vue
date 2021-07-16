<template>
  <div class="p-0">
    <b-dropdown-picker
      ref="datelistpicekr"
      class="form-control"
      menu-width
      :selected="getDisplay(this.selectedValue)"
      :placeholder="placeholder || nullValue"
      :disabled="disabled"
      @picker:hide="validator($refs.datelistpicekr.$el, selectedValue)"
    >
      <template #trigger>
        <slot name="trigger" />
      </template>
      <template #icon>
        <slot name="icon" />
      </template>
      <template>
        <b-date-list
          v-model="selectedValue"
          :type="type"
          :min="min"
          :max="max"
          :step="step"
        />
      </template>
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

import BDateList from './b-date-list.vue'
import BDropdownPicker from "@/components/base/DropdownPicker/b-dropdown-picker.vue";

import BValid from "@/components/form/Other/b-form-valid.vue";
import BInfo from "@/components/basic/basic-info.vue"
export default {
  name: "BDateListPicker",
  components: {
    BDateList,
    BDropdownPicker,
    BValid,
    BInfo,
  },
  mixins: [
    util.mixins.date.localType,
    util.mixins.select.select,
    util.mixins.form.validator,
  ],
  props: {
    disabled: util.props.Boolean,
    info: util.props.String,
    placeholder: util.props.String,
  },
  watch: {
    value: {
      handler: function (value) {
        this.selectedValue = value
      },
      deep: true,
    },
    selectedValue: {
      handler: function (value) {
        // 配合 v-model 工作
        this.$emit("selected:change", value);
      },
      deep: true,
    },
  },
  methods: {
    // 验证集合 通过返回 true，不通过返回 false
    validating: function (value) {
      // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
      if (!this.validateRequired(value)) return false
      // 自定义验证（用户自定义验证函数，验证通过返回 true）
      if (!this.validateCustomize(value, this.valid)) return false
      // 验证成功
      return true
    },
  },
};
</script>
