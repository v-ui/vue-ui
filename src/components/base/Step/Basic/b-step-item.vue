<template>
  <div class="d-inline-flex m-2" :class="ObjClass" style="width: 15em;">
    <i :class="iconClass" class="align-self-center m-2" :style="`font-size: ${iconSize}px;`" />
    <div class="align-self-center">
      <b-badge v-if="active" :color="dataColor">{{ dataTitle }}</b-badge>
      <font v-else class="d-block text-wrap w-100 text-truncate" :class="fontClass" style="max-height: 3em">{{ dataTitle }}</font>
      <b-info class="d-block text-wrap w-100 text-truncate" style="max-height: 3em" :info="info" />
    </div>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BBadge from '@/components/base/Badge/b-badge.vue'
import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: 'b-step-item',
  components: { BBadge, BInfo, },
  mixins: [ util.mixins.status.method, util.mixins.size.strong, ],
  props: {
    active: util.props.boolean,
    info: util.props.string,
    set: {
      ...util.props.set,
      default: 'rihgt'
    },
  },
  computed: {
    iconSize: function() {
      return this.strong * 3
    },
    fontClass: function() {
      return `text-${this.dataColor}`
    },
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
