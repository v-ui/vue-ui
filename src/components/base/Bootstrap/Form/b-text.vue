<template>
  <div>
    <basic-text
      v-model="dataValue"
      ref="text"
      :type="cImputType"
      :style="cStyle"
      :length="Number(length)"
      :readonly="readonly"
      :disabled="disabled"
      :placeholder="cPlaceholder"
      v-bind="$attrs"
      v-on="$listeners"
      @blur.native="validator($event)"
    />
    <b-valid v-if="$slots.valid || validInfo" state="valid">
      <slot name="valid">{{ validInfo }}</slot>
    </b-valid>
    <b-valid v-if="$slots.invalid || invalidInfo" state="invalid">
      <slot name="invalid">{{ invalidInfo }}</slot>
    </b-valid>
    <b-info :info="info" />
    <i
      v-if="!hideIcon && cIcon"
      class="text-muted text-center position-absolute"
      :class="cIcon"
      style="top: 0.7em; left:1.5em; width: 1em;"
    />
  </div>
</template>
<script>
import tools from "@/tools/index.js";
import config from "@/config/index.js";
import util from "@/components/util/index.js";

import BasicText from "@/components/base/Bootstrap/Form/Basic/basic-text.vue";

import BValid from "@/components/base/Bootstrap/Form/Other/b-form-valid.vue";
import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-text",
  components: { BasicText, BValid, BInfo },
  mixins: [
    util.mixins.form.readonly,
    util.mixins.form.validator
  ],
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    type: {
      type: String,
      default: "text",
      validator: value => {
        // 这个值必须匹配下列字符串中的一个
        return [
          "text",
          "password",
          "search",
          "email",
          "url",
          "ip",
          "tel",
          "phone",
          "number"
        ].includes(value);
      }
    },
    value: util.props.String,
    placeholder: util.props.String,
    length: util.props.UInt,
    icon: util.props.String,
    hideIcon: util.props.Boolean,
    info: util.props.String
  },
  data() {
    return {
      dataValue: this.value
    }
  },
  computed: {
    cImputType: function() {
      if (this.type == "phone") return "tel";
      if (this.type == "ip") return "text";
      return this.type;
    },
    cPlaceholder: function() {
      const o = Object.getOwnPropertyDescriptor(
        config.ui.forms.placeholder,
        this.type
      );
      return this.placeholder || (o && o.value) || null;
    },
    cIcon: function() {
      if (["number"].includes(this.type)) return;
      const o = Object.getOwnPropertyDescriptor(config.ui.icon, this.type);
      return this.icon || (o && o.value) || null;
    },
    cStyle: function() {
      let o = {};
      if (!this.hideIcon && this.cIcon)
        Object.assign(o, { "padding-left": "2em" });
      return o;
    },
    defaultRegex: function() {
      if (["number"].includes(this.type)) return null;
      const o = Object.getOwnPropertyDescriptor(config.regex, this.type);
      return this.pattern
        ? tools.string.toRegExp(this.pattern.toString())
        : (o && o.value) || null;
    }
  },
  watch: {
    value: function(value) {
      this.dataValue = value
      this.$emit("input", value);
    }
  }
};
</script>
<style scoped>
/* 隐藏数字控件的默认上下箭头 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: test-field;
}
</style>
