<template>
  <th
    v-if="!hideSelect"
    class="d-print-none align-middle"
    data-type="select"
  >
    <b-checkbox
      v-model="isSelected"
      class="text-center"
    />
  </th>
</template>

<script>
import util from "@/components/util/index.js";

import BCheckbox from "@/components/form/CheckBox/b-checkbox.vue";

export default {
  name: "TableSelectTd",
  components: { BCheckbox },
  model: {
    prop: "selected",
    event: "tr:selected"
  },
  props: {
    selected: util.props.Boolean,
    hideSelect: util.props.Boolean,
  },
  data() {
    return {
      isSelected: this.selected
    };
  },
  watch: {
    selected: function(value) {
      this.isSelected = value;
    },
    isSelected: function(value) {
      this.$emit("tr:selected", value);
    }
  }
};
</script>
