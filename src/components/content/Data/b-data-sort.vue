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
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="d-flex justify-content-between align-items-center"
      >
        <div class="d-flex row w-100 align-items-center mx-1">
          <b-dropdown-list
            v-model="item.value"
            class="col m-1"
            :primary-key="primaryKey"
            :display-name="displayName"
            :list="column"
            hide-null
          />
          <b-dropdown-list
            v-model="item.data"
            class="col m-1"
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
      </div>
    </template>
    <template #footer>
      <b-button
        class="p-0"
        color="link"
        @click="add"
      >
        <div class="row">
          <b-icon icon="plus" class="col pe-0" />
          <font class="col-auto ps-0">Add a new sort rule</font>
        </div>
      </b-button>
      <b-button
        :disabled="disabledTrash"
        class="ms-auto"
        color="link"
        @click="clear"
      >
        <div class="row">
        <b-icon icon="trash" class="col pe-0" />
        <font class="col-auto ps-0">Clear sort</font>
        </div>
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
