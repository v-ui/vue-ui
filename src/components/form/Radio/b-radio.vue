<template>
  <input
    type="radio"
    class="form-check-input"
    :class="mixClass"
    :style="mixStyle"
    :value="value"
    :checked="isChecked"
    :aria-checked="isChecked"
    :disabled="disabled"
    :aria-disabled="disabled"
    @change="changed"
  >
</template>

<script>
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

export default {
  name: 'BRadio',
  mixins: [
    util.mixins.base.style,
    util.mixins.form.base,
  ],
  model: {
    prop: 'checked',
    event: 'radio:changed'
  },
  props: {
    value: util.props.String,
    checked: [String, Number, Boolean, Object],
    disabled: util.props.Boolean,
  },
  computed: {
    isChecked: function() {
      if (tools.obj.type.isBoolean(this.checked)) return this.checked
      else if (tools.obj.type.isString(this.checked) || tools.obj.type.isNumber(this.checked)) return this.checked === this.value
      return false
    },
  },
  methods: {
    changed: function(event) {
      this.$emit('radio:changed', event.target.value)
    },
  },
}
</script>
