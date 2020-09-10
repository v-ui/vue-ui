<template>
  <div>
    <h2>b-progress</h2>
    <hr />
    <div class="row py-1">
      <font class="col-1">default:</font>
      <font class="col-1">one:</font>
      <b-progress class="col-4" />
      <font class="col-1">list:</font>
      <b-progress class="col-4" :list="list0" />
    </div>
    <div class="row py-1">
      <font class="col-1">value:</font>
      <font class="col-1">one:</font>
      <b-progress class="col-4" value="80" />
      <font class="col-1">list:</font>
      <b-progress class="col-4" :list="list" />
    </div>
    <div class="row py-1">
      <font class="col-1">status:</font>
      <font class="col-1">line(default):</font>
      <b-progress class="col-4" value="80" />
      <font class="col-1">circle:</font>
      <b-progress class="col-4" status="circle" value="80" />
    </div>
    <div class="row py-1">
      <font class="col-1">striped:</font>
      <font class="col-1">one:</font>
      <b-progress class="col-4" value="80" striped />
      <font class="col-1">list:</font>
      <b-progress class="col-4" :list="list" striped />
    </div>
    <div class="row py-1">
      <font class="col-1">animated:</font>
      <font class="col-1">one:</font>
      <b-progress class="col-4" value="80" striped animated />
      <font class="col-1">list:</font>
      <b-progress class="col-4" :list="list" striped animated />
    </div>
    <div class="row py-1">
      <font class="col-1">info:</font>
      <font class="col-1">one:</font>
      <b-progress class="col-4" value="80" info="info text" />
      <font class="col-1">list:</font>
      <b-progress class="col-4" :list="list" info="info text" />
    </div>
    <div class="row py-1">
      <font class="col-1">size(sm):</font>
      <font class="col-1">one:</font>
      <b-progress class="col-4" value="80" size="sm" />
      <font class="col-1">list:</font>
      <b-progress class="col-4" :list="list" size="sm" />
    </div>
    <div class="row py-1">
      <font class="col-1">size(default):</font>
      <font class="col-1">one:</font>
      <b-progress class="col-4" value="80" />
      <font class="col-1">list:</font>
      <b-progress class="col-4" :list="list" />
    </div>
    <div class="row py-1">
      <font class="col-1">size(lg):</font>
      <font class="col-1">one:</font>
      <b-progress class="col-4" value="80" size="lg" />
      <font class="col-1">list:</font>
      <b-progress class="col-4" :list="list" size="lg" />
    </div>
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

export default {
  name: "b-progress-demo",
  components: { BProgress },
  data() {
    return {
      colors: variables.base.color.bg,
      list0: [
        { value: 0 },
        { color: "info", value: 0 },
        { color: "danger", value: 0 },
        { color: "info", value: 0, showValue: true },
      ],
      list: [
        { value: 5 },
        { color: "info", value: 10 },
        { color: "danger", value: 15 },
        { color: "info", value: 20, showValue: true },
      ],
      value: 80,
    };
  },
};
</script>
