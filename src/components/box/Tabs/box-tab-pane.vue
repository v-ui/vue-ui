<template>
  <div
    v-if="$slots.default"
    class="tab-pane fade overflow-auto"
    :class="{'show active': active}"
    role="tabpanel"
  >
    <slot />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "box-tab-pane",
  props: {
    active: util.props.Boolean
  }
};
</script>
