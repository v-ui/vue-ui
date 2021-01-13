<template>
  <span>
    <b-icon :icon="icon" :icon-color="iconColor" />
    <span class="d-inline-block pl-1 text-truncate" :class="textColor ? 'text-' + textColor : ''">{{ label }}</span>
    <b-info :info="info" :info-color="infoColor" />
  </span>
</template>

<script>
import util from "@/components/util/index.js";

import BIcon from '@/components/basic/basic-icon.vue'
import BInfo from '@/components/basic/basic-info.vue'

export default {
  name: 'BasicLabel',
  components: { BIcon, BInfo },
  props: {
    label: util.props.String,
    icon: util.props.String,
    info: util.props.String,
    textColor: util.props.textColor,
    infoColor: util.props.textColor,
    iconColor: util.props.textColor,
  },
}
</script>
