<template>
  <div class="card">
    <div
      v-coll:[id]="'#' + id"
      class="card-header d-flex justify-content-between"
      @click="isShow = !isShow"
    >
      <slot name="header">
        <h4 class="mb-0">
          {{ title }}
        </h4>
      </slot>
      <i
        v-if="isShow"
        role="button"
        class="fas fa-chevron-up mb-0"
      />
      <i
        v-else
        class="fas fa-chevron-down collapsed mb-0"
        role="button"
      />
    </div>
    <div
      :id="id"
      class="collapse"
      :class="{ show: show }"
      :data-parent="parent"
    >
      <div class="card-body">
        <slot>{{ content }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import "@/components/base/Collapse/v-collapse.js";

export default {
  name: "BoxAccordion",
  props: {
    title: util.props.String,
    content: util.props.String,
    control: util.props.String,
    parent: util.props.String,
    show: util.props.Boolean
  },
  data() {
    return {
      isShow: this.show
    };
  },
  computed: {
    id: function() {
      return "accordion-item-" + tools.random.getRandomString();
    }
  }
};
</script>
