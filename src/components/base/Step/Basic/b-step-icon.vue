<template>
  <i v-if="size !== 'sm'" :class="icon" class="align-self-center m-2" :style="`font-size: ${iconSize}px;`" />
  <b-badge v-else :color="color" class="align-self-center m-2" />
</template>

<script>
import util from "@/components/util/index.js";

import BBadge from '@/components/base/Badge/b-badge.vue'

export default {
  name: 'b-step-icon',
  components: { BBadge, },
  mixins: [ util.mixins.size.strong, ],
  props: {
    icon: util.props.string,
    color: util.props.color,
  },
  computed: {
    iconSize: function() {
      return this.strong * 3
    },
  },
}
</script>
