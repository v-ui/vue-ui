<template>
  <b-dropdown
      :list="list"
      hide-toggle
      menu-align="right"
      @item:click="dataExport"
    >
      <template #trigger>
        <b-button
          v-tip="'Export'"
          color="secondary"
          size="sm"
        >
          <basic-icon icon="file-earmark" />
          <basic-icon icon="caret-down-fill" class="pl-1" />
        </b-button>
      </template>
    </b-dropdown>
</template>

<script>
import tools from "@/tools/index.js";
import config from "@/config/index.js";
import util from "@/components/util/index.js";

import BasicIcon from "@/components/basic/basic-icon.vue"
import BButton from "@/components/basic/Button/basic-button.vue";
import BDropdown from "@/components/base/Dropdown/b-dropdown.vue";

export default {
  name: 'GridExport',
  components: { BasicIcon, BButton, BDropdown, },
  props: {
    data: util.props.Array,
  },
  data() {
    return {
      list: [
        { value: "XML", type: "xml" },
        { value: "CSV", type: "csv" },
        { value: "TXT", type: "txt" },
        // { value: 'SQL', type: 'sql', },
        // { value: 'PDF', type: 'pdf', },
        { value: "JSON", type: "json" }
        // { value: 'MS-EXCEL', type: 'ms-excel', },
      ],
    }
  },
  computed: {
    icon: function() {
      return config.ui.icon;
    },
  },
  methods: {
    dataExport: function(item) {
      if (!item || !item.type) return;
      switch (item.type) {
        case "xml":
          tools.file.xml.writer(this.data);
          break;
        case "csv":
          tools.file.csv.writer(this.data);
          break;
        case "txt":
          tools.file.txt.writer(this.data);
          break;
        // case 'sql':

        //     break;
        // case 'pdf':

        //     break;
        case "json":
          tools.file.json.writer(this.data);
          break;
        case "ms-excel":
          tools.file.excel.writer(this.data);
          break;
        default:
          break;
      }
      return false;
    },
  },
}
</script>
