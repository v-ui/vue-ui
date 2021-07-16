<template>
  <div
    class="d-inline-flex m-2"
    :class="ObjClass"
  >
    <b-step-icon
      :size="size"
      :color="dataColor"
      :icon="dataIcon"
    />
    <slot
      name="item"
      :color="dataColor"
      :title="dataTitle"
      :select="select"
      :info="info"
    >
      <b-step-content
        :color="dataColor"
        :title="dataTitle"
        :select="select"
        :info="info"
      />
    </slot>
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
    select: util.props.boolean,
    info: util.props.string,
    size: util.props.size,
    set: {
      ...util.props.set,
      default: 'end'
    },
  },
  computed: {
    ObjClass: function() {
      let set = ''
      if (!this.set || this.set === 'end') return set
      else if (this.set === 'down') {
        set = 'flex-column text-center'
      } else if (this.set === 'start') {
        set = 'flex-row-reverse text-end'
      } else if (this.set === 'up') {
        set = 'flex-column-reverse text-center'
      }
      return set
    },
  },
}
</script>
