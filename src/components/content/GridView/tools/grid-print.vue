<template>
  <b-button
    v-tip="'Print'"
    color="secondary"
    size="sm"

    @click="print(opts)"
  >
    <basic-icon icon="printer" />
  </b-button>
</template>

<script>
import config from "@/config/index.js";
import util from "@/components/util/index.js";

import BasicIcon from "@/components/basic/basic-icon.vue"
import BButton from "@/components/basic/Button/basic-button.vue";
export default {
  name: 'GridPrint',
  components: { BasicIcon, BButton, },
  mixins: [ util.mixins.print.print, ],
  props: {
    data: util.props.Array,
    title: util.props.String,
    columns: util.props.Array,
  },
  computed: {
    icon: function() {
      return config.ui.icon;
    },
    opts: function() {
      return {
        type: "json",
        printable: this.data,
        repeatTableHeader: true,
        properties: this.columns.map(e => ({
          field: e.field,
          displayName: e.label || ''
        })),
        header: this.title
          ? `
            <div class="d-block w-100">
              <h3 class="text-center">${this.title}</h3>
            </div>
          `
          : null
      }
    },
  },
}
</script>
