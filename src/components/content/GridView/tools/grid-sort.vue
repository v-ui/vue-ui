<template>
  <b-popover
    for="SortPopover"
    set="bottom-start"
    title="Sort Plus"
    icon="arrow-down-up"
    style="min-width: 400px"
  >
    <b-data-sort
      v-model="dataSort"
      :column="column"
      hide-header
      primary-key="field"
    />
    <template #footer>
      <b-button
        color="secondary"
        data-dismiss="modal"
      >
        Close
      </b-button>
      <b-button
        color="primary"
        data-dismiss="modal"
        @click.native="done"
      >
        Done
      </b-button>
    </template>
  </b-popover>
</template>

<script>
import util from "@/components/util/index.js";
import config from "@/config/index.js";

import BModal from "@/components/base/Modal/b-modal.vue";

import BButton from "@/components/basic/Button/basic-button.vue";
import BDataSort from '@/components/content/Data/b-data-sort.vue'
import BPopover from '@/components/base/Popover/b-popover.vue'

export default {
  name: 'GridSort',
  components: { BModal, BButton, BDataSort, BPopover },
  model: {
    prop: 'sort',
    event: 'sort:changed'
  },
  props: {
    sort: util.props.Array,
    column: util.props.Array,
  },
  data() {
    return {
      dataSort: this.sort,
    }
  },
  computed: {
    icon: function() {
      return config.ui.icon;
    },
  },
  watch: {
    sort: {
      handler: function(value) {
        this.dataSort = value
      },
      deep: true,
    },
    dataSort: function(value) {
      // v-model
      this.$emit('sort:changed', value)
    },
  },
  methods: {
    done: function() {
      this.$emit('sort:done', this.dataSort)
    },
  },
}
</script>
