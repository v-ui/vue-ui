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

import dropdownList from "@/components/base/Bootstrap/DropdownList/b-dropdown-list.vue";

export default {
  name: "BMonthList",
  components: { dropdownList },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: util.props.UInt,
      default: () => new Date().getMonth() + 1,
      validator: value => util.props.UInt.validator(value) && value < 13
    },
    start: {
      ...util.props.UInt,
      validator: value => util.props.UInt.validator(value) && value < 13
    },
    end: {
      ...util.props.UInt,
      validator: value => util.props.UInt.validator(value) && value < 13
    }
  },
  data() {
    return {
      selectValue: this.value
    };
  },
  computed: {
    list: function() {
      let list = [];
      for (let n = 0; n < 12; n++) {
        let month = n + 1;
        list.push(
          month < this.start || month > this.end
            ? { text: month, value: month, disabled: true }
            : { text: month, value: month }
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
