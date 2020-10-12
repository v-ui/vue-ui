<template>
  <colgroup>
    <col
      v-for="(item, index) in colgroup"
      :key="index"
      :class="item.class"
      :style="item.style"
    >
  </colgroup>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "TableColgroup",
  props: {
    colgroup: util.props.Array,
  }
};
</script>
