<template>
  <div>
    <b-circle
      v-if="circle"
      :src="src"
      :list="list"
      :info="info"
      :width="width"
      :color="cColor"
      :strong="strong"
      :value="tweenNumber"
      :hide-value="hideValue"
    />
    <b-bar
      v-else
      :list="list"
      :color="cColor"
      :strong="strong"
      :striped="striped"
      :value="tweenNumber"
      :animated="animated"
      :hide-value="hideValue"
    />
    <b-info
      v-if="!circle"
      :info="info"
    />
  </div>
</template>

<script>
import tools from '@/tools/index.js'
import util from "@/components/util/index.js";

import BBar from "./Bar/b-progress-bar.vue";
import BCircle from "./Circle/b-progress-cicle.vue";

import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BProgress",
  components: { BBar, BCircle, BInfo },
  mixins: [ util.mixins.animate.progress, ],
  props: {
    value: {
      ...util.props.UNumber,
      validator: (value) => util.props.UNumber.validator(value) && value <= 100,
    },
    color: {
      type: [String, Array],
      default: util.props.color.default,
      validator: function(value) {
        if (tools.obj.type.isString(value)) {
          return util.props.color.validator(value)
        } else if (tools.obj.type.isArray(value)) {
          return value.every(e => util.props.UNumber.validator(e.value) && e.value <= 100 && util.props.color.validator(e.color))
        }
      },
    },
    state: util.props.Boolean,
    circle: util.props.Boolean,
    striped: util.props.Boolean,
    animated: util.props.Boolean,
    hideValue: util.props.Boolean,
    src: util.props.String,
    size: util.props.size,
    info: util.props.String,
  },
  computed: {
    // 粗细
    strong: function () {
      let strong = "10";
      if (this.size === "sm") strong = "5";
      else if (this.size === "lg") strong = "15";
      return strong;
    },
    width: function() {
      let width = 150
      if (this.size === "sm") width = "100";
      else if (this.size === "lg") width = "200";
      return width;
    },
    list: function() {
      if (this.state) return null
      let value = 0
      let list = []
      if (tools.obj.type.isArray(this.color)) {

        let size = this.color.reduce((acc, cur) => acc.value ? acc.value + cur.value : acc + cur.value)
        if (this.tweenNumber > size) {
          list = this.color
          list.push({ value: this.tweenNumber - size, color: 'primary' })
        } else {
          for (let i = 0; i < this.color.length; i++) {
            value += this.color[i].value
            if (value <= this.tweenNumber) {
              list.push(this.color[i])
            } else {
              list.push({ value: this.tweenNumber - (value - this.color[i].value), color: this.color[i].color })
              break
            }
          }
        }
        return list
      }
      return null
    },
    cColor: function() {
      if (!this.state) return this.color
      let c = this.color.find(e => this.value <= e.value)
      return c && c.color || 'primary'
    },
  },
  data() {
    let vm = this
    return {
      opt: {
        delay: 0.25,
        onUpdate: function() {
          vm.$emit('animate:updating', vm.tweenNumber)
        },
      },
    }
  },
  mounted() {
    if (this.state) this.color.sort((a, b) => a.value - b.value)
  },
};
</script>
