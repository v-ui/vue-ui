<template>
  <button
    v-if="!href"
    class="btn"
    :class="objClass"
    :disabled="isDisabled"
    :aria-disabled="isDisabled"
    :aria-pressed="active"
    v-on="$listeners"
  >
    <slot name="loading">
      <b-loading
        v-show="loading"
        size="sm"
        class="me-1"
      />
    </slot>
    <slot>{{ value }}</slot>
    <sr-msg>{{ fillsrMsg }}</sr-msg>
  </button>
  <base-a
    v-else
    class="btn"
    :class="objClass"
    :href="href"
    :active="active"
    :aria-pressed="active"
    :disabled="isDisabled"
    :aria-disabled="isDisabled"
    data-toggle="button"
    role="button"
    v-on="$listeners"
  >
    <slot name="loading">
      <b-loading
        v-show="loading"
        size="sm"
        class="me-1"
      />
    </slot>
    <slot>{{ value }}</slot>
    <sr-msg>{{ fillsrMsg }}</sr-msg>
  </base-a>
</template>

<script>
import util from "@/components/util/index.js";

import BaseA from "@/components/basic/A/basic-a.vue";
import BLoading from '@/components/base/Loading/b-loading.vue'
import srMsg from "@/components/basic/basic-sr-msg.vue";

export default {
  name: "BasicButton",
  components: { BaseA, BLoading, srMsg },
  mixins: [util.mixins.form.btn]
};
</script>
