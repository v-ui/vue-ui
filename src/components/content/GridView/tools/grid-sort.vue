<template>
  <b-modal
    title="Sort Plus"
    :icon="icon.sort"
  >
    <template>
      <b-data-sort hide-header primary-key="field" display-name="title" :list="list" />
    </template>
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
      >
        Sort
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import util from "@/components/util/index.js";
import config from "@/config/index.js";

import BModal from "@/components/base/Modal/b-modal.vue";

import BButton from "@/components/basic/Button/basic-button.vue";
import BDataSort from '@/components/content/Data/b-data-sort.vue'

export default {
  name: 'GridSort',
  components: { BModal, BButton, BDataSort, },
  props: {
    list: util.props.Array,
  },
  computed: {
    icon: function() {
      return config.ui.icon;
    },
  },
}
</script>
