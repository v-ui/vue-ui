<template>
  <tran-drop>
    <div
      ref="tooltip"
      class="tooltip fade"
      :class="objClass"
      role="tooltip"
      style="position: absolute; will-change: transform;"
    >
      <div
        ref="arrow"
        class="tooltip-arrow"
      />
      <div
        ref="body"
        class="tooltip-inner"
      >
        <slot>{{ content }}</slot>
      </div>
    </div>
  </tran-drop>
</template>

<script>
import tools from '@/tools'
import util from "@/components/util/index.js";

import tranDrop from "@/components/transition/tran-drop.vue"

export default {
  name: "BTooltip",
  components: { tranDrop, },
  mixins: [ util.mixins.popper.base, ],
  props: {
    for: {
      ...util.props.String,
      require: true,
    },
    set: util.props.popperSet,
    content: util.props.String,
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
  watch: {
    for: function() {
      this.init()
    },
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
      this.popRef = document.getElementById(this.for)
      if (this.for && this.popRef) {
        tools.dom.addAttr(this.popRef, 'aria-describedby', 'tooltip')
        this.popRef.onmouseover = () => this.show = true
        this.popRef.onmouseleave = () => this.show = false
      }
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
  border-top-color: rgb(0, 0, 0);
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
  border-right-color: rgb(0, 0, 0);
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
  border-bottom-color: rgb(0, 0, 0);
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
  border-left-color: rgb(0, 0, 0);
}
</style>
