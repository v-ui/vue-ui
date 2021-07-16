<template>
  <div>
    <h2>b-badge</h2>
    <hr>
    <div class="row my-1">
      <font class="col-1">
        default
      </font>
      <b-badge class="col-auto" />
    </div>
    <div class="row my-1">
      <font class="col-1">
        slot
      </font>
      <b-badge class="col-auto">text</b-badge>
    </div>
    <div class="row my-1">
      <font class="col-1">
        pill
      </font>
      <b-badge class="col-auto" pill>
        text
      </b-badge>
    </div>
    <div class="row my-1">
      <font class="col-1">
        color
      </font>
      <div class="col-11 p-0">
        <b-badge
          v-for="item in colors"
          :key="item + '1'"
          class="col-auto m-1"
          :color="item"
        />
        <br>
        <b-badge
          v-for="item in colors"
          :key="item + '2'"
          class="col-auto m-1"
          :color="item"
        >
          {{ item }}
        </b-badge>
      </div>
    </div>
  </div>
</template>

<script>
import variables from "@/components/util/variables.js";

import BBadge from "@/components/base/Badge/b-badge.vue";

export default {
  name: "BBadgeDemo",
  components: { BBadge },
  data() {
    return {
      colors: variables.base.color.base.filter(e => e)
    };
  }
};
</script>
