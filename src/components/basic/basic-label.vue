<template>
  <span>
    <basic-icon :icon="icon" />
    <span class="d-inline-block pl-1 text-truncate">{{ label }}</span>
    <basic-info :info="info" />
  </span>
</template>

<script>
import util from "@/components/util/index.js";

import BasicIcon from '@/components/basic/basic-icon.vue'
import BasicInfo from '@/components/basic/basic-info.vue'

export default {
  name: 'BasicLabel',
  components: { BasicIcon, BasicInfo },
  props: {
    label: util.props.String,
    icon: util.props.String,
    info: util.props.String
  },
}
</script>
