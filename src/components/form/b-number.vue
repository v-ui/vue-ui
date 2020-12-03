<template>
  <div>
    <b-input-group :size="size">
      <b-input-group-prepend v-if="!readonly && !disabled && !hideButton">
        <basic-button
          class="border-0"
          color="light"
          :disabled="subButtomDisabled"
          @click="subn"
        >
          <slot name="sub">
            {{ subValue }}
          </slot>
        </basic-button>
      </b-input-group-prepend>
      <basic-text
        ref="input"
        v-model.number="number"
        :text-align="textAlign"
        :min="dataMin"
        :max="dataMax"
        :step="dataStep"
        :disabled="disabled"
        :readonly="readonly || textReadonly"
        v-bind="$attrs"
        v-on="$listeners"
        @blur.native="blur"
        @click.native="click"
        @change.native="change"
        @keyup.native.exact.up="add"
        @keyup.native.exact.down="subn"
        @keyup.native.shift.exact.up="superAdd"
        @keyup.native.shift.exact.down="superSub"
      />
      <b-input-group-prepend v-if="!readonly && !disabled && !hideButton">
        <basic-button
          class="border-0"
          color="light"
          :disabled="addButtonDisabled"
          @click="add"
        >
          <slot name="add">
            {{ addValue }}
          </slot>
        </basic-button>
      </b-input-group-prepend>
    </b-input-group>
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BasicText from "@/components/form/Basic/basic-text.vue";
import BasicButton from "@/components/basic/Button/basic-button.vue";

import BInputGroup from "@/components/form/InputGroup/b-input-group.vue";
import BInputGroupPrepend from "@/components/form/InputGroup/b-input-group-prepend.vue";
// import BInputGroupText from "@/components/form/InputGroup/b-input-group-text.vue";

import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BNumber",
  components: {
    BasicText,
    BasicButton,
    BInputGroup,
    BInputGroupPrepend,
    BInfo
  },
  mixins: [util.mixins.form.readonly],
  inheritAttrs: false,
  model: {
    prop: "value",
    event: "number:change"
  },
  props: {
    min: util.props.Number,
    max: {
      ...util.props.Number,
      default: 100
    },
    accuracy: {
      ...util.props.Int,
      default: -1
    },
    step: {
      ...util.props.UNumber,
      default: 1
    },
    value: {
      type: [String, Number],
      default: function(value) {
        return !isNaN(value) ? Number(value) : Number(this.min);
      },
      validator: value => !isNaN(value)
    },
    subValue: {
      ...util.props.String,
      default: "-"
    },
    addValue: {
      ...util.props.String,
      default: "+"
    },
    textAlign: {
      ...util.props.setX,
      default: "center"
    },
    textReadonly: util.props.Boolean,
    size: util.props.size,
    hideButton: util.props.Boolean,
    info: util.props.String
  },
  data() {
    return {
      number: 0,
      setPrecision: 0,
    };
  },
  computed: {
    dataStep: function() {
      return this.toNmuber(this.step);
    },
    dataMin: function() {
      return this.toNmuber(this.min);
    },
    dataMax: function() {
      return this.toNmuber(this.max, 100);
    },
    dataNumber: function() {
      return this.toNmuber(this.number)
    },
    dataAccuracy: function() {
      return this.toNmuber(this.accuracy);
    },
    subButtomDisabled: function() {
      return this.dataNumber <= this.dataMin || this.disabled;
    },
    addButtonDisabled: function() {
      return this.dataNumber >= this.dataMax || this.disabled;
    }
  },
  watch: {
    value: function(value) {
      this.number = this.formatNumber(this.toNmuber(value))
    },
    number: function() {
      this.blur()
    },
  },
  mounted() {
    this.getPrecision();
    this.innitNumber();
  },
  methods: {
    innitNumber: function() {
      this.number = this.formatNumber(this.toNmuber(this.value, this.dataMin));
    },
    toNmuber: function(value, n = 0) {
      return !isNaN(value) ? Number(value) : n
    },
    getNumberPrecision: function(number) {
      let str = number.toString().split(".");
      return str.length !== 2 ? 0 : str[1].length;
    },
    getPrecision: function() {
      if (this.dataAccuracy >= 0) {
        this.setPrecision = this.dataAccuracy;
        return;
      }
      // 返回精度最高的
      this.setPrecision = Math.max(
        this.getNumberPrecision(this.dataStep),
        this.getNumberPrecision(this.toNmuber(this.value))
      );
    },
    formatNumber: function(value) {
      return Number(value).toFixed(this.setPrecision);
    },
    click: function() {
      if (this.textReadonly) return
      if (this.readonly || this.disabled) return;
      if (this.dataNumber == 0) this.$refs.input.$el.value = ""
    },
    change: function() {
      if (this.dataNumber < this.dataMin) this.number = this.dataMin;
      if (this.dataNumber > this.dataMax) this.number = this.dataMax;
      this.number = this.formatNumber(this.number);
      this.$refs.input.$el.value = this.number;
      // 配合 v-model
      this.$emit("number:change", this.toNmuber(this.number));
    },
    blur: function() {
      if (isNaN(this.$refs.input.$el.value)) return
      this.$refs.input.$el.value = this.number
    },
    calculator: function(callback) {
      if (this.disabled || this.readonly) return;
      callback && callback()
      this.change();
    },
    subn: function() {
      this.calculator(() => this.number = this.dataNumber - this.dataStep)
    },
    add: function() {
      this.calculator(() => this.number = this.dataNumber + this.dataStep)
    },
    superSub: function() {
      this.calculator(() => this.number = this.dataNumber - this.dataStep * 10)
    },
    superAdd: function() {
      this.calculator(() => this.number = this.dataNumber + this.dataStep * 10)
    },
  }
};
</script>
