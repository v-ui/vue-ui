<template>
  <div class="d-block d-print-none text-center h-100 align-items-center justify-content-center">
    <template v-if="hideData">
      <p class="display-4">
        No Related Data
      </p>
      <small class="text-secondary">
        <i
          class="text-primary px-1"
          :class="icon.info"
        />No related data found or Data format error
      </small>
    </template>
    <template v-else-if="loading">
      <b-loading color="primary" />
      <p class="display-4">
        Loading...
      </p>
    </template>
  </div>
</template>

<script>
import config from "@/config/index.js";
import util from "@/components/util/index.js";

import BLoading from "@/components/base/Loading/b-loading.vue";

export default {
  name: 'grid-helper',
  components: { BLoading, },
  props: {
    hideData: util.props.Boolean,
    loading: util.props.Boolean,
  },
  computed: {
    icon: function() {
      return config.ui.icon;
    },
  },
}
</script>
