<template>
  <div
    class="modal fade"
    :class="ObjClass"
    tabindex="-1"
    role="dialog"
    :aria-labelledby="labelledby"
    :aria-modal="show"
    aria-hidden="false"
  >
    <div
      class="modal-dialog"
      :class="documentClass"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot v-if="$slots.icon || showIcon" name="icon">
              <i
                class="mr-2"
                :class="iconClass"
              />
            </slot>
            {{ dataTitle }}
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot>{{ content }}</slot>
        </div>
        <div
          v-if="!hideFooter"
          class="modal-footer"
        >
          <slot name="footer">
            <!-- TODO: 关闭方式存在问题 -->
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
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

export default {
  name: "BModal",
  mixins: [ util.mixins.status.message, ],
  props: {
    content: util.props.String,
    scrol: util.props.Boolean, //modal-dialog-scrollable
    center: util.props.Boolean, // modal-dialog-centered
    hideFooter: util.props.Boolean,
    size: {
      type: String,
      default: "",
      validator: function(val) {
        return ["", "xl", "lg", "sm"].includes(val);
      }
    }, // modal-xl modal-lg modal-sm
    labelledby: {
      ...util.props.String,
      default: "Modal Dialog"
    },
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
      let scrol = this.scrol ? "modal-dialog-scrollable" : "";
      let center = this.center ? "modal-dialog-centered" : "";
      let size = this.size ? `modal-${this.size}` : "";
      return `${scrol} ${center} ${size}`;
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
