<template>
  <div>
    <div ref="popRef" class="d-inline-block" @mouseenter="show = true" @mouseout="show = false">
      <slot aria-describedby="tooltip" name="popRef" />
    </div>
    <tran-drop>
      <div
        ref="tooltip"
        class="tooltip fade"
        :class="objClass"
        role="tooltip"
        style="position: absolute; will-change: transform;"
      >
        <div ref="arrow" class="tooltip-arrow" data-popper-arrow />
        <div ref="body" class="tooltip-inner">
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
  name: "b-tooltip",
  components: { tranDrop, },
  mixins: [ util.mixins.popper.base, ],
  props: {
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
    content: util.props.String
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
          //{ name: 'offset', options: { offset: [3, 3], }, },
        ],
      }
      this.popRef = this.$refs.popRef
      this.popEle = this.$refs.tooltip
    },
  },
};
</script>

<style scoped>
.tooltip .tooltip-arrow {
  position: absolute;
  display: block;
  width: 0.8rem;
  height: 0.4rem;
}

.tooltip .tooltip-arrow::before {
  position: absolute;
  content: "";
  border-color: transparent;
  border-style: solid;
}

.tooltip[data-popper-placement^="top"] {
  padding: 0.4rem 0;
}

.tooltip[data-popper-placement^="top"] .tooltip-arrow,
.tooltip[data-popper-placement^="top"] .tooltip-arrow {
  bottom: 0;
}

.tooltip[data-popper-placement^="top"] .tooltip-arrow::before,
.tooltip[data-popper-placement^="top"] .tooltip-arrow::before {
  top: 0;
  border-width: 0.4rem 0.4rem 0;
  border-top-color: #000;
}

.tooltip[data-popper-placement^="right"] {
  padding: 0 0.4rem;
}

.tooltip[data-popper-placement^="right"] .tooltip-arrow {
  left: 0;
  width: 0.4rem;
  height: 0.8rem;
}

.tooltip[data-popper-placement^="right"] .tooltip-arrow::before {
  right: 0;
  border-width: 0.4rem 0.4rem 0.4rem 0;
  border-right-color: #000;
}

.tooltip[data-popper-placement^="bottom"] {
  padding: 0.4rem 0;
}

.tooltip[data-popper-placement^="bottom"] .tooltip-arrow {
  top: 0;
}

.tooltip[data-popper-placement^="bottom"] .tooltip-arrow::before {
  bottom: 0;
  border-width: 0 0.4rem 0.4rem;
  border-bottom-color: #000;
}

.tooltip[data-popper-placement^="left"] {
  padding: 0 0.4rem;
}

.tooltip[data-popper-placement^="left"] .tooltip-arrow {
  right: 0;
  width: 0.4rem;
  height: 0.8rem;
}

.tooltip[data-popper-placement^="left"] .tooltip-arrow::before {
  left: 0;
  border-width: 0.4rem 0 0.4rem 0.4rem;
  border-left-color: #000;
}
</style>
