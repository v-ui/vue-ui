<template>
  <b-data-temp :hideHeader="hideHeader" :hideInfo="hideInfo">
      <template #header>
        <b-label icon="arrow-down-up" label="Sort" info="Data sort panel" />
      </template>
      <template #info> Add a sort rule </template>
      <template>
        <span v-for="(item, index) in dataList" :key="index" class="d-flex justify-content-between align-items-center">
          <div class="d-flex row w-100 align-items-center">
            <b-dropdown-list class="col-6 my-1" :list="list" hide-null :primary-key="primaryKey" :display-name="displayName" v-model="item.value" />
            <b-dropdown-list class="col-6 my-1" :list="sort" hide-null v-model="item.data" />
          </div>
          <b-button v-tip="'Delete'" class="p-0" color="link" @click="del(index)">
            <b-icon icon="x" />
          </b-button>
        </span>
      </template>
      <template #footer>
        <b-button class="p-0" color="link" @click="add">
          <b-icon icon="plus" />
          Add a new sort rule
        </b-button>
        <b-button :disabled="disabledTrash" class="ml-auto" color="link" @click="clear">
          <b-icon icon="trash" />
          Clear Sort
        </b-button>
      </template>
  </b-data-temp>
</template>

<script>
import util from "@/components/util/index.js";

import BDataTemp from './Basic/basic-data-temp'

import BIcon from '@/components/basic/basic-icon.vue'
import BLabel from '@/components/basic/basic-label.vue'
import BButton from '@/components/basic/Button/basic-button.vue'
import BDropdownList from '@/components/base/DropdownList/b-dropdown-list.vue'

export default {
  name: 'BDataSort',
  components: { BDataTemp, BIcon, BLabel, BButton, BDropdownList, },
  mixins: [ util.mixins.data.base ],
  props: {
    primaryKey: {
      ...util.props.String,
      default: 'value',
    },
    displayName: {
      ...util.props.String,
      default: 'label',
    },
  },
  data() {
    return {
      sort: [
        { value: 'Ascending', icon: 'arrow-up-circle', },
        { value: 'Descending', icon: 'arrow-down-circle', },
      ],
      defaultData: 'Ascending',
    }
  },
}
</script>
