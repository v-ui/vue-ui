<template>
  <b-data-temp
    :hide-header="hideHeader"
    :hide-info="hideInfo"
  >
    <template #header>
      <b-label
        icon="arrow-down-up"
        label="Sort"
        info="Data sort panel"
      />
    </template>
    <template #info>
      Add a sort rule
    </template>
    <template>
      <span
        v-for="(item, index) in dataList"
        :key="index"
        class="d-flex justify-content-between align-items-center"
      >
        <div class="d-flex row w-100 align-items-center">
          <b-dropdown-list
            v-model="item.value"
            class="col-6 my-1"
            :list="column"
            hide-null
            :primary-key="primaryKey"
            :display-name="displayName"
          />
          <b-dropdown-list
            v-model="item.data"
            class="col-6 my-1"
            :list="sort"
            hide-null
          />
        </div>
        <b-button
          v-tip="'Delete'"
          class="p-0"
          color="link"
          @click="del(index)"
        >
          <b-icon icon="x" />
        </b-button>
      </span>
    </template>
    <template #footer>
      <b-button
        class="p-0"
        color="link"
        @click="add"
      >
        <b-icon icon="plus" />
        Add a new sort rule
      </b-button>
      <b-button
        :disabled="disabledTrash"
        class="ms-auto"
        color="link"
        @click="clear"
      >
        <b-icon icon="trash" />
        Clear sort
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
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' },
      ],
      defaultData: 'asc',
    }
  },
}
</script>
