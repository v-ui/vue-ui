<template>
  <b-dropdown-menu
    v-model="selectedValue"
    :list="list"
    hide-null
  />
</template>

<script>
import util from "@/components/util/index.js";
import BDropdownMenu from '@/components/base/Dropdown/b-dropdown-menu.vue'
export default {
  name: 'DateTimeList',
  components: { BDropdownMenu, },
  mixins: [
    util.mixins.date.time,
    util.mixins.select.select,
  ],
}
</script>
