<template>
  <div>
    <div
      ref="popRef"
      class="d-inline-block"
      @click="show = !show"
    >
      <slot
        aria-describedby="tooltip"
        name="popRef"
      />
    </div>
    <tran-drop>
      <div
        ref="popover"
        class="popover fade"
        :class="objClass"
        role="tooltip"
        style="position: absolute; will-change: transform;"
      >
        <div
          ref="arrow"
          class="popover-arrow"
          data-popper-arrow
        />
        <div
          ref="header"
          class="popover-header"
        >
          <slot
            v-if="title || $slots.header"
            name="header"
          >
            <h6 class="m-0 p-0">
              {{ title }}
            </h6>
          </slot>
        </div>
        <div
          ref="body"
          class="popover-body"
        >
          <slot>{{ content }}</slot>
        </div>
      </div>
    </tran-drop>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import tranDrop from "@/components/transition/tran-drop.vue"

export default {
  name: "BPopover",
  components: { tranDrop, },
  mixins: [ util.mixins.popper.base, ],
  props: {
    title: util.props.String,
    content: util.props.String,
    set: {
      type: String,
      default: "right",
      validator: value => [
        'top', 'top-start', 'top-end',
        'bottom', 'bottom-start', 'bottom-end',
        'right', 'right-start', 'right-end',
        'left', 'left-start', 'left-end',
      ].includes(value),
    },
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    objClass: function() {
      let c = "";
      if (this.show) c += " show ";
      return c;
    }
  },

  mounted() {
    this.init()
  },
  methods: {
    init: function() {
      this.popOpts = {
        placement: this.set,
        strategy: 'fixed',
        modifiers: [
          { name: 'arrow', options: { element: this.$refs.arrow, padding: 6, }, },
          { name: 'offset', options: { offset: [0, 8], }, },
        ],
      }
      this.popRef = this.$refs.popRef
      this.popEle = this.$refs.popover
    },
  },
};
</script>


<style scoped>
.popover > .popover-arrow {
  position: absolute;
  display: block;
  width: 1rem;
  height: 0.5rem;
  margin: 0 0.3rem;
}

.popover .popover-arrow::before, .popover .popover-arrow::after {
  position: absolute;
  display: block;
  content: "";
  border-color: transparent;
  border-style: solid;
}

/* top */
.popover[data-popper-placement^='top'] {
  margin-bottom: 0.5rem;
}

.popover[data-popper-placement^='top'] > .popover-arrow {
  bottom: calc(-0.5rem - 1px);
}

.popover[data-popper-placement^='top'] > .popover-arrow::before {
  bottom: 0;
  border-width: 0.5rem 0.5rem 0;
  border-top-color: rgba(0, 0, 0, 0.25);
}

.popover[data-popper-placement^='top'] > .popover-arrow::after {
  bottom: 1px;
  border-width: 0.5rem 0.5rem 0;
  border-top-color: var(--white);
}

/* bottom */
.popover[data-popper-placement^='bottom'] {
  margin-top: 0.5rem;
}

.popover[data-popper-placement^='bottom'] > .popover-arrow {
  top: calc(-0.5rem - 1px);
}

.popover[data-popper-placement^='bottom'] > .popover-arrow::before {
  top: 0;
  border-width: 0 0.5rem 0.5rem 0.5rem;
  border-bottom-color: rgba(0, 0, 0, 0.25);
}

.popover[data-popper-placement^='bottom'] > .popover-arrow::after {
  top: 1px;
  border-width: 0 0.5rem 0.5rem 0.5rem;
  border-bottom-color: var(--white);
}

/* .popover[data-popper-placement='top-start'] > .popover-arrow,
.popover[data-popper-placement='bottom-start'] > .popover-arrow,
.popover[data-popper-placement='top-start'] > .popover-arrow::before,
.popover[data-popper-placement='bottom-start'] > .popover-arrow::before,
.popover[data-popper-placement='top-start'] > .popover-arrow::after,
.popover[data-popper-placement='bottom-start'] > .popover-arrow::after  {
  left: -3rem;
}

.popover[data-popper-placement='top-end'] > .popover-arrow,
.popover[data-popper-placement='bottom-end'] > .popover-arrow,
.popover[data-popper-placement='top-end'] > .popover-arrow::before,
.popover[data-popper-placement='bottom-end'] > .popover-arrow::before,
.popover[data-popper-placement='top-end'] > .popover-arrow::after,
.popover[data-popper-placement='bottom-end'] > .popover-arrow::after  {
  right: -2rem;
} */

/* left */
.popover[data-popper-placement^='left'] {
  margin-right: 0.5rem;
}

.popover[data-popper-placement^='left'] > .popover-arrow {
  right: calc(-0.5rem - 1px);
  width: 0.5rem;
  height: 1rem;
  margin: 0.3rem 0;
}

.popover[data-popper-placement^='left'] > .popover-arrow::before {
  right: 0;
  border-width: 0.5rem 0 0.5rem 0.5rem;
  border-left-color: rgba(0, 0, 0, 0.25);
}

.popover[data-popper-placement^='left'] > .popover-arrow::after {
  right: 1px;
  border-width: 0.5rem 0 0.5rem 0.5rem;
  border-left-color: var(--white);
}

/* right */
.popover[data-popper-placement^='right'] {
  margin-left: 0.5rem;
}

.popover[data-popper-placement^='right'] > .popover-arrow {
  left: calc(-0.5rem - 1px);
  width: 0.5rem;
  height: 1rem;
  margin: 0.3rem 0;
}

.popover[data-popper-placement^='right'] > .popover-arrow::before {
  left: 0;
  border-width: 0.5rem 0.5rem 0.5rem 0;
  border-right-color: rgba(0, 0, 0, 0.25);
}

.popover[data-popper-placement^='right'] > .popover-arrow::after {
  left: 1px;
  border-width: 0.5rem 0.5rem 0.5rem 0;
  border-right-color: var(--white);
}

/* .popover[data-popper-placement='left-start'] > .popover-arrow,
.popover[data-popper-placement='right-start'] > .popover-arrow,
.popover[data-popper-placement='left-start'] > .popover-arrow::before,
.popover[data-popper-placement='right-start'] > .popover-arrow::before,
.popover[data-popper-placement='left-start'] > .popover-arrow::after,
.popover[data-popper-placement='right-start'] > .popover-arrow::after  {
  top: -0.5rem;
}

.popover[data-popper-placement='left-end'] > .popover-arrow,
.popover[data-popper-placement='right-end'] > .popover-arrow,
.popover[data-popper-placement='left-end'] > .popover-arrow::before,
.popover[data-popper-placement='right-end'] > .popover-arrow::before,
.popover[data-popper-placement='left-end'] > .popover-arrow::after,
.popover[data-popper-placement='right-end'] > .popover-arrow::after  {
  bottom: -0.5rem;
} */
</style>
