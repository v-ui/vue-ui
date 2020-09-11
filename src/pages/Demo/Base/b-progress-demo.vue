<template>
  <div>
    <h2>b-progress</h2>
    <hr />
    <br>
    <div class="row py-1">
      <font class="col-1">range:</font>
      <b-range class="col-11" v-model.number="range" />
    </div>
    <h4>基本属性</h4>
    <hr>
    <div class="row py-1">
      <font class="col-1">default:</font>
      <font class="col-1">one:</font>
      <b-progress class="col-4" />
      <font class="col-1">list:</font>
      <b-progress class="col-4" :color="colorArr" :value="range" />
    </div>
    <div class="row py-1">
      <font class="col-1">value:</font>
      <font class="col-1">one:</font>
      <b-progress class="col-4" :value="range" />
      <font class="col-1">list:</font>
      <b-progress class="col-4" :color="colorArr" :value="range" />
    </div>
    <div class="row py-1">
      <font class="col-1">striped:</font>
      <font class="col-1">one:</font>
      <b-progress class="col-4" :value="range" striped />
      <font class="col-1">list:</font>
      <b-progress class="col-4" :color="colorArr" :value="range" striped />
    </div>
    <div class="row py-1">
      <font class="col-1">animated:</font>
      <font class="col-1">one:</font>
      <b-progress class="col-4" :value="range" striped animated />
      <font class="col-1">list:</font>
      <b-progress class="col-4" :color="colorArr" :value="range" striped animated />
    </div>
    <div class="row py-1">
      <font class="col-1">type:</font>
      <font class="col-1">default(default):</font>
      <b-progress class="col-4" :color="colorArr" :value="range" type="default" />
      <font class="col-1">state:</font>
      <b-progress class="col-4" :color="colorArr" :value="range" type="state" />
    </div>
    <div class="row py-1">
      <font class="col-1">info:</font>
      <font class="col-1">one:</font>
      <b-progress class="col-4" :value="range" info="info text" />
      <font class="col-1">list:</font>
      <b-progress class="col-4" :color="colorArr" :value="range" info="info text" />
    </div>
    <div class="row py-1">
      <font class="col-1">size(sm):</font>
      <font class="col-1">one:</font>
      <b-progress class="col-4" :value="range" size="sm" />
      <font class="col-1">list:</font>
      <b-progress class="col-4" :color="colorArr" :value="range" size="sm" />
    </div>
    <div class="row py-1">
      <font class="col-1">size(default):</font>
      <font class="col-1">one:</font>
      <b-progress class="col-4" :value="range" />
      <font class="col-1">list:</font>
      <b-progress class="col-4" :color="colorArr" :value="range" />
    </div>
    <div class="row py-1">
      <font class="col-1">size(lg):</font>
      <font class="col-1">one:</font>
      <b-progress class="col-4" :value="range" size="lg" />
      <font class="col-1">list:</font>
      <b-progress class="col-4" :color="colorArr" :value="range" size="lg" />
    </div>
    <br>
    <h4>circle</h4>
    <hr>
    <div class="row py-1">
      <font class="col-1">default:</font>
      <b-progress class="col-2" status="circle" />
      <font class="col-1">value:</font>
      <b-progress class="col-2" status="circle" :value="range"/>
      <font class="col-1">info:</font>
      <b-progress class="col-2" status="circle" :value="range" info="info text" />
    </div>
    <div class="row py-1">
      <font class="col-1">size(sm):</font>
      <b-progress class="col-2" status="circle" :value="range" info="info text" size="sm" />
      <font class="col-1">size(default):</font>
      <b-progress class="col-2" status="circle" :value="range" info="info text" />
      <font class="col-1">size(lg):</font>
      <b-progress class="col-2" status="circle" :value="range" info="info text" size="lg" />
    </div>
    <br>
    <h4>color</h4>
    <hr>
    <div class="row py-1">
      <font class="col-1">color:</font>
      <div class="col-11">
        <template v-for="item in colors">
          {{ item }}:
          <b-progress :key="item" class="py-1" :color="item" value="100" showValue />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import variables from "@/components/util/variables.js";

import BProgress from "@/components/base/Bootstrap/Progress/b-progress.vue";

import BRange from '@/components/base/Bootstrap/Form/b-range.vue'

export default {
  name: "b-progress-demo",
  components: { BProgress, BRange },
  data() {
    return {
      range: 80,
      colors: variables.base.color.bg,
      list0: [
        { value: 0 },
        { color: "info", value: 0 },
        { color: "danger", value: 0 },
        { color: "info", value: 0, showValue: true },
      ],
      colorArr: [
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
