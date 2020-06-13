<template functional>
  <div
    v-if="slots().default"
    class="tab-pane fade overflow-auto"
    :class="{'show active': props.active}"
    role="tabpanel"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "box-tab-pane",
  props: {
    active: util.props.Boolean,
  }
};
</script>
