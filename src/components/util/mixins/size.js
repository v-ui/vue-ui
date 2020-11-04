import props from '@/components/util/props.js'

const base = {
  props: {
    size: props.size,
  },
}

const strong = {
  mixins: [ base, ],
  computed: {
    // 粗细
    strong: function () {
      let strong = 8;
      if (this.size === "sm") strong = 6;
      else if (this.size === "lg") strong = 10;
      return strong;
    },
  },
}

export default {
  base,
  strong,
}
