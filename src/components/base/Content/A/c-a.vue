<template>
  <a
    :href="href"
    :class="{disabled: disabled}"
    :target="filTarget"
    :rel="`noopener norefferrer ${rel}`"
    :aria-disabled="disabled"
  >
    <i v-if="!hideIcon && iconClass" class="pr-1 align-self-baseline" :class="iconClass" />
    <slot>{{ fillText }}</slot>
  </a>
</template>

<script>
import tool from "@/tool/index.js";
import config from "@/config/index.js";
import util from "@/components/util/index.js";

export default {
  name: "c-a",
  props: {
    href: {
      ...util.props.href,
      required: true
    },
    text: util.props.String,
    rel: util.props.String,
    icon: util.props.String,
    target: {
      ...util.props.String,
      default: "_self",
      validator: value => ["_self", "_blank"].includes(value)
    },
    disabled: util.props.Boolean,
    download: util.props.String,
    hideIcon: util.props.Boolean,
  },
  computed: {
    kind: function() {
      if (!this.href || ["#", "#top"].includes(this.href)) return null;
      // download
      if (this.download) return "download";
      //  blob: URL
      if (this.href.includes(":")) {
        const type = this.href.split(":")[0];
        if (type === "mailto") return "email";
        if (type === "tel") return "tel";
        if (type === "sms") return "sms";
      }
      // Anchor point
      if (this.href[0] === "#") return "hash";
      // url
      const regex = config.regex || null;
      if (regex) {
        if (this.href.match(new RegExp(regex))) return "url";
      }

      return null;
    },
    iconClass: function() {
      if (this.icon) return this.icon;
      if (!this.kind) return;
      const o = Object.getOwnPropertyDescriptor(config.ui.icon, this.kind);
      return o && o.value ? o.value : null;
    },
    fillText: function() {
      if (this.text) return this.text;
      if (["email", "tel", "sms"].includes(this.kind)) {
        const arr = this.href.split(":");
        return arr.length > 1 ? arr[1] : null;
      }
      return this.href;
    },
    filTarget: function() {
      return ["url", "download"].includes(this.kind) ? "_blank" : this.target;
    }
  },
  mounted() {
    if (this.disabled) tool.dom.addAttr(this.$el, "index", "-1");
    if (this.download) tool.dom.addAttr(this.$el, "download", this.download);
  },
  watch: {
    disabled: function(val) {
      val
        ? tool.dom.addAttr(this.$el, "index", "-1")
        : tool.dom.removeAttr(this.$el, "index");
    }
  }
};
</script>
