<template>
  <div>
    <template v-for="(item, index) in list">
      <b-redio
        :key="index"
        :mix-class="validateClass"
        unvalid
        :name="name"
        :value="item.value || item"
        :label="item.label"
        :checked="isSelected(item)"
        :disabled="item.disabled || disabled"
        v-bind="$attrs"
        v-on="$listeners"
        @input="input($event, item)"
      >
        <template
          v-if="list.length - 1 == index"
          #valid
        >
          <slot name="valid">
            {{ validInfo }}
          </slot>
        </template>
        <template
          v-if="list.length - 1 == index"
          #invalid
        >
          <slot name="invalid">
            {{ invalidInfo }}
          </slot>
        </template>
      </b-redio>
    </template>
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BRedio from "./b-radio";
import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BRadioGroup",
  components: { BRedio, BInfo },
  mixins: [util.mixins.select.check, util.mixins.form.validator],
  inheritAttrs: false,
  props: {
    info: util.props.String,
    disabled: util.props.Boolean,
    name: {
      ...util.props.String,
      required: true,
    }
  },
  data() {
    return {
      validateClass: "",
      isMultiple: false,
    };
  },
  methods: {
    input: function(event, item) {
      if (event.target.checked) {
        this.selectedValue = item
        this.validator(
          event,
          this.selectedValue,
          () => { this.validateClass = '' },
          () => { this.validateClass = this.validClass },
          () => { this.validateClass = this.inValidClass },
        )
      }
    },
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
