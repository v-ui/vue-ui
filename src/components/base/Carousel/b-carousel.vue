<template v-if="content && content.length > 0">
  <div
    :id="guid"
    class="carousel slide"
    :class="{'carousel-fade': fade}"
    data-ride="carousel"
  >
    <ol
      v-if="indicators"
      class="carousel-indicators"
    >
      <li
        v-for="(item, index) in content"
        :key="index"
        :data-slide-to="index"
        :class="{active: activeIndex == index}"
        :data-target="'#' + guid"
        @click="activeIndex = index"
      />
    </ol>
    <div class="carousel-inner">
      <b-carousel-item
        v-for="(item, index) in content"
        :key="index"
        :item="item"
        :data-interval="interval"
        :class="{active: activeIndex == index}"
      />
    </div>
    <template v-if="control">
      <base-a
        class="carousel-control-prev"
        :href="'#' + guid"
        role="button"
        data-slide="prev"
        @click="activeIndex < content.length - 1 ? activeIndex++ : 0"
      >
        <span
          class="carousel-control-prev-icon"
          aria-hidden="true"
        />
        <sr-msg>Previous</sr-msg>
      </base-a>
      <base-a
        class="carousel-control-next"
        :href="'#' + guid"
        role="button"
        data-slide="next"
        @click="activeIndex > 0 ? activeIndex-- : content.length - 1"
      >
        <span
          class="carousel-control-next-icon"
          aria-hidden="true"
        />
        <sr-msg>Next</sr-msg>
      </base-a>
    </template>
  </div>
</template>
<script>
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import BCarouselItem from "./b-carousel-item";
import srMsg from "@/components/basic/basic-sr-msg.vue";

import BaseA from "@/components/basic/A/c-a.vue";

export default {
  name: "BCarousel",
  components: { BCarouselItem, BaseA, srMsg },
  props: {
    content: util.props.String,
    indicators: util.props.Boolean,
    control: util.props.Boolean,
    fade: util.props.Boolean,
    interval: util.props.Number
  },
  data() {
    return {
      activeIndex: 0
    };
  },
  computed: {
    guid: function() {
      return "carouselCaptions-" + tools.random.getRandomString();
    }
  }
};
</script>
