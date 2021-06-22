<template>
  <input
    ref="check"
    :type="checkType"
    class="form-check-input"
    :value="value"
    :checked="checkedValue"
    :aria-checked="checkedValue"
    :disabled="disabled"
    :aria-disabled="disabled"
    @change="changed"
  />
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: 'BCheck',
  mixins: [ util.mixins.form.base, ],
  model: {
    prop: 'checked',
    event: 'check:changed'
  },
  props: {
    type: {
      type: String,
      default: 'checkbox',
      validator: value => ['radio', 'checkbox'].includes(value),
    },
    value: util.props.String,
    indeterminate: {// 仅适用于 type = checkbox
      ...util.props.Uint,
      validator: value => [0, 1, 2].includes(Number(value))
      // 0 未选择，1 部分选择， 2 全选
    },
    checked: util.props.Boolean,
    disabled: util.props.Boolean,
  },
  data() {
    return {
      checkedValue: this.checked,
    };
  },
  computed: {
    checkType: function() {
      return this.type === 'radio' ? 'radio' : 'checkbox'
    },
  },
  watch: {
    indeterminate: function(val) {
      this.setIndeterminate(val);
    },
    checked: function(value) {
      this.checkedValue = value
    },
  },
  mounted() {
    if (this.indeterminate) this.setIndeterminate(Number(this.indeterminate));
  },
  methods: {
    setIndeterminate: function(val) {
      if (this.checkType !== 'checkbox') return
      // 0 - 未 选 择
      // 1 - 部分选择
      // 2 - 全   选
      if (val == 0) {
        if (this.$refs.check.indeterminate)
          this.$refs.check.indeterminate = false;
        this.checkedValue = false;
      } else if (val == 1) {
        this.$refs.check.indeterminate = true;
        this.checkedValue = false;
      } else {
        if (this.$refs.check.indeterminate)
          this.$refs.check.indeterminate = false;
        this.checkedValue = true;
      }
    },
    changed: function(event) {
      this.$emit('check:changed', event.target.checked)
    },
  },
}
</script>
