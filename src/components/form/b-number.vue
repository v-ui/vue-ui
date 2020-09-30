<template>
  <div>
    <b-input-group :size="size">
      <b-input-group-prepend v-if="!readonly && !disabled && !hideButton">
        <basic-button
          outline
          :disabled="subButtomDisabled"
          @click="subn"
        >
          <slot name="sub">
            {{ subValue }}
          </slot>
        </basic-button>
      </b-input-group-prepend>
      <basic-text
        v-model.number="number"
        :text-align="textAlign"
        :min="dataMin"
        :max="dataMax"
        :step="dataStep"
        :disabled="disabled"
        :readonly="readonly || textReadonly"
        v-bind="$attrs"
        v-on="$listeners"
        @click.native="click($event)"
        @change.native="change"
        @keyup.native.exact.up="add"
        @keyup.native.exact.down="subn"
        @keyup.native.shift.exact.up="superAdd"
        @keyup.native.shift.exact.down="superSubn"
      />
      <b-input-group-prepend v-if="!readonly && !disabled && !hideButton">
        <basic-button
          outline
          :disabled="addButtonDisabled"
          @click="add"
        >
          <slot name="add">
            {{ subValue }}
          </slot>
        </basic-button>
      </b-input-group-prepend>
    </b-input-group>
    <b-info :info="msg" />
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
    event: "number:changed"
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
    prompt: util.props.Boolean,
    info: util.props.String
  },
  data() {
    return {
      number: 0,
      setPrecision: 0,
      msg: ""
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
    dataAccuracy: function() {
      return this.toNmuber(this.accuracy);
    },
    subButtomDisabled: function() {
      return this.number <= this.dataMin || this.disabled;
    },
    addButtonDisabled: function() {
      return this.number >= this.dataMax || this.disabled;
    }
  },
  watch: {
    value: function(value) {
      this.number = this.toNmuber(value);
    }
  },
  mounted() {
    this.getPrecision();
    this.innitNumber();
    this.initInfo();
  },
  methods: {
    innitNumber: function() {
      this.number = this.formatNumber(this.toNmuber(this.value, this.dataMin));
    },
    initInfo: function() {
      this.msg = this.info || "";
      if (this.prompt) {
        let str = `${this.formatNumber(this.min)}-${this.formatNumber(
          this.max
        )},精度: ${this.formatNumber(this.step)}`;
        this.msg += this.info ? `(${str})` : str;
      }
    },
    toNmuber: function(str, n = 0) {
      return Number(str) || n;
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
      return Number.parseFloat(value).toFixed(this.setPrecision);
    },
    click: function(event) {
      if (this.textReadonly) return
      if (this.readonly || this.disabled) return;
      if (this.number == 0) event.target.value = "";
    },
    change: async function() {
      if (this.number === "") return;
      if (this.number < this.dataMin) this.number = this.dataMin;
      if (this.number > this.dataMax) this.number = this.dataMax;
      this.number = this.formatNumber(this.number);
      event.target.value = this.number;
      // 配合 v-model
      this.$emit("number:changed", this.number);
    },
    subn: function() {
      if (this.disabled || this.readonly) return;
      this.number = Number(this.number);
      this.number -= this.dataStep;
      this.change();
    },
    add: function() {
      if (this.disabled || this.readonly) return;
      this.number = Number(this.number);
      this.number += this.dataStep;
      this.change();
    },
    superSubn: function() {
      if (this.disabled || this.readonly) return
      this.number = Number(this.number)
      this.number -= this.dataStep * 10
      this.change()
    },
    superAdd: function() {
      if (this.disabled || this.readonly) return
      this.number = Number(this.number)
      this.number += this.dataStep * 10
      this.change()
    },
  }
};
</script>
