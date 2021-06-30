<template>
  <div
    class="modal fade"
    :class="ObjClass"
    tabindex="-1"
    role="dialog"
    :data-bs-keyboard="keyboard.toString()"
    :data-bs-backdrop="backdrop.toString()"
    :aria-modal="show"
    :aria-hidden="!show"
  >
    <div
      class="modal-dialog my-0"
      :class="documentClass"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <basic-status
              strong
              :title="title"
              :icon="icon"
              :info="info"
              :status="status"
            />
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <slot>{{ content }}</slot>
        </div>
        <div
          v-if="!hideFooter"
          class="modal-footer"
        >
          <slot name="footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
            >
              Save changes
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BasicStatus from "@/components/basic/basic-status.vue"

export default {
  name: "BModal",
  components: { BasicStatus, },
  props: {
    title: util.props.String,
    icon: util.props.String,
    status: util.props.messageStatus,
    info: util.props.String,
    content: util.props.String,
    backdrop: {
      type: [ String, Boolean ],
      default: true,
    },
    keyboard: {
      ...util.props.Boolean,
      default: true,
    },
    scrol: {
      ...util.props.Boolean,
      default: true,
    }, // modal-dialog-scrollable
    center: util.props.Boolean,// modal-dialog-centered
    hideFooter: util.props.Boolean,
    size: {
      type: String,
      default: "",
      validator: function(val) {
        return ["", "xl", "lg", "sm"].includes(val);
      }
    }, // modal-xl modal-lg modal-sm
  },
  data() {
    return {
      show: true
    };
  },
  computed: {
    ObjClass: function() {
      return this.show ? "show" : "";
    },
    documentClass: function() {
      let size = this.size ? `modal-${this.size}` : "";
      let scrol = this.scrol ? "modal-dialog-scrollable" : "";
      let center = this.center ? 'modal-dialog-centered' : ''

      return `${scrol} ${size} ${center}`;
    },
  },
  methods: {
    hideModel: function() {
      this.show = false;
    },
    dismiss: function() {
      this.hideModel();
      this.$emit("click:dismiss");
    }
  }
};
</script>
