<template>
  <div>
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
      <label
        v-for="(item, index) in list"
        :key="index"
        class="btn"
        v-bind="$attrs"
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
        >
        {{ item.label }}
      </label>
    </div>
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BInfo from "@/components/base/Bootstrap/Form/Other/b-form-info.vue";

export default {
  name: "b-radio-button-group",
  components: { BInfo },
  inheritAttrs: false,
  model: {
    prop: "value",
    event: "input"
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
  }
};
</script>
