<template>
  <dropdown-list v-model="selectValue" :list="list" @change="change" hide-null />
</template>

<script>
import util from "@/components/util/index.js"

import dropdownList from "@/components/base/Bootstrap/DropdownList/b-dropdown-list.vue";

export default {
  name: "b-minutes-list",
  components: { dropdownList },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: util.props.UInt,
      default: () => new Date().getMinutes(),
      validator: value => util.props.UInt.validator(value) && value < 60
    },
    start: {
      type: util.props.UInt,
      validator: value => util.props.UInt.validator(value) && value < 60
    },
    end: {
      type: util.props.UInt,
      validator: value => util.props.UInt.validator(value) && value < 60
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
      for (let n = 0; n < 60; n++) {
        let minutes = n;
        list.push(
          minutes < this.start || minutes > this.end
            ? { text: minutes, value: minutes, disabled: true }
            : { text: minutes, value: minutes }
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
