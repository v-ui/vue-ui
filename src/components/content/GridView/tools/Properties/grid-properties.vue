<template>
  <b-popover
    for="Properties"
    set="bottom"
    title="Properties"
    icon="card-checklist"
    style="min-width: 400px;"
  >
    <grid-properties-list class="d-block" style="max-height: 500px;" :list="head" />
  </b-popover>
</template>

<script>
import util from "@/components/util/index.js";

import GridPropertiesList from "./grid-properties-list"
import BPopover from '@/components/base/Popover/b-popover.vue'
export default {
  name: 'GridProperties',
  components: { GridPropertiesList, BPopover },
  props: {
    head: util.props.Array,
  },
}
</script>
