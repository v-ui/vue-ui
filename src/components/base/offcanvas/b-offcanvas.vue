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
        <basic-label
          :label="dataTitle"
          :icon="dataIcon"
          :info="info"
          :iconColor="dataColor"
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

import BasicLabel from '@/components/basic/basic-label.vue'

export default {
  name: 'BOffcanvas',
  components: { BasicLabel, },
  mixins: [ util.mixins.status.message, ],
  props: {
    set: {
      type: String,
      default: 'start',
      validator: value => ['top', 'end', 'bottom', 'start'].includes(value)
    },
    info: util.props.String,
    content: util.props.String,
    scroll: util.props.Boolean,
    backdrop: util.props.Boolean,
  },
  computed: {
    ObjClass: function() {
      let set = this.set ? `offcanvas-${this.set}` : "";
      return `${set}`
    },
  },
}
</script>
