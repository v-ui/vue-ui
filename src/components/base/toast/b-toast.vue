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
        <basic-status
          :title="title"
          :icon="icon"
          :info="info"
          :status="status"
        />
        <b-info class="ms-auto" :info="addTime" />
      </slot>
      <button
        type="button"
        class="ms-2 mb-1 close"
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

import BasicStatus from "@/components/basic/basic-status.vue"
import BInfo from "@/components/basic/basic-info.vue";
export default {
  name: "BToast",
  components: { BasicStatus, BInfo, },
  mixins: [ util.mixins.moment.base, ],
  props: {
    autohide: util.props.Boolean,
    time: [String, Number, Array],
    title: util.props.String,
    icon: util.props.String,
    status: util.props.messageStatus,
    info: util.props.String,
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
    addTime: function() {
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
