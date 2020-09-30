<template>
  <dropdown-list
    v-model="selectValue"
    :list="list"
    hide-null
    @change="change"
  />
</template>
<script>
import util from "@/components/util/index.js"

import dropdownList from "@/components/base/DropdownList/b-dropdown-list.vue";

export default {
  name: "BYearList",
  components: { dropdownList },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      ...util.props.UInt,
      default: () => new Date().getFullYear(),
    },
    start: util.props.UInt,
    end: util.props.UInt,
  },
  data() {
    return {
      selectValue: this.value
    };
  },
  computed: {
    list: function() {
      let year = new Date().getFullYear() - 50;
      let list = [];
      for (let n = 0; n < 100; n++) {
        year++;
        list.push(
          year < this.start || year > this.end
            ? { text: year, value: year, disabled: true }
            : { text: year, value: year }
        );
      }
      return list;
    }
  },
  methods: {
    change: function() {
      // 配合 v-model
      this.$emit("change", this.selectValue);
    }
  }
};
</script>
