<template>
  <div class="align-self-center">
    <b-badge v-if="active" :color="color">{{ title }}</b-badge>
    <font v-else class="d-block text-wrap w-100 text-truncate" :class="fontClass" style="max-height: 3em">{{ title }}</font>
    <b-info class="d-block text-wrap w-100 text-truncate" style="max-height: 3em" :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BBadge from '@/components/base/Badge/b-badge.vue'
import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: 'BStepContent',
  components: { BBadge, BInfo, },
  props: {
    color: util.props.color,
    title: util.props.string,
    info: util.props.string,
    active: util.props.Boolean,
  },
  computed: {
    fontClass: function() {
      return `text-${this.color}`
    },
  },
}
</script>
