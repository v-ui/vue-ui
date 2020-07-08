<template>
  <dropdown-list v-model="selectValue" :list="list" @change="change" hide-null />
</template>

<script>
import dropdownList from "@/components/base/Bootstrap/DropdownList/b-dropdown-list.vue";

export default {
  name: "b-quarter-list",
  components: { dropdownList },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: Number,
      default: function() {
        let month = new Date().getMonth();
        return [0, 1, 2].includes(month)
          ? 1
          : [3, 4, 5].includes(month)
          ? 2
          : [6, 7, 8].includes(month)
          ? 3
          : 4;
      },
      validator: value => !isNaN(value) && value > 0 && value < 5
    },
    start: {
      type: Number,
      validator: value => !isNaN(value) && value > 0 && value < 5,
    },
    end: {
      type: Number,
      validator: value => !isNaN(value) && value > 0 && value < 5,
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
      for (let n = 1; n < 5; n++) {
        list.push(
          n < this.start || n > this.end
            ? { text: `第 ${n} 季度`, value: n, disabled: true }
            : { text: `第 ${n} 季度`, value: n }
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
