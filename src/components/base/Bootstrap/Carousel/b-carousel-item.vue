<template>
  <div class="carousel-item">
    <img
      :src="imgSrc"
      class="d-block w-100"
      :alt="item.alt"
    >
    <div
      v-if="item.title || item.context"
      class="carousel-caption d-none d-md-block"
    >
      <h5>{{ item.title }}</h5>
      <p>{{ item.context }}</p>
    </div>
  </div>
</template>
<script>
import util from "@/components/util/index.js";

export default {
  name: "BCarouselItem",
  props: {
    item: util.props.Object,
  },
  computed: {
    imgSrc: function() {
      return this.item.src ? this.item.src : "";
    }
  }
};
</script>
