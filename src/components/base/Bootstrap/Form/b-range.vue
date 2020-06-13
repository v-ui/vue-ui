<template>
  <div>
    <div class="row align-items-center mx-1">
      <span
        v-if="prompt || minValue"
        class="col-auto text-right text-monospace pl-0 pr-1"
      >{{ fillMinValue }}</span>
      <input
        ref="range"
        type="range"
        class="custom-range col"
        :min="min"
        :max="max"
        :step="step"
        :value="select"
        v-bind="$attrs"
        v-on="inputListeners"
      >
      <span
        v-if="prompt || maxValue"
        class="col-auto text-left text-monospace pl-1 pr-0"
      >{{ fillMaxValue }}</span>
      <span class="col-auto text-left text-monospace px-1" v-if="!hideValue">{{ select }}</span>
    </div>
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BInfo from "@/components/base/Bootstrap/Form/Other/b-form-info.vue";

export default {
  name: "b-range",
  components: { BInfo },
  inheritAttrs: false,
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    min: util.props.Number,
    max: {
      ...util.props.Number,
      default: 100
    },
    step: {
      ...util.props.Number,
      default: 1
    },
    value: {
      type: [Number, String],
      default: value => !isNaN(value) ? Number(value) : Number(this.min),
      validator: value => !isNaN(value)
    },
    prompt: util.props.Boolean,
    hideValue: util.props.Boolean,
    info: util.props.String,
    minValue: util.props.String,
    maxValue: util.props.String
  },
  data() {
    return {
      select: Number(this.value),
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
          input: function(event) {
            vm.select = event.target.value;
            vm.$emit("input", vm.select);
          }
        }
      );
    },
    fillMinValue: function() {
      return this.minValue ? this.minValue : Number(this.min);
    },
    fillMaxValue: function() {
      return this.maxValue ? this.maxValue : Number(this.max);
    },
  },
  watch: {
    value: function(value) {
      this.select = Number(value);
    }
  }
};
</script>
