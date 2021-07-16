<template>
  <div class="accordion-item">
    <h2
      :id="`${parent}-${index}`"
      class="accordion-header"
    >
      <button class="accordion-button" :class="{'collapsed': !item.show}" type="button" v-coll="{ target: `#body-${parent}-${index}`, show: item.show }">
        <slot name="header" :item="item">{{ item.title }}</slot>
      </button>
    </h2>
    <b-collapse ref="body" :id="`body-${parent}-${index}`" class="accordion-collapse" :class="{'show': item.show}">
      <div class="accordion-body">
        <slot name="body" :item="item">{{ item.content }}</slot>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import BCollapse from "@/components/base/Collapse/b-collapse.vue"

export default {
  name: "BAccordionItem",
  components: { BCollapse },
  props: {
    item: util.props.Object,
    index: util.props.UInt,
    parent: util.props.String,
    allwaysOpen: util.props.Boolean,
  },
  mounted() {
    this.setParent(this.allwaysOpen)
  },
  methods: {
    setParent: function(allwaysOpen) {
      if (!allwaysOpen) tools.dom.addAttr(this.$refs.body.$el, 'data-bs-parent', `#${this.parent}`)
    },
  },
};
</script>
