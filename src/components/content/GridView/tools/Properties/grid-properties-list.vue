<template>
  <b-list :list="list" class=" overflow-auto" borderLess drop hideHanlder>
    <template #item="{ item }">
      <grid-properties-item :item="item" />
    </template>
  </b-list>
</template>

<script>
import util from "@/components/util/index.js";

import BList from "@/components/base/List/b-list.vue"
import GridPropertiesItem from './grid-properties-item.vue'
export default {
  name: 'GridPropertiesList',
  components: { GridPropertiesItem, BList, },
  props: {
    list: util.props.Array,
  },
}
</script>
