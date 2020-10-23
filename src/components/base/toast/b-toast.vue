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
        <slot v-if="$slots.icon || showIcon" name="icon">
          <i
            class="mr-2"
            :class="iconClass"
          />
        </slot>
        <strong class="mr-auto">
          <font v-if="!href">{{ dataTitle }}</font>
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
import util from "@/components/util/index.js";

import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BToast",
  components: { BInfo, },
  mixins: [ util.mixins.moment.base, util.mixins.status.message, ],
  props: {
    autohide: util.props.Boolean,
    time: [String, Number, Array],
    content: util.props.String,
    delay: {
      ...util.props.UInt,
      default: 10000,
    },
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
