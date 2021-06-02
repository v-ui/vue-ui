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
      class="modal-dialog my-0"
      :class="documentClass"
      :style="documentStyle"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot
              v-if="$slots.icon || showIcon"
              name="icon"
            >
              <i
                class="me-2"
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
    hideFooter: util.props.Boolean,
    drawer: util.props.Boolean,
    size: {
      type: String,
      default: "",
      validator: function(val) {
        return ["", "xl", "lg", "sm"].includes(val);
      }
    }, // modal-xl modal-lg modal-sm
    set: {
      ...util.props.set,
      default: 'up',
    },
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
      let size = this.size ? `modal-${this.size}` : "";
      let set = ''
      switch (this.set) {
        case 'left':
          set = 'w-25 ms-0 d-flex align-items-right'
          break;
        case 'right':
          set = 'w-25 me-0 d-flex align-items-right'
          break;
        case 'center':
          set = 'd-flex align-items-center'
          break;
        case 'down':
          set = 'd-flex align-items-end'
          break;
        default:
          set = ''
      }
      return `${scrol} ${set} ${size}`;
    },
    documentStyle: function() {
      let set = ''
      switch (this.set) {
        case 'left':
          set = this.drawer ? 'min-height: 100%' : ''
          break;
        case 'right':
          set = this.drawer ? 'min-height: 100%' : ''
          break;
        case 'center':
          set = this.drawer ? 'min-height: 100%; min-width: 100%' : 'min-height: 100%;'
          break;
        case 'down':
          set = this.drawer ? 'min-height: 100%; min-width: 100%' : 'min-height: 100%'
          break;
        default:
          set = this.drawer ? 'min-width: 100%' : ''
      }
      return set
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
