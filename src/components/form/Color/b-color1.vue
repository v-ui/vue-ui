<template>
  <b-drop-picker
    :style="style"
    placeholder="请选择"
    :value="showValue"
    :text-color="textColor"
  >
    <div class="row text-center px-1 mx-1 my-2">
      <b-number
        ref="r"
        v-model.number="color.r"
        class="col"
        size="sm"
        hide-button
        :min="rgbmin"
        :max="rgbmax"
        :readonly="disabled"
      />
      <b-number
        ref="g"
        v-model.number="color.g"
        class="col"
        size="sm"
        hide-button
        :min="rgbmin"
        :max="rgbmax"
        :readonly="disabled"
      />
      <b-number
        ref="b"
        v-model.number="color.b"
        class="col"
        size="sm"
        hide-button
        :min="rgbmin"
        :max="rgbmax"
        :readonly="disabled"
      />
      <b-number
        ref="a"
        v-model.number="color.a"
        class="col"
        size="sm"
        hide-button
        :min="amin"
        :max="amax"
        :step="astep"
        :readonly="disabled"
      />
    </div>
    <b-range
      v-model="color.r"
      :min="rgbmin"
      :max="rgbmax"
      :disabled="disabled"
    />
    <b-range
      v-model="color.g"
      :min="rgbmin"
      :max="rgbmax"
      :disabled="disabled"
    />
    <b-range
      v-model="color.b"
      :min="rgbmin"
      :max="rgbmax"
      :disabled="disabled"
    />
    <b-range
      v-model="color.a"
      :min="amin"
      :max="amax"
      max-value="1"
      :step="astep"
      :disabled="disabled"
    />
  </b-drop-picker>
</template>

<script>
import util from "@/components/util/index.js";

import BNumber from "@/components/formConter/b-number.vue";
import BRange from "@/components/formConter/b-range.vue";
import BDropPicker from "@/components/base/DropdownPicker/b-dropdown-picker.vue";

export default {
  name: "BColor",
  components: { BNumber, BRange, BDropPicker },
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    value: util.props.Object,
    disabled: util.props.Boolean,
  },
  data() {
    return {
      color: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
      },
      rgbmin: 0,
      rgbmax: 255,
      amin: 0,
      amax: 1,
      astep: 0.1
    };
  },
  computed: {
    style: function() {
      return {
        background: this.showValue
      };
    },
    textColor: function() {
      return this.color.r < 200 || (this.color.g < 200 && this.color.b < 200)
        ? "white"
        : "dark";
    },
    showValue: function() {
      return `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`;
    }
  },
  watch: {
    color: {
      handler: function(value) {
        this.$emit("input", { r: value.r, g: value.g, b: value.b, a: value.a });
      },
      deep: true
    }
  },
  mounted() {
    this.color.r = Number(this.value.r) || 0;
    this.color.g = Number(this.value.g) || 0;
    this.color.b = Number(this.value.b) || 0;
    this.color.a = Number(this.value.a) || 1;
  }
};
</script>
