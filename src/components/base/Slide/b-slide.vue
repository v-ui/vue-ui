<template>
  <div>
    <div class="row mx-0 align-items-center">
      <label class="col-auto m-0 px-0 pe-1">{{ dataMin }}</label>
      <div class="col">
        <div
          ref="bar"
          class="progress px-0"
          :style="barStyle"
        >
          <b-slide-bar
            class="bg-transparent"
            :value="pStart"
          />
          <b-slide-bar
            :class="barClass"
            :value="pEnd"
          />
        </div>
        <b-slide-coltroller
          v-if="!readonly"
          :id="`start-controller-${id}`"
          class="position-absolute"
          :class="startControllerClass"
          :style="[controllerStyle, startControllerPossition, startControllerStyle]"
          :aria-disabled="disabledStart"
          @mouseenter.native="initPopper('start')"
          @mousedown.native.left.exact.stop.prevent="$event => mouseDown($event, 'start')"
        />
        <b-slide-coltroller
          v-if="!readonly"
          :id="`end-controller-${id}`"
          class="position-absolute"
          :class="endControllerClass"
          :style="[controllerStyle, endControllerPossition, endControllerStyle]"
          :aria-disabled="disabledEnd"
          @mouseenter.native="initPopper('end')"
          @mousedown.native.left.exact.stop.prevent="$event => mouseDown($event, 'end')"
        />
        <b-tootip
          :for="refId"
          :content="refTip"
        />
      </div>
      <label class="col-auto m-0 p-0 ps-1">{{ dataMax }}</label>
    </div>
    <b-info :info="info" />
  </div>
</template>

<script>
import tools from "@/tools";
import util from "@/components/util";

import BSlideBar from './Basic/b-slide-bar'
import BSlideColtroller from './Basic/b-slide-coltroller'

import BTootip from '@/components/base/Tooltip/b-tooltip.vue'
import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: 'BSlide',
  components: { BSlideBar, BSlideColtroller, BTootip, BInfo, },
  mixins: [ util.mixins.size.strong, ],
  model: {
    prop: 'value',
    event: 'slide:input'
  },
  props: {
    color: util.props.color,
    value: util.props.Object,
    min: util.props.Number,
    max: {
      ...util.props.Number,
      default: 100,
      validator: (value) => util.props.Number.validator(value),
    },
    step: {
      ...util.props.UNumber,
      default: 1
    },
    info: util.props.String,
    disabled: util.props.Boolean,
    startDisabled: util.props.Boolean,
    endDiabled: util.props.Boolean,
    readonly: util.props.Boolean,
  },
  data() {
    return {
      // popper
      id: tools.random.getRandomString(),
      refId: null,
      refTip: null,

      dataStart: this.toNumber(this.value.start),
      dataEnd: this.toNumber(this.value.end),

      // 控制点的位置相关
      delt: 0, // 移动量数值的累加值
      mouseMoveClientX: 0, // 移动量的累加
      startControllerPossition: {
        left: '0px',
        top: '-3px',
      },
      endControllerPossition: {
        left: '0px',
        top: '-3px',
      }
    }
  },
  computed: {
    // 数值转换
    dataMin: function() {
      return this.toNumber(this.min)
    },
    dataMax: function() {
      return this.toNumber(this.max, 100)
    },
    dataStep: function() {
      return this.toNumber(this.step, 1)
    },

    // 控制点
    // 单位数值对应的移动量
    p: function() {
      return this.dataMin >= this.dataMax ? 0 : 100 / (this.dataMax - this.dataMin)
    },
    pStart: function() {
      let data = this.dataStart >= this.dataEnd ? 0 : (this.dataStart - this.dataMin) * this.p
      return this.formatData(data, 0, 100)
    },
    pEnd: function() {
      let data = this.dataStart >= this.dataEnd ? 0 : (this.dataEnd - this.dataMin) * this.p - this.pStart
      return this.formatData(data, 0, 100)
    },

    // 禁用
    disabledStart: function() {
      return this.disabled || this.startDisabled
    },
    disabledEnd: function() {
      return this.disabled || this.endDiabled
    },

    // 样式
    barStyle: function () {
      return { height: `${this.strong}px`, opacity: this.disabled ? 0.8 : 1 }
    },
    barClass: function() {
      return this.changeClass(false)
    },
    controllerStyle: function () {
      let strong = this.strong * 2
      return { width: `${strong}px`, height: `${strong}px` }
    },
    startControllerStyle: function() {
      return this.changeStyle(this.disabledStart)
    },
    endControllerStyle: function() {
      return this.changeStyle(this.disabledEnd)
    },
    startControllerClass: function() {
      return this.changeClass(this.disabledStart) + ` border border-${this.color || 'primary'}`
    },
    endControllerClass: function() {
      return this.changeClass(this.disabledEnd) + ` border border-${this.color || 'primary'}`
    },
  },
  watch: {
    'value.start': function(value) {
      this.dataStart = this.toNumber(value)
    },
    'value.end': function(value) {
      this.dataEnd = this.toNumber(value)
    }
  },
  mounted() {
    this.initControllerLeft()
    this.initControllerTop()
  },
  methods: {
    changeClass: function(disabled) {
      return disabled ? 'bg-light' : `bg-${this.color || 'primary'}`
    },
    changeStyle: function(disabled) {
      return { cursor: disabled ? 'default' : 'pointer' }
    },
    initPopper: async function(type) {
      if (!['start', 'end'].includes(type)) return
      this.refId = null
      await this.$nextTick()
      this.refId = `${type}-controller-${this.id}`
      this.refTip = type === 'start' ?  this.dataStart : this.dataEnd
    },
    initControllerLeft: function() {
      let barWidth = this.$refs.bar.clientWidth
      let start = (barWidth * this.pStart / 100 + this.strong)
      let end = (barWidth * (this.pEnd + this.pStart) / 100 + this.strong)

      start = this.formatData(start, 0, barWidth, this.strong, barWidth)
      end = this.formatData(end, 0, barWidth + this.strong, this.strong)
      if (end < this.strong * 2) end = this.strong * 2
      if (start > end - this.strong * 2) start = end - this.strong * 2

      this.startControllerPossition.left = start + 'px'
      this.endControllerPossition.left = end + 'px'
    },
    initControllerTop: function() {
      let top = -this.strong / 2
      this.startControllerPossition.top = top + 'px'
      this.endControllerPossition.top = top + 'px'
    },
    toNumber: function(value, n = 0) {
      return !isNaN(value) ? Number(value) : n
    },
    formatData: function(value, min = 0, max = 100, minValue = min, maxValue = max) {
      if (value < min) value = minValue
      if (value > max) value = maxValue
      return value
    },
    // 将移动的量转换为数值
    getNumber: function(diff) {
      let p = 100 / this.$refs.bar.clientWidth
      return diff * p
    },
    // 计算移动的累加值，当累加值大于或等于 dataStep 时一次性放回，并将累加值置 0
    getDelt: function(x) {
      let delt = 0
      let diff = x - this.mouseMoveClientX
      this.mouseMoveClientX = x
      this.delt += this.getNumber(diff)
      if (Math.abs(this.delt) >= Math.abs(this.dataStep)) {
        delt = parseInt(this.delt / this.dataStep) * this.dataStep
        this.delt = 0
      }
      return delt
    },
    mouseDown: function(event, type) {
      this.delt = 0
      this.mouseMoveClientX = event.clientX
      document.addEventListener('mousemove', type === 'start' ? this.startMousemove : this.endMousemove)
      document.addEventListener('mouseup',
        () => document.removeEventListener('mousemove', type === 'start' ? this.startMousemove : this.endMousemove)
      )
    },
    startMousemove: async function(event) {
      if (!this.disabledStart) {
        let delt = this.getDelt(event.clientX)
        if (this.dataStart + delt < this.dataMin || this.dataStart + delt > this.dataMax) return
        this.dataStart += delt
        if (this.dataStart >= this.dataEnd) this.dataStart = this.dataEnd - this.dataStep
        this.initControllerLeft()
        // 配合 v-model
        this.$emit('slide:input', {start: this.dataStart, end: this.dataEnd})
      }
      this.initPopper('start')
    },
    endMousemove: async function(event) {
      if (!this.disabledEnd) {
        let delt = this.getDelt(event.clientX)
        if (this.dataEnd + delt < this.dataMin || this.dataEnd + delt > this.dataMax) return
        this.dataEnd += delt
        if (this.dataEnd <= this.dataStart) this.dataEnd = this.dataStart + this.dataStep
        // 配合 v-model
        this.$emit('slide:input', {start: this.dataStart, end: this.dataEnd})
        this.initControllerLeft()
      }
      this.initPopper('end')
    },
  },
}
</script>
