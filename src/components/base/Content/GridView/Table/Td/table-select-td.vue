<template>
  <th v-if="!hideSelect" class="d-print-none align-middle" data-type="select">
    <b-checkbox class="text-center" v-model="isChecked" />
  </th>
</template>

<script>
import util from "@/components/util/index.js";

import BCheckbox from "@/components/base/Bootstrap/Form/CheckBox/b-checkbox.vue";

export default {
  name: "table-select-td",
  components: { BCheckbox },
  model: {
    prop: "checked",
    event: "tr:checked"
  },
  props: {
    checked: util.props.Boolean,
    hideSelect: util.props.Boolean,
  },
  data() {
    return {
      isChecked: this.checked
    };
  },
  watch: {
    checked: function(value) {
      this.isChecked = value;
    },
    isChecked: function(value) {
      this.$emit("tr:checked", value);
    }
  }
};
</script>
