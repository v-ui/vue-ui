<template>
  <div class="row mx-0 align-items-center">
    <div class="progress col px-0" :style="{ height: `${strong}px` }">
      <template v-if="list && list.length > 0">
        <b-bar-item
          v-for="(obj, index) in list"
          :key="index"
          :striped="striped"
          :animated="animated"
          :value="obj.value"
          :color="obj.color"
        />
      </template>
      <b-bar-item
        v-else
        :color="color"
        :value="value"
        :striped="striped"
        :animated="animated"
      />
    </div>
    <label class="col-1 m-0 p-0 pl-1">{{ parseInt(tweenNumber) || 0 }}%</label>
  </div>
</template>

<script>
import tools from '@/tools/index.js'
import util from "@/components/util/index.js";

import BBarItem from "./b-progress-bar-item.vue";

export default {
  name: "b-progress-bar",
  components: { BBarItem, },
  mixins: [ util.mixins.animate.progress, ],
  props: {
    type: {
      type: String,
      default: 'default',
      validator: function(value) {
        return ['default', 'state', 'list'].includes(value)
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
    strong: util.props.UNumber,
    value: {
      ...util.props.UNumber,
      validator: (value) => util.props.UNumber.validator(value) && value <= 100,
    },
    striped: util.props.Boolean,
    animated: util.props.Boolean,
  },
  data() {
    return {
      targetNumber: this.value,
      enumStatus: {
        default: 'default',
        state: 'state',
        list: 'list',
      },
    }
  },
  computed: {
    list: function() {
      let value = 0
      let list = []
      if (tools.obj.type.isArray(this.color)) {

        let size = this.color.reduce((acc, cur) => acc.value ? acc.value + cur.value : acc + cur.value)
        debugger
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
  },
  watch: {
    value: function(value) {
      this.targetNumber = value
    },
  },
  created() {
    // this.targetNumber =
    //   this.list && this.list.length > 0
    //     ? this.list.reduce((acc, cur) => acc.value && cur.value ? acc.value + cur.value : cur.value )
    //     : this.value;
  },
};
</script>
