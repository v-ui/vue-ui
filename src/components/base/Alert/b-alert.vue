<template>
    <div
      v-show="$slots.default && isShow"
      class="alert fade show position-absolute"
      :class="objClass"
      style="min-width: 300px;"
      :style="objStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="countDown"
    >
      <h5
        v-if="$slots.header"
        class="alert-heading"
      >
        <slot name="header" />
        <button
          v-if="showDismisLable"
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        />
      </h5>
      <div
        class="overflow-auto"
        style="max-height: 200px;"
      >
        <slot />
      </div>
      <div v-if="$slots.footer">
        <hr>
        <p class="mb-0">
          <slot name="footer" />
        </p>
      </div>
      <button
        v-if="showDismisLable && !$slots.header"
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      />
    </div>
</template>
<script>
import util from "@/components/util/index.js";

export default {
  name: "BAlert",
  props: {
    show: util.props.Boolean,
    color: util.props.color,
    size: util.props.size,
    position: util.props.position,
    dismissible: util.props.Boolean,
    countDownDisdismis: util.props.Boolean,
    countDownSec: {
      ...util.props.UInt,
      default: 5,
    }
  },
  data() {
    return {
      isShow: this.show,
      dismissCountDownTimerId: null
    };
  },
  computed: {
    objClass: function() {
      let color = this.color ? `alert-${this.color}` : ''
      let showDismisLable = `${this.showDismisLable ? "alert-dismissible" : ""}`
      let size = ''
      if (this.size === 'lg') size = 'w-75'
      else if (this.size == 'sm') size = 'w-25'
      else size = 'w-50'
      return `${color} ${showDismisLable} ${size}`
    },
    objStyle: function() {
      let position = {};
      switch (this.position) {
        case "top-center":
          position = { left: `${document.body.offsetWidth / 4}px` };
          break;
        case "top-end":
          position = { right: 0 };
          break;
        case "bottom-start":
          position = { bottom: 0, left: 0 };
          break;
        case "bottom-center":
          position = { bottom: 0, left: `${document.body.offsetWidth / 4}px` };
          break;
        case "bottom-end":
          position = { bottom: 0, right: 0 };
          break;
      }
      return position
    },
    showDismisLable: function() {
      // 保证在任何时候弹出框都可以关闭
      return !this.countDownDisdismis || this.dismissible;
      //return this.dismissible
    },
  },
  watch: {
    show: function(newVal) {
      this.isShow = newVal;
    },
    "$slots.default": function(newVal, oldVal) {
      if (newVal !== oldVal) this.reset();
    },
  },
  created() {
    if (this.countDownDisdismis) this.countDown();
  },
  destroyed() {
    this.clearTimer();
  },
  methods: {
    alert: function() {
      this.$emit("alert");
      this.isShow = true;
      if (this.countDownDisdismis) this.countDown();
    },
    close: function() {
      this.$emit("close");
      this.isShow = false;
      this.clearTimer();
    },
    reset: async function() {
      await this.close();
      await this.alert();
    },
    clearTimer: function() {
      if (this.dismissCountDownTimerId)
        window.clearInterval(this.dismissCountDownTimerId);
    },
    countDown: function() {
      let countDownSec = Number(this.countDownSec);
      if (countDownSec < 1) return;
      // 每一次计时前都会先清空可能存在的计时器
      this.clearTimer();
      this.dismissCountDownTimerId = setInterval(() =>
        countDownSec < 1 ? this.close() : countDownSec--
      , 1000);
    }
  },
};
</script>
