<template>
  <div>
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
      <label
        v-for="(item, index) in list"
        :key="index"
        class="btn"
        :class="[`btn-${item.color || color}`, { active: item.value == value, disabled: disabled || item.disabled }]"
        @click="selected = item.value"
      >
        <input
          type="radio"
          :name="name"
          :id="item.id"
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

import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-radio-button-group",
  components: { BInfo },
  model: {
    prop: "value",
    event: "raido:checked"
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
  data() {
    return {
      selected: this.value,
    }
  },
  watch: {
    value: function(value) {
      this.selected = value
    },
    selected: function(value) {
      this.$emit('raido:checked', value)
    },
  },
};
</script>
