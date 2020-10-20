<template>
  <div>
    <div class="row mx-0 align-items-center">
      <label class="m-0 px-0 pr-1">{{ dataMin }}</label>
      <div class="col">
        <div class="progress px-0" ref="bar" :style="barStyle">
          <b-slide-bar class="bg-transparent" :value="pStart" />
          <b-slide-bar :class="objClass" :value="pEnd" />
        </div>
        <b-slide-coltroller
          :id="`start-controller-${id}`"
          class="position-absolute"
          :class="objClass"
          :style="[controllerStyle, startControllerPossition]"
          @mouseenter.native="initPopper('start')"
          @mousedown.native.left.exact.stop.prevent="$event => mouseDown($event, 'start')"
        />
        <b-slide-coltroller
          :id="`end-controller-${id}`"
          class="position-absolute"
          :class="objClass"
          :style="[controllerStyle, endControllerPossition]"
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
    size: util.props.size,
    info: util.props.String,
  },
  data() {
    return {
      id: tools.random.getRandomString(),
      refId: null,
      refTip: null,
      dataStart: isNaN(this.start) ? 0 : Number(this.start),
      dataEnd: isNaN(this.end) ? 0 : Number(this.end),
      mouseMoveClientX: 0,
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
    dataMin: function() {
      return isNaN(this.min) ? 0 : Number(this.min)
    },
    dataMax: function() {
      return isNaN(this.max) ? 0 : Number(this.max)
    },
    p: function() {
      return this.dataMin >= this.dataMax ? 0 : 100 / (this.dataMax - this.dataMin)
    },
    pStart: function() {
      return this.dataStart >= this.dataEnd ? 0 : (this.dataStart - this.dataMin) * this.p
    },
    pEnd: function() {
      return this.dataStart >= this.dataEnd ? 0 : (this.dataEnd - this.dataMin) * this.p - this.pStart
    },
    barStrong: function() {
      let strong = "8";
      if (this.size === "sm") strong = "6";
      else if (this.size === "lg") strong = "10";
      return strong
    },
    barStyle: function () {
      return { height: `${this.barStrong}px` }
    },
    controllerStyle: function () {
      let strong = this.barStrong * 2
      return { width: `${strong}px`, height: `${strong}px` }
    },
    objClass: function () {
      return `bg-${this.color}`
    },
  },
  watch: {
    start: function(value) {
      this.dataStart = isNaN(this.start) ? 0 : Number(value)
    },
    end: function(value) {
      this.dataEnd = isNaN(this.start) ? 0 : Number(value)
    }
  },
  mounted() {
    this.initControllerLeft()
    this.initControllerTop()
  },
  methods: {
    initPopper: async function(type) {
      if (!['start', 'end'].includes(type)) return
      this.refId = null
      await this.$nextTick()
      this.refId = `${type}-controller-${this.id}`
      this.refTip = this.dataStart
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
    mouseDown: function(event, type) {
      this.mouseMoveClientX = event.clientX
      document.addEventListener('mousemove', type === 'start' ? this.startMousemove : this.endMousemove)
      document.addEventListener('mouseup',
        () => document.removeEventListener('mousemove', type === 'start' ? this.startMousemove : this.endMousemove)
      )
    },
    startMousemove: async function(event) {
      let diff = event.clientX - this.mouseMoveClientX
      this.mouseMoveClientX = event.clientX
      this.dataStart += this.computeNumber(diff)
      if (this.dataStart >= this.dataEnd) this.dataStart = this.dataEnd - 1
      this.initPopper('start')
      this.initControllerLeft()
    },
    endMousemove: async function(event) {
      let diff = event.clientX - this.mouseMoveClientX
      this.mouseMoveClientX = event.clientX
      this.dataEnd += this.computeNumber(diff)
      if (this.dataEnd <= this.dataStart) this.dataEnd = this.dataStart + 1
      this.initPopper('end')
      this.initControllerLeft()
    },
    computeNumber: function(diff) {
      let p = 100 / this.$refs.bar.clientWidth
      return diff * p
    },
  },
}
</script>
