<template>
  <div>
    <div
      class="btn-group btn-group-toggle w-100"
      :class="groupClass"
      data-toggle="buttons"
    >
      <label
        v-for="(item, index) in list"
        :key="index"
        class="btn"
        :class="[`btn-${item.color || color}`, { active: item.value == value, disabled: disabled || item.disabled }]"
        @click="selected = item.value"
      >
        <input
          :id="item.id"
          type="radio"
          :name="name"
          autocomplete="off"
          :value="item.value"
          :checked="item.value == value"
          :aria-checked="item.value == selected"
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

import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BRadioButtonGroup",
  components: { BInfo },
  model: {
    prop: "value",
    event: "raido:change"
  },
  props: {
    value: util.props.String,
    list: util.props.Array,
    info: util.props.String,
    size: util.props.size,
    disabled: util.props.Boolean,
    color: util.props.color,
    name: {
      ...util.props.String,
      required: true
    }
  },
  data() {
    return {
      selected: this.value,
    }
  },
  computed: {
    groupClass: function() {
      let size = this.size ? `btn-group-${this.size}` : ''
      return `${size}`
    },
  },
  watch: {
    value: function(value) {
      this.selected = value
    },
    selected: function(value) {
      this.$emit('raido:change', value)
    },
  },
};
</script>
