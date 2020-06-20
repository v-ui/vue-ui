<template>
  <div>
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
      <label
        v-for="(item, index) in list"
        :key="index"
        class="btn"
        :class="[`btn-${item.color || color}`, { active: item.value == value, disabled: disabled || item.disabled }]"
      >
        <input
          type="radio"
          :name="name"
          :id="item.id"
          autocomplete="off"
          :value="item.value"
          :checked="item.value == value"
          :aria-checked="item.value == value"
          :disabled="disabled || item.disabled"
          :aria-diasbled="disabled || item.disabled"
          v-bind="$attrs"
          v-on="inputListeners"
        >
        {{ item.label }}
      </label>
    </div>
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-radio-button-group",
  components: { BInfo },
  inheritAttrs: false,
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: util.props.String,
    list: util.props.Array,
    info: util.props.String,
    disabled: util.props.Boolean,
    color: util.props.color,
    name: {
      ...util.props.String,
      required: true
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
          change: function() {
            vm.$emit("change", event.target.value);
          }
        }
      );
    }
  },
};
</script>
