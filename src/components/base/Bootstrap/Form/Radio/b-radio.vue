<template>
  <div class="custom-control custom-radio" :class="{ 'custom-control-inline': inline}">
    <input
      type="radio"
      class="custom-control-input"
      :class="ValidClass"
      :id="id"
      :value="value"
      :checked="value ? checked == value : checked"
      :aria-checked="value ? checked  == value : checked"
      :disabled="disabled"
      :aria-disabled="disabled"
      v-bind="$attrs"
      v-on="inputListeners"
    >
    <label class="custom-control-label" :for="id">{{ label || value }}</label>
    <font v-if="inline" />
    <slot name="valid" />
    <b-info :class="{ 'pl-1': inline }" :info="info" />
  </div>
</template>

<script>
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-radio",
  inheritAttrs: false,
  components: { BInfo },
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    value: util.props.String,
    label: util.props.String,
    info: util.props.String,
    ValidClass: util.props.String,
    disabled: util.props.Boolean,
    id: {
      type: String,
      default: function() {
        return "Radio-" + tools.random.getRandomString();
      }
    },
    checked: [String, Boolean],
    inline: util.props.Boolean,
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
            vm.$emit("change", event.target.value);
          }
        }
      );
    }
  }
};
</script>
