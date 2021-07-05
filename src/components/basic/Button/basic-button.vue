<template>
  <button
    v-if="!href"
    :type="btnType"
    class="btn"
    :class="objClass"
    :disabled="disabled"
    :aria-disabled="disabled"
    :aria-pressed="active"
    :data-bs-toggle="toggle"
    v-on="$listeners"
  >
    <slot>{{ value }}</slot>
  </button>
  <base-a
    v-else
    class="btn"
    :class="objClass"
    :href="href"
    :disabled="disabled"
    :aria-pressed="active"
    :data-bs-toggle="toggle"
    role="button"
    v-on="$listeners"
  >
    <slot>{{ value }}</slot>
  </base-a>
</template>

<script>
import util from "@/components/util/index.js";

import BaseA from "@/components/basic/A/basic-a.vue";

export default {
  name: "BasicButton",
  components: { BaseA },
  mixins: [util.mixins.btn.base,]
};
</script>
