<template>
  <div
    class="custom-control custom-checkbox"
    :class="{ 'custom-control-inline': inline}"
  >
    <input
      :id="id"
      ref="checkbox"
      type="checkbox"
      class="custom-control-input"
      :class="mixClass"
      :style="mixStyle"
      :value="value"
      :disabled="disabled"
      :aria-disabled="disabled"
      :checked="checkedValue"
      :aria-checked="checkedValue"
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

import BValid from "@/components/base/Bootstrap/Form/Other/b-form-valid.vue";
import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "BCheckbox",
  components: { BValid, BInfo },
  mixins: [ util.mixins.base.style, util.mixins.form.base, util.mixins.form.validator ],
  inheritAttrs: false,
  model: {
    prop: "checked",
    event: "checkbox:change"
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
      // 0 未选择，1 部分选择， 2 全选
    },
    checked: util.props.Boolean,
    inline: util.props.Boolean,
    disabled: util.props.Boolean,
    info: util.props.String,
  },
  data() {
    return {
      checkedValue: this.checked,
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
            vm.$emit("checkbox:change", event.target.checked);
            vm.validator(event, event.target.checked)
          }
        }
      );
    }
  },
  watch: {
    indeterminate: function(val) {
      this.setIndeterminate(val);
    },
    checked: function(val) {
      this.checkedValue = val;
    }
  },
  mounted() {
    if (this.indeterminate) this.setIndeterminate(Number(this.indeterminate));
  },
  methods: {
    setIndeterminate: function(val) {
      // 0 - 未 选 择
      // 1 - 部分选择
      // 2 - 全   选
      if (val == 0) {
        if (this.$refs.checkbox.indeterminate)
          this.$refs.checkbox.indeterminate = false;
        this.checkedValue = false;
      } else if (val == 1) {
        tools.dom.addAttr(this.$refs.checkbox, "indeterminate", "true");
        this.checkedValue = false;
      } else {
        if (this.$refs.checkbox.indeterminate)
          this.$refs.checkbox.indeterminate = false;
        this.checkedValue = true;
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

