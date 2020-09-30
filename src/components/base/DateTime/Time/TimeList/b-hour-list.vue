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
  name: "BHourList",
  components: { dropdownList },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      ...util.props.UInt,
      default: () => new Date().getHours(),
      validator: value => util.props.UInt.validator(value) && value < 23
    },
    start: {
      type: util.props.UInt,
      validator: value => util.props.UInt.validator(value) && value < 23
    },
    end: {
      type: util.props.UInt,
      validator: value => !isNaN(value) && value > 0 && value < 23
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
      for (let n = 0; n < 23; n++) {
        let hour = n + 1;
        list.push(
          hour < this.start || hour > this.end
            ? { text: hour, value: hour, disabled: true }
            : { text: hour, value: hour }
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
