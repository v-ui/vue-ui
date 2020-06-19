<template>
  <div class="form-group my-0">
    <select
      class="custom-select"
      :class="[cClass, sizeClass]"
      :size="row"
      :multiple="multiple"
      :disabled="disabled"
      :aria-disabled="disabled"
      v-bind="$attrs"
      v-on="inputListeners"
      @change.stop="change"
      @blur.stop="validator"
    >
      <slot>
        <option
          v-if="!hideNull"
          value
          :selected="value.length == 0"
          :aria-selected="value.length == 0"
        >&lt;Pleace select...&gt;</option>
        <b-select-option
          v-for="(item, index) in list"
          :key="index"
          :item="item"
          :multiple="multiple"
          :is-selected-value="isSelectedValue"
        />
        <!-- <option
                    v-for="item in list"
                    :key="item.value"
                    :value="item.value"
                    :selected="isSelected(item.value)"
                    :aria-selected="isSelected(item.value)"
                    :disabled="item.disabled"
                    :aria-disabled="item.disabled" >
                    {{ item.text || item.value }}
        </option>-->
      </slot>
    </select>
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
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import BSelectOption from "./b-select-option.vue";
import BValid from "@/components/base/Bootstrap/Form/Other/b-form-valid.vue";
import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-select",
  inheritAttrs: false,
  mixins: [util.mixins.form.base, util.mixins.form.validator],
  components: { BSelectOption, BValid, BInfo },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    list: util.props.Array,
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
      isSelectedValue: this.value
    };
  },
  computed: {
    sizeClass: function() {
      return this.size ? `custom-select-${this.size}` : "";
    },
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
          change: function() {
            vm.$emit("change", vm.isSelectedValue);
          }
        }
      );
    }
  },
  methods: {
    isSelected: function(val) {
      return this.multiple
        ? this.isSelectedValue.includes(val)
        : this.isSelectedValue == val;
    },
    change: function(event) {
      this.isSelectedValue = this.multiple
        ? Array.prototype.filter
            .call(event.target.options, o => o.selected && o.value)
            .map(o => ("_value" in o ? o._value : o.value))
        : event.target.value;
      this.validator(event);
    },
    validator: function(e) {
      if (this.disabled) return; // disabled 时不校验
      tools.dom.removeClass(e.target, "is-valid"); // 移除可能的 is-valid
      // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
      if (!this.validateRequired(this.isSelectedValue)) {
        tools.dom.addClass(e.target, "is-invalid");
        return;
      }
      tools.dom.removeClass(e.target, "is-invalid"); // 移除可能的 is-invalid
      // 当存在 valid slot 或 validInfo 时
      if (this.$slots.valid || this.validInfo)
        tools.dom.addClass(e.target, "is-valid");
      this.$emit("valid");
    }
  },
  watch: {
    value: function() {
      this.isSelectedValue = this.value;
    }
  }
};
</script>

