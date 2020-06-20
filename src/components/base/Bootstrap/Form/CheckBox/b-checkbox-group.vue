<template>
  <div>
    <template v-for="(item, index) in list">
      <checkbox
        :id="item.id"
        :key="item.key ? item.key : (item.id ? item.id : index)"
        :color="color"
        :label="item.label || item.value || item"
        unvalid
        :value="item.value || item"
        :valid-class="ValidClass"
        :checked="values.includes(item.value)"
        :disabled="item.disabled || disabled"
        v-bind="$attrs"
        v-on="inputListeners"
        @input="getCheckedValues($event)"
      >
        <template v-if="list.length - 1 == index" #valid>
          <slot name="valid">{{ validInfo }}</slot>
        </template>
        <template v-if="list.length - 1 == index" #invalid>
          <slot name="invalid">{{ invalidInfo }}</slot>
        </template>
      </checkbox>
    </template>
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import checkbox from "./b-checkbox";
import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-checkbox-group",
  components: { checkbox, BInfo },
  mixins: [util.mixins.form.base, util.mixins.form.validator],
  inheritAttrs: false,
  model: {
    prop: "values",
    event: "change"
  },
  props: {
    list: util.props.Array,
    values: util.props.Array,
    info: util.props.String,
    disabled: util.props.Boolean
  },
  data() {
    return {
      ValidClass: ""
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
          change: function() {
            vm.$emit("change", vm.values);
            vm.validator(event);
          }
        }
      );
    }
  },
  methods: {
    getCheckedValues: function(event) {
      if (event.target.checked) {
        this.values.push(event.target.value);
      } else {
        if (this.values.includes(event.target.value))
          this.values.splice(this.values.indexOf(event.target.value), 1);
      }
      this.validator();
    },
    validator: function() {
      if (this.unvalid) return; // 不做验证
      if (!this.required) return; // required false 时不校验
      if (this.disabled) return; // disabled 时不校验
      // 移除可能的 is-valid
      this.ValidClass = "";
      // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
      if (!this.values || this.values.length == 0) {
        this.ValidClass = "is-invalid";
        this.$emit("invalid", "required");
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
