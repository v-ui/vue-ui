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
  name: "BMinutesList",
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
