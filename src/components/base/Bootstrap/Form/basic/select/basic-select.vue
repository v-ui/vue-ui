<template>
  <select
    class="custom-select"
    :class="[cClass, sizeClass]"
    :size="row"
    :multiple="multiple"
    :disabled="disabled"
    :aria-disabled="disabled"
    v-on="inputListeners"
    @change.stop="change"
  >
    <slot>
      <option
        v-if="!hideNull"
        value
        :selected="value.length == 0"
        :aria-selected="value.length == 0"
      >&lt;Pleace select...&gt;</option>
      <basic-select-option
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        :multiple="multiple"
        :is-selected-value="isSelectedValue"
      />
    </slot>
  </select>
</template>

<script>
import util from "@/components/util/index.js";

import BasicSelectOption from "./basic-select-option.vue";

export default {
  name: "basic-select",
  components: { BasicSelectOption, },
  mixins: [util.mixins.form.base,],
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    list: util.props.Array,
    disabled: util.props.Boolean,
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
      }
    },
    multiple: util.props.Boolean
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
  watch: {
    value: function() {
      this.isSelectedValue = this.value;
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
    }
  }
};
</script>

