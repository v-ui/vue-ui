<template>
  <button
    v-if="!href"
    class="btn"
    :class="objClass"
    :disabled="disabled"
    :aria-pressed="active"
    :aria-disabled="disabled"
    v-on="$listeners"
  >
    <slot>{{ value | worldUpperCase | firstUpperCase }}</slot>
    <sr-msg>{{ fillsrMsg }}</sr-msg>
  </button>
  <base-a
    v-else
    class="btn"
    :class="objClass"
    :href="href"
    :active="active"
    :aria-pressed="active"
    :disabled="disabled"
    data-toggle="button"
    role="button"
    v-on="$listeners"
  >
    <slot>{{ value | worldUpperCase | firstUpperCase }}</slot>
    <sr-msg>{{ fillsrMsg }}</sr-msg>
  </base-a>
</template>

<script>
import util from "@/components/util/index.js";

import BaseA from "@/components/base/Content/A/c-a.vue";
import srMsg from "@/components/Basic/basic-sr-msg.vue";

export default {
  name: "basic-button",
  components: { BaseA, srMsg },
  mixins: [util.mixins.form.btn]
};
</script>
