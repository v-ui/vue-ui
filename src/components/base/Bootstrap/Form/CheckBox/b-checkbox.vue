<template>
  <div class="custom-control custom-checkbox" :class="{ 'custom-control-inline': inline}">
    <input
      ref="checkbox"
      type="checkbox"
      :id="id"
      class="custom-control-input"
      :class="ValidClass"
      :value="value"
      :disabled="disabled"
      :aria-disabled="disabled"
      :checked="disabled ? defaultState : isChecked"
      :aria-checked="disabled ? defaultState : isChecked"
      v-bind="$attrs"
      v-on="inputListeners"
      @change="validator($event)"
    >
    <label class="custom-control-label" :for="id">{{ label }}</label>
    <b-valid v-if="validInfo || $slots.valid" state="valid">
      <slot name="valid">{{ validInfo }}</slot>
    </b-valid>
    <b-valid v-if="invalidInfo || $slots.invalid" state="invalid">
      <slot name="invalid">{{ invalidInfo }}</slot>
    </b-valid>
    <b-info :class="{ 'pl-1': inline }" :info="info" />
  </div>
</template>

<script>
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import BValid from "@/components/base/Bootstrap/Form/Other/b-form-valid.vue";
import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-checkbox",
  inheritAttrs: false,
  mixins: [util.mixins.form.base, util.mixins.form.validator],
  components: { BValid, BInfo },
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    value: util.props.String,
    label: util.props.String,
    id: {
      type: String,
      default: function() {
        return "Checkbox-" + tools.random.getRandomString();
      }
    },
    indeterminate: {
      ...util.props.Uint,
      validator: value => [0, 1, 2].includes(Number(value))
    },
    checked: util.props.Boolean,
    defaultState: util.props.Boolean,
    inline: util.props.Boolean,
    disabled: util.props.Boolean,
    ValidClass: util.props.String,
    unvalid: util.props.Boolean,
    info: util.props.String,
  },
  data() {
    return {
      isChecked: false
    };
  },
  computed: {
    inputListeners: function() {
      var vm = this;
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign(
        {},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          change: function(event) {
            vm.$emit("change", event.target.checked);
          }
        }
      );
    }
  },
  mounted() {
    this.isChecked = this.checked;
    if (this.indeterminate) this.setIndeterminate(Number(this.indeterminate));
  },
  methods: {
    validator: function(e) {
      if (this.unvalid) return; // unvalid 时不校验
      if (this.disabled) return; // disabled 时不校验
      if (!this.required) return;
      tools.dom.removeClass(e.target, "is-valid"); // 移除可能的 is-valid
      // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
      if (!e.target.checked) {
        tools.dom.addClass(e.target, "is-invalid");
        return;
      }
      tools.dom.removeClass(e.target, "is-invalid"); // 移除可能的 is-invalid
      // 当存在 valid slot 或 validInfo 时
      if (this.$slots.valid || this.validInfo)
        tools.dom.addClass(e.target, "is-valid");
      this.$emit("valid");
    },
    setIndeterminate: function(val) {
      // 0 - 未 选 择
      // 1 - 部分选择
      // 2 - 全选
      if (val == 0) {
        if (this.$refs.checkbox.indeterminate)
          this.$refs.checkbox.indeterminate = false;
        this.isChecked = false;
      } else if (val == 1) {
        tools.dom.addAttr(this.$refs.checkbox, "indeterminate", "true");
        this.isChecked = false;
      } else {
        if (this.$refs.checkbox.indeterminate)
          this.$refs.checkbox.indeterminate = false;
        this.isChecked = true;
      }
    }
  },
  watch: {
    indeterminate: function(val) {
      this.setIndeterminate(val);
    },
    checked: function(val) {
      this.isChecked = val;
    }
  }
};
</script>

