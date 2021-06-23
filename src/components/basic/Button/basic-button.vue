<template>
  <button
    v-if="!href"
    :type="btnType"
    class="btn"
    :class="objClass"
    :disabled="disabled"
    :aria-disabled="disabled"
    :aria-pressed="active"
    :data-bs-toggle="{active: 'button'}"
    v-on="$listeners"
  >
    <slot>{{ value }}</slot>
    <sr-msg>{{ fillsrMsg }}</sr-msg>
  </button>
  <base-a
    v-else
    class="btn"
    :class="objClass"
    :href="href"
    :disabled="disabled"
    :aria-pressed="active"
    :data-bs-toggle="{active: 'button'}"
    role="button"
    v-on="$listeners"
  >
    <slot>{{ value }}</slot>
    <sr-msg>{{ fillsrMsg }}</sr-msg>
  </base-a>
</template>

<script>
import util from "@/components/util/index.js";

import BaseA from "@/components/basic/A/basic-a.vue";
import srMsg from "@/components/basic/basic-sr-msg.vue";

export default {
  name: "BasicButton",
  components: { BaseA, srMsg },
  mixins: [util.mixins.btn.base,]
};
</script>
