<template>
  <div class="d-flex align-items-start flex-column w-100">
    <div class="d-flex align-items-between w-100">
      <div class="d-flex align-items-start w-100">
        <base-icon v-coll:control="'#PropertiesCollapse'+item.field" v-if="item.children" class="pe-2" icon="chevron-down" />
        <base-label :label="item.label" :icon="item.icon" />
      </div>
      <b-switch class="mx-2" checked />
      <base-icon class="ms-auto h5 handle" icon="list" style="cursor: move" />
    </div>
    <b-collapse :id="'PropertiesCollapse'+item.field" class="border-0 w-100">
      <grid-properties-list :list="item.children" class="border-0" />
    </b-collapse>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BSwitch from "@/components/form/b-switch.vue"
import BaseIcon from '@/components/basic/basic-icon.vue'
import BaseLabel from "@/components/basic/basic-label.vue"
import BCollapse from "@/components/base/Collapse/b-collapse.vue"
export default {
  name: 'GridPropertiesItem',
  components: { GridPropertiesList: async () => await import('./grid-properties-list.vue'), BSwitch, BaseIcon, BaseLabel, BCollapse },
  props: {
    item: util.props.Object,
  },
}
</script>
