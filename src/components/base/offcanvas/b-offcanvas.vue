<template>
  <div
    class="offcanvas"
    :class="ObjClass"
    :data-bs-scroll="scroll"
    :data-bs-backdrop="backdrop.toString()"
    tabindex="-1"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">
        <basic-status
          :title="title"
          :icon="icon"
          :info="info"
          :status="status"
        />
      </h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
    </div>
    <div class="offcanvas-body">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BasicStatus from "@/components/basic/basic-status.vue"

export default {
  name: 'BOffcanvas',
  components: { BasicStatus, },
  props: {
    set: {
      type: String,
      default: 'start',
      validator: value => ['top', 'end', 'bottom', 'start'].includes(value)
    },
    title: util.props.String,
    icon: util.props.String,
    status: util.props.messageStatus,
    info: util.props.String,
    content: util.props.String,
    scroll: {
      ...util.props.Boolean,
      default: true,
    },
    backdrop: {
      ...util.props.Boolean,
      default: true,
    },
  },
  computed: {
    ObjClass: function() {
      let set = this.set ? `offcanvas-${this.set}` : "";
      return `${set}`
    },
  },
}
</script>
