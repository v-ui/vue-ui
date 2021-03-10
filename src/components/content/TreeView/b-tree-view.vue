<template>
  <div class="border rounded p-1">
    <div v-if="canEdit">
      <b-button-group>
        <b-button
          v-tip="'Add Item'"
          size="sm"
          outline
        >
          <i :class="icon.add" />
        </b-button>
        <b-button
          v-tip="'Add Folder'"
          size="sm"
          outline
        >
          <i :class="icon.folderPlus" />
        </b-button>
        <b-button
          v-if="hideClearCheck"
          v-tip="'Clear Check'"
          outline
          @click="clickClearCheck"
        >
          <i :class="icon.unCheck" />
        </b-button>
        <b-button
          v-if="hideDelete"
          v-tip="'Delete'"
          outline
        >
          <i :class="icon.delete" />
        </b-button>
      </b-button-group>
      <hr class="my-2">
    </div>
    <b-tree
      v-model="selectedOption"
      :list="list"
      :status="statusNu"
      :primary-key="primaryKey"
      :selected="selectedOption"
    />
  </div>
</template>

<script>
import config from "@/config/index.js";
import util from "@/components/util/index.js";

import BTree from "@/components/content/Tree/Tree/b-tree.vue";
import BButtonGroup from "@/components/base/ButtonGroup/b-button-group.vue";
import BButton from "@/components/basic/Button/basic-button.vue";

export default {
  name: "BTreeView",
  components: { BTree, BButtonGroup, BButton },
  model: {
    prop: "selected",
    event: "tree:selected"
  },
  props: {
    list: util.props.Array,
    primaryKey: {
      type: String,
      default: "id",
      require: true
    },
    status: {
      type: [String, Number],
      default: 0,
      validator: value => !isNaN(value) && [0, 1, 2, 3].includes(Number(value)),
      // 0: default,1: edit,2: Single choice, 3: Multiple choice
    },
    selected: util.props.Object,
  },
  data() {
    return {
      selectedOption: this.selected
    };
  },
  computed: {
    statusNu: function() {
      return Number(this.status) || 0;
    },
    icon: function() {
      return config.ui.icon;
    },
    canEdit: function() {
      return this.status == 1;
    },
    isSelected: function() {
      return (
        !this.selected ||
        Object.keys(this.selected).length == 0 ||
        Object.keys(this.selected).includes(this.primaryKey)
      );
    },
    hideDelete: function() {
      return !this.isSelected;
    },
    hideClearCheck: function() {
      return !this.isSelected;
    }
  },
  watch: {
    selected: function(value) {
      this.selectedOption = value;
    },
    selectedOption: function(value) {
      this.$emit("tree:selected", value);
    }
  },
  methods: {
    clickClearCheck: function() {
      this.selectedOption = {};
    }
  }
};
</script>
