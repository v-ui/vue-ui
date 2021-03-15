<template>
  <div class="p-2">
    <header v-if="hideHeader">
      <b-label icon="arrow-down-up" label="Sort" info="Data sort panel" />
      <hr class="my-1" />
    </header>
    <div v-if="!dataList || dataList.length === 0">Add a sort rule</div>
    <div v-else>
      <span v-for="(item, index) in dataList" :key="index" class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <b-dropdown-list class="m-1" :list="list" hide-null :primary-key="primaryKey" v-model="item.value" />
          <b-dropdown-list class="m-1" :list="sort" hide-null v-model="item.data" />
        </div>
        <b-button class="p-0" color="link" @click="del(index)">
          <b-icon icon="x" />
        </b-button>
      </span>
    </div>
    <b-button class="p-0" color="link" @click="add">
      <b-icon icon="plus" />
      Add a new sort rule
    </b-button>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BIcon from '@/components/basic/basic-icon.vue'
import BLabel from '@/components/basic/basic-label.vue'
import BButton from '@/components/basic/Button/basic-button.vue'
import BDropdownList from '@/components/base/DropdownList/b-dropdown-list.vue'

export default {
  name: 'BDataSort',
  components: { BIcon, BLabel, BButton, BDropdownList, },
  mixins: [ util.mixins.data.base ],
  props: {
    primaryKey: props.String,
  },
  data() {
    return {
      sort: [
        { value: 'Ascending', icon: 'arrow-up-circle', },
        { value: 'Descending', icon: 'arrow-down-circle', },
      ],
      defaultdData: 'Ascending',
    }
  },
}
</script>
