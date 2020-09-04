<template>
  <div>
    <div class="row mx-0 align-items-center">
      <div class="progress col px-0" :style="objStyle">
        <template v-if="list && list.length > 0">
          <b-progress-bar
            v-for="(item, index) in list"
            :key="index"
            :striped="striped"
            :value="item.value"
            :animated="animated"
            :show-value="showValue"
            :color="item.color || color"
          />
        </template>
        <b-progress-bar
          v-else
          :color="color"
          :value="value"
          :striped="striped"
          :animated="animated"
          :show-value="showValue"
        />
      </div>
      <label class="col-1 m-0 p-0 pl-1">{{ tweenedNumber }}%</label>
    </div>
    <b-info :info="info" />
  </div>
</template>

<script>
import TweenLite from "gsap";
import util from "@/components/util/index.js";

import BProgressBar from "@/components/base/Bootstrap/Progress/b-progress-bar.vue";
import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-progress",
  components: { BProgressBar, BInfo },
  props: {
    list: util.props.Array,
    color: util.props.color,
    info: util.props.String,
    size: util.props.size,
    value: {
      ...util.props.UNumber,
      validator: value => util.props.UNumber.validator(value) && value <= 100,
    },
    showValue: util.props.Boolean,
    striped: util.props.Boolean,
    animated: util.props.Boolean
  },
  data() {
    return {
      total: 0,
      tweenedNumber: 0,
    }
  },
  computed: {
    objStyle: function() {
      let height = '10'
      if (this.size === 'sm') height = '5'
      else if (this.size === 'lg') height = ''
      return {height: `${height}px`}
    }
  },
  watch: {
    value: function(val, old) {
      this.showAnimat(val, old);
    },
    tweenedNumber: function() {
      this.$emit("animating");
    }
  },
  mounted() {
    this.total = this.list && this.list.length > 0
        ? this.list.reduce((acc, cur) => acc.value && cur.value ? acc.value + cur.value : cur.value)
        : this.value
    this.showAnimat(this.total)
  },
  methods: {
    showAnimat: function(number, oldNumber = 0) {
      this.tweenedNumber = oldNumber;
      TweenLite.to(this.$data, 1, { tweenedNumber: number });
    }
  },
};
</script>
