<template>
  <div class="p-0" :class="{'form-floating': floatLabel}">
    <basic-textarea
      v-model="dataValue"
      :id="id"
      :size="size"
      :resize="resize"
      :rows="Number(rows)"
      :cols="Number(cols)"
      :readonly="readonly"
      :disabled="disabled"
      v-bind="$attrs"
      v-on="$listeners"
      @input.native.stop="change"
      @blur.native="validator"
    />
    <b-valid
      v-if="validInfo || $slots.valid"
      state="valid"
    >
      <slot name="valid">
        {{ validInfo }}
      </slot>
    </b-valid>
    <b-valid
      v-if="invalidInfo || $slots.invalid"
      state="invalid"
    >
      <slot name="invalid">
        {{ invalidInfo }}
      </slot>
    </b-valid>
    <b-form-text :info="message" />
    <label v-if="floatLabel" :for="id">{{ floatLabel }}</label>
  </div>
</template>
<script>
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import BasicTextarea from "@/components/form/Basic/basic-textarea.vue";

import BValid from "@/components/form/Other/b-form-valid.vue";
import BFormText from "@/components/form/Other/b-form-text.vue";

export default {
  name: "BTextarea",
  components: { BasicTextarea, BValid, BFormText },
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
    value: util.props.String,
    floatLabel: util.props.String,
    rows: {
      ...util.props.UInt,
      default: 3
    },
    cols: util.props.UInt,
    size: util.props.size,
    maxlength: {
      ...util.props.UInt,
      default: 1024
    },
    info: util.props.String,
    disabled: util.props.Boolean,
    prompt: util.props.Boolean,
    resize: util.props.Boolean,
    id: {
      type: String,
      default: function() {
        return "textarea-" + tools.random.getRandomString();
      }
    },
  },
  data() {
    return {
      message: "",
      dataValue: this.value,
    };
  },
  watch: {
    value: function(value) {
      this.dataValue = value
      this.$emit("input", value);
    }
  },
  mounted() {
    let codeCount = tools.string.codePointLength(this.value);
      this.showCodeCount(codeCount)
  },
  methods: {
    change: function(e) {
      let codeCount = tools.string.codePointLength(e.target.value);
      this.showCodeCount(codeCount)
    },
    showCodeCount: function(codeCount) {
      if (!this.prompt) return;
      let message = "";
      if (this.maxlength > codeCount)
        message = `已输入 ${codeCount} 个字符，还可输入 ${this.maxlength -
          codeCount} 个字符`;
      else if (this.maxlength === codeCount)
        message = `已输入 ${codeCount} 个字符，不能输入更多字符`;
      else
        message = `已输入 ${codeCount} 个字符，已超出 ${codeCount -
          this.maxlength} 个字符`;

      this.message = this.info + ` (${message})`
    }
  }
};
</script>
