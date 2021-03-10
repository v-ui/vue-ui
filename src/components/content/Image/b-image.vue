<template>
  <picture>
    <source
      v-for="(img, index) in imgList"
      :key="index"
      :srcset="img.src || img.srcset"
      :sizes="img.sizes"
      :media="!img.sizes ? img.media : ''"
      :type="img.type"
    >
    <img
      ref="img"
      v-lazy="lazyLoad"
      class="img-fluid img-thumbnail p-0"
      :alt="alt"
      :src="imgSrc"
      :style="objStyle"
    >
  </picture>
</template>

<script>
import util from "@/components/util/index.js";

/*
  图片 API
  https://www.cnblogs.com/lgqrlchinese/p/11386857.html
  https://unsplash.it/1600/900?random
*/
export default {
  name: "BImage",
  props: {
    src: util.props.src,
    alt: util.props.String,
    list: util.props.Array,
  },
  data() {
    return {
      imgList: [],
      imgSrc: null
    };
  },
  computed: {
    backgroundcolor: function() {
      let r = this.random(255);
      let g = this.random(255);
      let b = this.random(255);
      let a = 1;
      return `background-color: rgba(${r}, ${g}, ${b}, ${a})`;
    },
    objStyle: function() {
      return this.backgroundcolor;
    }
  },
  mounted() {},
  methods: {
    random: function(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    lazyLoad: function() {
      this.imgList = this.list;
      this.imgSrc = this.src;
    }
  }
};
</script>
