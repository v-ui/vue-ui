<template>
  <div>
    <div class="row mx-0 align-items-center">
      <label class="m-0 px-0 pr-1">{{ dataMin }}</label>
      <div class="col">
        <div class="progress px-0" ref="bar" :style="barStyle">
          <b-slide-bar class="bg-transparent" :value="pStart" />
          <b-slide-bar :class="barClass" :value="pEnd" />
        </div>
        <b-slide-coltroller
          :id="`start-controller-${id}`"
          class="position-absolute"
          :class="startControllerClass"
          :style="[controllerStyle, startControllerPossition, startControllerStyle]"
          :aria-disabled="disabledStart"
          @mouseenter.native="initPopper('start')"
          @mousedown.native.left.exact.stop.prevent="$event => mouseDown($event, 'start')"
        />
        <b-slide-coltroller
          :id="`end-controller-${id}`"
          class="position-absolute"
          :class="endControllerClass"
          :style="[controllerStyle, endControllerPossition, endControllerStyle]"
          :aria-disabled="disabledEnd"
          @mouseenter.native="initPopper('end')"
          @mousedown.native.left.exact.stop.prevent="$event => mouseDown($event, 'end')"
        />
        <b-tootip :for="refId" :content="refTip" />
      </div>
      <label class=" m-0 p-0 pl-1">{{ dataMax }}</label>
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
  props: {
    color: util.props.color,
    start: util.props.Number,
    end: {
      ...util.props.Number,
      default: 0,
      validator: (value) => util.props.Number.validator(value),
    },
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
    size: util.props.size,
    info: util.props.String,
    disabled: util.props.Boolean,
    startDisabled: util.props.Boolean,
    endDiabled: util.props.Boolean,
  },
  data() {
    return {
      // popper
      id: tools.random.getRandomString(),
      refId: null,
      refTip: null,

      dataStart: this.toNumber(this.start),
      dataEnd: this.toNumber(this.end),

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
      return this.dataStart >= this.dataEnd ? 0 : (this.dataStart - this.dataMin) * this.p
    },
    pEnd: function() {
      return this.dataStart >= this.dataEnd ? 0 : (this.dataEnd - this.dataMin) * this.p - this.pStart
    },

    // 禁用
    disabledStart: function() {
      return this.disabled || this.startDisabled
    },
    disabledEnd: function() {
      return this.disabled || this.endDiabled
    },

    // 样式
    barStrong: function() {
      let strong = "8";
      if (this.size === "sm") strong = "6";
      else if (this.size === "lg") strong = "10";
      return strong
    },
    barStyle: function () {
      return { height: `${this.barStrong}px`, opacity: this.disabled ? 0.8 : 1 }
    },
    barClass: function() {
      return this.changeClass(false)
    },
    controllerStyle: function () {
      let strong = this.barStrong * 2
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
    start: function(value) {
      this.dataStart = this.toNumber(value)
    },
    end: function(value) {
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
      let start = (this.$refs.bar.clientWidth * this.pStart / 100 + 10)
      let end = (this.$refs.bar.clientWidth * this.pEnd / 100 + start)
      this.startControllerPossition.left = start + 'px'
      this.endControllerPossition.left = end + 'px'
    },
    initControllerTop: function() {
      let top = -this.barStrong / 2
      this.startControllerPossition.top = top + 'px'
      this.endControllerPossition.top = top + 'px'
    },
    toNumber: function(value, n = 0) {
      return !isNaN(value) ? Number(value) : n
    },
    // 将移动的量转换为数值
    formatNumber: function(diff) {
      let p = 100 / this.$refs.bar.clientWidth
      return diff * p
    },
    // 计算移动的累加值，当累加值大于或等于 dataStep 时一次性放回，并将累加值置 0
    formatDelt: function(x) {
      let delt = 0
      let diff = x - this.mouseMoveClientX
      this.mouseMoveClientX = x
      this.delt += this.formatNumber(diff)
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
        this.dataStart += this.formatDelt(event.clientX)
        if (this.dataStart >= this.dataEnd) this.dataStart = this.dataEnd - this.dataStep
        this.initControllerLeft()
      }
      this.initPopper('start')
    },
    endMousemove: async function(event) {
      if (!this.disabledEnd) {
        this.dataEnd += this.formatDelt(event.clientX)
        if (this.dataEnd <= this.dataStart) this.dataEnd = this.dataStart + this.dataStep
        this.initControllerLeft()
      }
      this.initPopper('end')
    },
  },
}
</script>
