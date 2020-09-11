<template>
  <div>
    <b-circle
      v-if="status === 'circle'"
      :width="width"
      :value="value"
      :color="cColor"
      :strong="strong"
      :info="info"
    />
    <b-bar
      v-else
      :type="type"
      :list="list"
      :value="value"
      :color="cColor"
      :strong="strong"
      :striped="striped"
      :animated="animated"
    />
    <b-info v-if="status !== 'circle'" :info="info" />
  </div>
</template>

<script>
import tools from '@/tools/index.js'
import util from "@/components/util/index.js";

import BBar from "./Bar/b-progress-bar.vue";
import BCircle from "./Circle/b-progress-cicle.vue";

import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-progress",
  components: { BBar, BCircle, BInfo },
  props: {
    status: {
      ...util.props.String,
      default: "bar",
      validator: function (value) {
        return ["bar", "circle"].includes(value);
      },
    },
    type: {
      type: String,
      default: 'default',
      validator: function(value) {
        return ['default', 'state'].includes(value)
      },
    },
    color: {
      type: [String, Array],
      default:  util.props.color.default,
      validator: function(value) {
        if (tools.obj.type.isString(value)) {
          return util.props.color.validator(value)
        } else if (tools.obj.type.isArray(value)) {
          return value.every(e => util.props.UInt.validator(e.value) && e.value <= 100 && util.props.color.validator(e.color))
        }
      },
    },
    info: util.props.String,
    striped: util.props.Boolean,
    animated: util.props.Boolean,
    size: util.props.size,
    value: {
      ...util.props.UNumber,
      validator: (value) => util.props.UNumber.validator(value) && value <= 100,
    },
  },
  data() {
    return {
      enumStatus: {
        default: 'default',
        state: 'state',
      },
    }
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
      let width = 200
      if (this.size === "sm") width = "150";
      else if (this.size === "lg") width = "250";
      return width;
    },
    list: function() {
      if (this.type !== this.enumStatus.default) return null
      let value = 0
      let list = []
      if (tools.obj.type.isArray(this.color)) {

        let size = this.color.reduce((acc, cur) => acc.value ? acc.value + cur.value : acc + cur.value)
        if (this.value > size) {
          list = this.color
          list.push({ value: this.value - size, color: 'primary' })
        } else {
          for (let i = 0; i < this.color.length; i++) {
            value += this.color[i].value
            if (value <= this.value) {
              list.push(this.color[i])
            } else {
              list.push({ value: this.value - (value - this.color[i].value), color: this.color[i].color })
              break
            }
          }
        }
        return list
      }
      return null
    },
    cColor: function() {
      if (this.type !== this.enumStatus.state) return 'primary'
      let c = this.color.find(e => this.value <= e.value)
      return c && c.color || 'primary'
    },
  },
  mounted() {
    if (this.type === this.enumStatus.state) this.color.sort((a, b) => a.value - b.value)
  },
};
</script>
