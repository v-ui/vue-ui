<template>
  <div class="d-inline-flex m-2" :class="ObjClass" style="width: 15em;">
    <b-step-icon :size="size" :color="dataColor" :icon="iconClass" />
    <b-step-content :color="dataColor" :title="dataTitle" :info="info" :active="active" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BStepIcon from './b-step-icon'
import BStepContent from './b-step-content';

export default {
  name: 'BStepItem',
  components: { BStepIcon, BStepContent, },
  mixins: [ util.mixins.status.message, ],
  props: {
    active: util.props.boolean,
    info: util.props.string,
    size: util.props.size,
    set: {
      ...util.props.set,
      default: 'rihgt'
    },
  },
  computed: {
    ObjClass: function() {
      let set = ''
      if (!this.set || this.set === 'right') return set
      else if (this.set === 'down') {
        set = 'flex-column text-center'
      } else if (this.set === 'left') {
        set = 'flex-row-reverse text-right'
      } else if (this.set === 'up') {
        set = 'flex-column-reverse text-center'
      }
      return set
    },
  },
}
</script>
