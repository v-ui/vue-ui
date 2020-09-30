<template>
  <option
    v-if="!item.children"
    :value="item.value || item"
    :selected="isSelected"
    :aria-selected="isSelected"
    :disabled="item.disabled"
    :aria-disabled="item.disabled"
  >
    {{ item.label || item.value || item }}
  </option>
  <optgroup
    v-else
    :label="item.label"
    :disabled="item.disabled"
    :aria-disabled="item.disabled"
  >
    <basic-select-option
      v-for="(child, index) in item.children"
      :key="index"
      :item="child"
      :selected="selected"
      :primary-key="primaryKey"
      :is-multiple="isMultiple"
    />
  </optgroup>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "BasicSelectOption",
  components: { BasicSelectOption: () => import("./basic-select-option.vue") },
  mixins: [util.mixins.select.selectItem],
};
</script>
