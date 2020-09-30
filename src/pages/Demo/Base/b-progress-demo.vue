<template>
  <div>
    <h2>b-progress</h2>
    <hr>
    <br>
    <div class="row py-1">
      <font class="col-1">
        range:
      </font>
      <b-range
        v-model.number="range"
        class="col-11"
      />
    </div>
    <h4>bar(default)</h4>
    <hr>
    <div class="row py-1">
      <font class="col-1">
        default:
      </font>
      <b-progress class="col-2" />
      <font class="col-1">
        value:
      </font>
      <b-progress
        class="col-2"
        :value="range"
      />
      <font class="col-1">
        hideValue:
      </font>
      <b-progress
        class="col-2"
        :value="range"
        hide-value
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        striped:
      </font>
      <b-progress
        class="col-2"
        :value="range"
        striped
      />
      <font class="col-1">
        animated:
      </font>
      <b-progress
        class="col-2"
        :value="range"
        striped
        animated
      />
      <font class="col-1">
        info:
      </font>
      <b-progress
        class="col-2"
        :value="range"
        info="info text"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        size(sm):
      </font>
      <b-progress
        class="col-2"
        :value="range"
        size="sm"
      />
      <font class="col-1">
        size(default):
      </font>
      <b-progress
        class="col-2"
        :value="range"
      />
      <font class="col-1">
        size(lg):
      </font>
      <b-progress
        class="col-2"
        :value="range"
        size="lg"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        state:
      </font>
      <font class="col-1">
        false(default):
      </font>
      <b-progress
        class="col-4"
        :color="colorArr1"
        :value="range"
      />
      <font class="col-1">
        true:
      </font>
      <b-progress
        class="col-4"
        :color="colorArr2"
        :value="range"
        state
      />
    </div>
    <br>
    <h4>circle</h4>
    <hr>
    <div class="row py-1">
      <font class="col-1">
        default:
      </font>
      <b-progress
        class="col-2"
        circle
      />
      <font class="col-1">
        value:
      </font>
      <b-progress
        class="col-2"
        circle
        :value="range"
      />
      <font class="col-1">
        hideValue:
      </font>
      <b-progress
        class="col-2"
        circle
        :value="range"
        hide-value
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        info:
      </font>
      <b-progress
        class="col-2"
        circle
        :value="range"
        info="info text"
      />
      <font class="col-1">
        src:
      </font>
      <b-progress
        class="col-2"
        circle
        :value="range"
        hide-value
        :src="src"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        size(sm):
      </font>
      <b-progress
        class="col-2"
        circle
        :value="range"
        info="info text"
        size="sm"
      />
      <font class="col-1">
        size(default):
      </font>
      <b-progress
        class="col-2"
        circle
        :value="range"
        info="info text"
      />
      <font class="col-1">
        size(lg):
      </font>
      <b-progress
        class="col-2"
        circle
        :value="range"
        info="info text"
        size="lg"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        state:
      </font>
      <font class="col-2" />
      <font class="col-1">
        false(default):
      </font>
      <b-progress
        class="col-2"
        circle
        :color="colorArr1"
        :value="range"
      />
      <font class="col-1">
        true:
      </font>
      <b-progress
        class="col-2"
        circle
        :color="colorArr2"
        state
        :value="range"
      />
    </div>
    <br>
    <br>
    <h4>关于 state</h4>
    <hr>
    <pre>
      1. 当 color 为 颜色值时（最普遍用法），显示单色
      2. 当 color 为 数组时（格式为；{ value: value（正整数0-100）, color: color（string 颜色值） }），显示模式与 state 属性有关
        1. 当 state 为 false（default） 时，数组应为如下 colorArr1，颜色会根据数组中的数据分段显示，value 值小于相应分段最小值时，该分段不显示
        2. 当 state 为 true 时，数组应为如下 colorArr2，颜色会在 value 处在相应区间的颜色
      <code>
      colorArr1: [
        {value: 10, color: 'info'},
        {value: 20, color: 'danger'},
        {value: 20, color: 'warning'},
        {value: 30, color: 'secondary'},
        {value: 19, color: 'primary'},
        {value: 1, color: 'success'},
      ],
      1. value 的值为每一段的长度，应在 0-100 之间
      2. value 的值的总和应为 100，若未达到 100 未达到部分会使用默认颜色（‘primary’），若超出，超出部分会被自动忽略
      </code>
      <code>
      colorArr2: [
        {value: 10, color: 'info'},
        {value: 30, color: 'danger'},
        {value: 50, color: 'warning'},
        {value: 80, color: 'secondary'},
        {value: 99, color: 'primary'},
        {value: 100, color: 'success'},
      ],
      1. value 的值应从小到大排序，否则会根据 value 的值从小到大重新排序
      2. value 的值应从 0-100 全覆盖，如未全覆盖，最后一段会使用默认颜色（‘primary’），若超出，超出部分会被自动忽略
      </code>
    </pre>
    <h4>color</h4>
    <hr>
    <div class="row py-1">
      <font class="col-1">
        color:
      </font>
      <div class="col-11">
        <template v-for="item in colors">
          {{ item || '(default)' }}:
          <b-progress
            :key="item"
            class="py-1"
            :color="item"
            value="100"
            show-value
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import variables from "@/components/util/variables.js";

import img from '@/assets/logo.png'
import BProgress from "@/components/base/Bootstrap/Progress/b-progress.vue";
import BRange from '@/components/base/Bootstrap/Form/b-range.vue'

export default {
  name: "BProgressDemo",
  components: { BProgress, BRange },
  data() {
    return {
      src: img,
      range: 80,
      colors: variables.base.color.bg,
      list0: [
        { value: 0 },
        { color: "info", value: 0 },
        { color: "danger", value: 0 },
        { color: "info", value: 0, showValue: true },
      ],
      colorArr1: [
        {value: 10, color: 'info'},
        {value: 20, color: 'danger'},
        {value: 20, color: 'warning'},
        {value: 30, color: 'secondary'},
        {value: 19, color: 'primary'},
        {value: 1, color: 'success'},
      ],
      colorArr2: [
        {value: 10, color: 'info'},
        {value: 30, color: 'danger'},
        {value: 50, color: 'warning'},
        {value: 80, color: 'secondary'},
        {value: 99, color: 'primary'},
        {value: 100, color: 'success'},
      ],
      value: 80,
    };
  },
};
</script>
