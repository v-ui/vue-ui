<template>
  <span>
    <font class="d-flex align-items-center">
      <b-icon
        class="pe-1"
        :icon="icon"
        :icon-color="iconColor"
      />
      <span
        class="d-inline-block text-truncate"
        :class="labelColor ? 'text-' + labelColor : ''"
      >{{ label }}</span>
    </font>
    <b-info
      :info="info"
      :info-color="infoColor"
    />
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
    labelColor: util.props.textColor,
    infoColor: util.props.textColor,
    iconColor: util.props.textColor,
  },
}
</script>
