<template>
  <tran-out-in>
    <div
      v-if="showToast"
      class="toast"
      :class="{show: showToast}"
      style="min-width: 300px;"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <!-- header -->
      <div
        class="toast-header"
        style="font-size: 1.2em"
      >
        <slot name="header">
          <basic-status
            strong
            :title="title"
            :icon="icon"
            :info="info"
            :status="status"
          />
          <b-info class="ms-auto" :info="addTime" />
        </slot>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="hide"
        />
      </div>
      <!-- body -->
      <div class="toast-body">
        <slot>{{ content }}</slot>
      </div>
    </div>
  </tran-out-in>
</template>

<script>
import util from "@/components/util/index.js";

import BasicStatus from "@/components/basic/basic-status.vue"
import BInfo from "@/components/basic/basic-info.vue";

import TranOutIn from "@/components/transition/tran-out-in.vue";
export default {
  name: "BToast",
  components: { BasicStatus, BInfo, TranOutIn },
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
