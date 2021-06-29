<template>
  <div class="accordion" :class="[{'accordion-flush': flush}]" :id="id">
    <b-accordion-item
      v-for="(item, index) in list"
      :key="index"
      :item="item"
      :parent="id"
      :index="index"
      :allways-open="allwaysOpen"
    >
      <template #header="item">
        <slot name="header" :item="item" />
      </template>
      <template #body="item">
        <slot name="body" :item="item" />
      </template>
    </b-accordion-item>
  </div>
</template>

<script>
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import BAccordionItem from "./b-accordion-item";

export default {
  name: "BAccordion",
  components: { BAccordionItem },
  props: {
    list: util.props.Array,
    allwaysOpen: util.props.Boolean,
    flush: util.props.Boolean,
    id: {
      type: String,
      default: "accordion-" + tools.random.getRandomString(),
    },
  }
};
</script>
