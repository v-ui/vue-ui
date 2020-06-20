<template>
  <div class="btn-group-toggle" data-toggle="buttons">
    <label
      class="btn"
      :class="[objClass, {'disabled' : disabled}]"
      :disabled="disabled"
      :aria-pressed="active"
      :aria-disabled="disabled"

    >
      <input
        type="checkbox"
        :value="value"
        :checked="checked"
        :aria-checked="checked"
        :disabled="disabled"
        :aria-disabled="disabled"
        v-bind="$attrs"
        v-on="inputListeners"
      >
      {{ label || value || 'Checkbox Button' }}
    </label>
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-checkbox-button-group",
  components: {BInfo},
  mixins: [util.mixins.form.btn],
  inheritAttrs: false,
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    value: util.props.String,
    label: util.props.String,
    info: util.props.String,
    checked: util.props.Boolean,
    disabled: util.props.Boolean
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
  watch: {
    checked: function(val) {
      this.active = val;
    }
  }
};
</script>
