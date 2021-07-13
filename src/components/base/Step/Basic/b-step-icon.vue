<template>
  <basic-icon
    v-if="size === 'sm'"
    icon="circle-fill"
    :icon-color="color"
    class="align-self-center m-2"
    style="font-size: .8em;"
  />
  <basic-icon
    v-else
    :icon="icon"
    :icon-color="color"
    class="align-self-center m-2"
    :style="`font-size: ${iconSize}px;`"
  />
</template>

<script>
import util from "@/components/util/index.js";

import BasicIcon from "@/components/basic/basic-icon.vue"

export default {
  name: 'BStepIcon',
  components: { BasicIcon, },
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
