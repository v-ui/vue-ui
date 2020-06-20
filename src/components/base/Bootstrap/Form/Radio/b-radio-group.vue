<template>
  <div>
    <template v-for="(item, index) in list">
      <redio
        :key="index"
        :valid-class="ValidClass"
        v-bind="$attrs"
        :name="name"
        :value="item.value || item"
        :label="item.label"
        :checked="value"
        :disabled="item.disabled || disabled"
        v-on="inputListeners"
        @input="validator($event)"
      >
        <template v-if="list.length - 1 == index" #valid>
          <slot name="valid">{{ validInfo }}</slot>
        </template>
        <template v-if="list.length - 1 == index" #invalid>
          <slot name="invalid">{{ invalidInfo }}</slot>
        </template>
      </redio>
    </template>
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import redio from "./b-radio";
import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-radio-group",
  components: { redio, BInfo },
  mixins: [util.mixins.form.base, util.mixins.form.validator],
  inheritAttrs: false,
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    value: util.props.String,
    list: util.props.Array,
    info: util.props.String,
    disabled: util.props.Boolean,
    name: {
      ...util.props.String,
      required: true,
    }
  },
  data() {
    return {
      ValidClass: ""
    };
  },
  methods: {
    validator: function(e) {
      if (this.disabled) return; // disabled 时不校验
      // 验证函数不会对传入的数据进行处理
      const value = e.target ? e.target.value.trim() : e.value.trim();
      // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
      if (!this.validateRequired(value)) {
        this.ValidClass = "is-invalid";
        return;
      }
      this.ValidClass = ""; // 移除可能的 is-invalid
      // 当存在 valid slot 或 validInfo 时
      if (this.$slots.valid || this.validInfo) this.ValidClass = "is-valid";
      this.$emit("valid");
    }
  }
};
</script>
