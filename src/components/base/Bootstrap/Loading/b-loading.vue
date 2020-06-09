<template>
  <div :class="objClass" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "b-loading",
  mixins: [util.mixins.loading]
};
</script>
