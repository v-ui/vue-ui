<template>
  <div class="accordion">
    <b-accordion
      v-for="(item, index) in list"
      :key="index"
      :title="item.title"
      :content="item.content"
      :control="item.control"
      :show="item.show"
      :parent="parent"
    />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BAccordion from "./b-accordion";

export default {
  name: "BAccordionList",
  components: { BAccordion },
  props: {
    list: util.props.Array,
    parent: util.props.String,
  }
};
</script>
