<template>
  <ul class="list-unstyled">
    <template v-for="(item, index) in list">
      <b-media-item :key="index" class="mb-2" :item="item" />
    </template>
  </ul>
</template>

<script>
import util from "@/components/util/index.js";

import BMediaItem from "./b-media-item";

export default {
  name: "b-media",
  components: { BMediaItem },
  props: {
    list: util.props.Array,
  }
};
</script>
