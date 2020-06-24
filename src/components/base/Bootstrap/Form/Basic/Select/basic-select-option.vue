<template>
  <option
    v-if="!item.children"
    :value="item.value || item"
    :selected="isSelected(item.value || item)"
    :aria-selected="isSelected(item.value || item)"
    :disabled="item.disabled"
    :aria-disabled="item.disabled"
  >{{ item.label || item.value || item }}</option>
  <optgroup
    v-else
    :label="item.label"
    :disabled="item.disabled"
    :aria-disabled="item.disabled">
    <basic-select-option
      v-for="(child, index) in item.children"
      :key="index"
      :item="child"
      :is-selected-value="isSelectedValue"
      :multiple="multiple"
    />
  </optgroup>
</template>

<script>
export default {
  name: "basic-select-option",
  components: { BasicSelectOption: () => import("./basic-select-option.vue") },
  props: {
    item: [String, Number, Array, Object],
    isSelectedValue: [String, Number, Array],
    multiple: Boolean
  },
  methods: {
    isSelected: function(val) {
      return this.multiple
        ? this.isSelectedValue.includes(val)
        : this.isSelectedValue == val;
    }
  }
};
</script>
