<template>
  <div>
    <tree-item
      v-for="(item, index) in list"
      :key="index"
      :item="item"
      :status="statusNu"
      :selected="selected"
      :primary-key="primaryKey"
      @item:selected="itemSelected"
    />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "c-tree",
  components: { TreeItem: () => import("./c-tree-item") },
  model: {
    prop: "selected",
    event: "tree:selected"
  },
  props: {
    list: util.props.Array,
    status: {
      type: [String, Number],
      default: 0,
      validator: value => !isNaN(value) && [0, 1, 2, 3].includes(Number(value)),
      // 0: default,1: edit,2: Single choice, 3: Multiple choice
    },
    primaryKey: {
      type: String,
      default: "id",
      require: true
    },
    selected: util.props.Object
  },
  data() {
    return {
      selectedOption: this.selected
    };
  },
  computed: {
    statusNu: function() {
      return Number(this.status) || 0;
    }
  },
  methods: {
    itemSelected: function(item) {
      this.selectedOption = item;
    }
  },
  watch: {
    selected: function(value) {
      this.selectedOption = value;
    },
    selectedOption: function(value) {
      this.$emit("tree:selected", value);
    }
  }
};
</script>
