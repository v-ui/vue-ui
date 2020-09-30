<template>
  <div
    v-if="showToast"
    class="toast fade px-0"
    :class="{show: showToast}"
    style="min-width: 300px;"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-animation="true"
  >
    <!-- header -->
    <div
      class="toast-header"
      style="font-size: 1.2em"
    >
      <slot name="header">
        <slot name="icon">
          <i
            class="mr-2"
            :class="iconClass"
          />
        </slot>
        <strong class="mr-auto">
          <font v-if="!href">{{ fillTitle }}</font>
          <a
            v-else
            :href="href"
          >{{ fillTitle }}</a>
        </strong>
        <b-info :info="info" />
      </slot>
      <button
        type="button"
        class="ml-2 mb-1 close"
        data-dismiss="toast"
        aria-label="Close"
        @click="hide"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <!-- body -->
    <div class="toast-body">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<script>
import config from "@/config/index.js";
import util from "@/components/util/index.js";

import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "BToast",
  components: { BInfo, },
  mixins: [ util.mixins.moment.base, ],
  props: {
    title: util.props.String,
    href: util.props.String,
    autohide: util.props.Boolean,
    time: [String, Number, Array],
    icon: util.props.String,
    content: util.props.String,
    delay: {
      ...util.props.UInt,
      default: 10000,
    },
    status: {
      type: String,
      validator: val =>
        [
          "",
          "info",
          "system",
          "issue",
          "warning",
          "error",
          "success",
          "danger"
        ].includes(val)
    }
  },
  data() {
    return {
      show: true
    };
  },
  computed: {
    showToast: function() {
      return (this.content || this.$slots.default) && this.show;
    },
    o: function() {
      return Object.getOwnPropertyDescriptor(config.ui.status, this.status);
    },
    iconClass: function() {
      let icon = this.icon,
        color = "";
      if (this.o && this.o.value) {
        (icon = this.o.value.icon), (color = this.o.value.color);
      }
      return `${icon} text-${color}`;
    },
    fillTitle: function() {
      return this.title || (this.o && this.o.value && this.o.value.title);
    },
    info: function() {
      return this.moment(this.time || this.moment()).from();
    }
  },
  mounted() {
    this.delayOut();
  },
  methods: {
    hide: function() {
      this.show = false;
    },
    delayOut: function() {
      if (this.autohide) return;
      setTimeout(() => this.hide(), this.delay);
    }
  }
};
</script>
