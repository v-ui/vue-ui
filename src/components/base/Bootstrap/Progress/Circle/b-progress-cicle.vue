<template>
  <svg
    version="1.1"
    :width="width"
    :height="width"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
  >
    <!-- style="border: 1px solid #aaa; display:block;" -->
    <b-circle-item
      :r="r"
      :value="100"
      class="progress-bg"
      :strong="strong"
    />
    <template v-if="list && list.length > 0">
      <b-circle-item
        v-for="(obj, index) in list"
        :key="index"
        :r="r"
        :start="start(list.slice(0, index))"
        :value="obj.value"
        :color="obj.color"
        :strong="strong"
      />
    </template>
    <b-circle-item
      v-else
      :r="r"
      :color="color"
      :strong="strong"
      :value="value"
    />
    <image v-if="src" :xlink:href='src' x="-25%" y="-25%" height="50%" width="50%"/>
    <text v-if="!hideValue" x="0%" :y="info ? '-4%' : '0%'" text-anchor="middle" dominant-baseline="central">{{ parseInt(value) || 0 }}%</text>
    <text x="0%" y="4%" text-anchor="middle" dominant-baseline="central">{{ info }}</text>
  </svg>
</template>

<script>
import util from "@/components/util/index.js";
import BCircleItem from './b-progress-circle-item'

export default {
  name: 'b-progress-circle',
  components: { BCircleItem, },
  props: {
    width: util.props.UInt,
    value: {
      ...util.props.UNumber,
      validator: (value) => util.props.UNumber.validator(value) && value <= 100,
    },
    list: [Object, Array],
    color: [String, Array,],
    src: util.props.String,
    strong: util.props.UNumber,
    info: util.props.String,
    hideValue: util.props.boolean,
  },
  data() {
    return {
      // 比例
      p: 0.9,
    }
  },
  computed: {
    viewBox: function() {
      let length = Math.floor(this.width * (this.p + 0.2))
      return `-${Math.floor(length / 2)} -${Math.floor(length / 2)} ${length} ${length}`
    },
    // A - r 圆的半径
    r: function() {
      return this.width / 2 * this.p
    },
  },
  methods: {
     // deg 弧度
    deg: function(value) {
      return 360 / 100 * Math.PI / 180 * value || 0
    },
    start: function(list) {

      if (list.length === 0) return null
      let value = list.reduce((acc, cur) => acc + cur.value, 0)
      return this.deg(value)
    },
  },
}
</script>

