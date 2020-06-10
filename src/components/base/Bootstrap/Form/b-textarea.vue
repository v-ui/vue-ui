<template>
  <div>
    <textarea
      class="form-control"
      :class="[objClass, readonlyClass]"
      :style="objStyle"
      :rows="Number(rows)"
      :cols="Number(cols)"
      :readonly="readonly"
      :aria-readonly="readonly"
      :disabled="disabled"
      :aria-disabled="disabled"
      v-bind="$attrs"
      v-on="inputListeners"
      @input.stop="change"
      @blur="validator"
    />
    <b-valid v-if="validInfo || $slots.valid" state="valid">
      <slot name="valid">{{ validInfo }}</slot>
    </b-valid>
    <b-valid v-if="invalidInfo || $slots.invalid" state="invalid">
      <slot name="invalid">{{ invalidInfo }}</slot>
    </b-valid>
    <b-info :info="message" />
  </div>
</template>
<script>
import tool from "@/tool/index.js";
import util from "@/components/util/index.js";

import BValid from "@/components/base/Bootstrap/Form/Other/b-form-valid.vue";
import BInfo from "@/components/base/Bootstrap/Form/Other/b-form-info.vue";

export default {
  name: "b-textarea",
  components: { BValid, BInfo },
  mixins: [
    util.mixins.form.base,
    util.mixins.form.readonly,
    util.mixins.form.validator
  ],
  inheritAttrs: false,
  props: {
    rows: {
      ...util.props.UInt,
      default: 3,
    },
    cols: util.props.UInt,
    maxlength: {
      ...util.props.UInt,
      default: 1024
    },
    info: util.props.String,
    prompt: util.props.Boolean,
    resize: util.props.Boolean
  },
  data() {
    return {
      message: ""
    };
  },
  computed: {
    objStyle: function() {
      return this.resize ? "" : "resize: none";
    }
  },
  mounted() {
    this.message = this.info || "";
    if (this.prompt) {
      this.message += this.info
        ? `(已输入 0 个字符，还可输入 ${this.maxlength} 个字符)`
        : `已输入 0 个字符，还可输入 ${this.maxlength} 个字符`;
    }
  },
  methods: {
    change: function(e) {
      if (!this.prompt) return;
      let message = "";
      let codeCount = tool.string.codePointLength(e.target.value);
      if (this.maxlength >= codeCount)
        message = `已输入 ${codeCount} 个字符，还可输入 ${this.maxlength -
          codeCount} 个字符`;
      else
        message = `已输入 ${codeCount} 个字符，已超出 ${codeCount -
          this.maxlength} 个字符`;

      this.message = this.info ? this.info + `(${message})` : message;
    }
  }
};
</script>
