<template>
  <th
    v-if="!hideSelect"
    class="d-print-none align-middle"
    data-type="select"
  >
    <b-checkbox
      v-model="isChecked"
      class="text-center"
    />
  </th>
</template>

<script>
import util from "@/components/util/index.js";

import BCheckbox from "@/components/base/Bootstrap/Form/CheckBox/b-checkbox.vue";

export default {
  name: "TableSelectTd",
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
