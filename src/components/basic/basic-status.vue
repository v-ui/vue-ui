<template>
  <basic-label
    :label="dataTitle"
    :icon="dataIcon"
    :info="info"
    :label-color="labelColor"
    :icon-color="dataColor"
    :info-color="infoColor"
  />
</template>

<script>
import util from '@/components/util/index.js'

import BasicLabel from '@/components/basic/basic-label.vue'
export default {
  name: 'BasicStatus',
  mixins: [ util.mixins.status.message, ],
  components: { BasicLabel },
  props: {
    info: util.props.String,
    labelColor: util.props.textColor,
    infoColor: util.props.textColor,
  },
}
</script>
