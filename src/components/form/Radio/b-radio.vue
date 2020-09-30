<template>
  <div
    class="custom-control custom-radio"
    :class="{ 'custom-control-inline': inline}"
  >
    <input
      :id="id"
      type="radio"
      class="custom-control-input"
      :class="mixClass"
      :style="mixStyle"
      :value="value"
      :checked="isChecked"
      :aria-checked="isChecked"
      :disabled="disabled"
      :aria-disabled="disabled"
      v-bind="$attrs"
      v-on="inputListeners"
    >
    <label
      class="custom-control-label"
      :for="id"
    >
      <slot>{{ label || value }}</slot>
    </label>
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
    <b-info
      :class="{ 'pl-1': inline }"
      :info="info"
    />
  </div>
</template>

<script>
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import BInfo from "@/components/basic/basic-info.vue";
import BValid from "@/components/form/Other/b-form-valid.vue";

export default {
  name: "BRadio",
  components: { BInfo, BValid },
  mixins: [ util.mixins.base.style, util.mixins.form.base, util.mixins.form.validator],
  inheritAttrs: false,
  model: {
    prop: "checked",
    event: "radio:change"
  },
  props: {
    value: util.props.String,
    label: util.props.String,
    info: util.props.String,
    disabled: util.props.Boolean,
    id: {
      type: String,
      default: function() {
        return "Radio-" + tools.random.getRandomString();
      }
    },
    checked: [String, Boolean, ],
    inline: util.props.Boolean,
  },
  data() {
    return {
      checkedValue: this.checked,
    }
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
            vm.$emit("radio:change", event.target.value);
          }
        }
      );
    },
    isChecked: function() {
      if (tools.obj.type.isBoolean(this.checkedValue)) return this.checkedValue
      else if (tools.obj.type.isString(this.checkedValue)) return this.checkedValue === this.value
      return false
    },
  },
  watch: {
    checked: function(value) {
      this.checkedValue = value
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
