<template>
  <div>
    <font class="d-flex align-items-center">
      <b-icon
        class="me-2"
        :icon="icon"
        :color="iconColor"
      />
      <strong
        v-if="strong"
        class="text-truncate"
        :class="labelColor ? 'text-' + labelColor : ''"
      >
        {{ label }}
      </strong>
      <span
        v-else
        class="text-truncate"
        :class="labelColor ? 'text-' + labelColor : ''"
      >{{ label }}</span>
    </font>
    <b-info
      :info="info"
      :color="infoColor"
    />
  </div>
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
    strong: util.props.boolean,
    labelColor: util.props.textColor,
    iconColor: util.props.textColor,
    infoColor: util.props.textColor,
  },
}
</script>
