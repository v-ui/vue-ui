<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between">
      <h4 class="mb-0">{{ title }}</h4>
      <i
        v-if="isShow"
        v-coll:[id].show="'#' + id"
        role="button"
        class="fas fa-chevron-up mb-0"
        @click="isShow = false"
      />
      <i
        v-else
        v-coll:[id]="'#' + id"
        class="fas fa-chevron-down collapsed mb-0"
        role="button"
        @click="isShow = true"
      />
    </div>
    <div :id="id" class="collapse" :class="{ show: show }" :data-parent="parent">
      <div class="card-body">
        <slot>{{ content }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import tool from "@/tool/index.js";
import util from "@/components/util/index.js";

import "@/components/base/Bootstrap/Collapse/v-collapse.js";

export default {
  name: "box-accordion",
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
      return "accordion-item-" + tool.random.getRandomString();
    }
  }
};
</script>
