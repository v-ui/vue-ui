<template>
  <b-popover
    for="Properties"
    set="bottom"
    title="Sort plus"
    icon="arrow-down-up"
    style="min-width: 400px"
  >
    <b-list
      :list="head"
      drop
    />
  </b-popover>
</template>

<script>
import util from "@/components/util/index.js";

import BList from "@/components/base/List/b-list.vue"
import BPopover from '@/components/base/Popover/b-popover.vue'

export default {
  name: 'GridProperties',
  components: { BList, BPopover },
  props: {
    head: util.props.Array,
  },
}
</script>
