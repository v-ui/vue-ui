<template>
  <div
    class="btn-group-toggle w-100"
    :class="groupClass"
    data-toggle="buttons"
  >
    <label
      class="btn"
      :class="[objClass, {'disabled' : disabled}]"
      :disabled="disabled"
      :aria-disabled="disabled"
      @click="selected = !selected"
    >
      <input
        type="checkbox"
        :value="value"
        :checked="selected"
        :aria-checked="selected"
        :disabled="disabled"
        :aria-disabled="disabled"
      >
      {{ label || value || 'Checkbox Button' }}
    </label>
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BCheckboxButtonGroup",
  components: { BInfo },
  mixins: [util.mixins.form.btn],
  model: {
    prop: "checked",
    event: "checkbox:change"
  },
  props: {
    value: util.props.String,
    label: util.props.String,
    info: util.props.String,
    size: util.props.size,
    checked: util.props.Boolean,
    disabled: util.props.Boolean
  },
  data() {
    return {
      selected: this.checked,
    }
  },
  computed: {
    groupClass: function() {
      let size = this.size ? `btn-group-${this.size}` : ''
      return `${size}`
    },
  },
  watch: {
    checked: function(value) {
      this.selected = value
    },
    selected: function(value) {
      this.$emit('checkbox:change', value)
    }
  },
};
</script>
