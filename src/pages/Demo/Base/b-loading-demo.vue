<template>
  <div>
    <h2>b-loading</h2>
    <hr>
    <div class="row py-1">
      <font class="col-1">
        default:
      </font>
      <b-loading />
    </div>
    <div class="row py-1">
      <font class="col-1">
        status:
      </font>
      <font class="col-1">
        border
        <br>(default):
      </font>
      <b-loading status="border" />
      <font class="col-1">
        grow:
      </font>
      <b-loading status="grow" />
    </div>
    <div class="row my-1">
      <font class="col-1">
        size:
      </font>
      <font class="col-1">
        (default):
      </font>
      <b-loading />
      <font class="col-1">
        sm:
      </font>
      <div class="col-auto">
        <b-loading size="sm" />
        <b-loading
          size="sm"
          status="grow"
        />
      </div>
    </div>
    <div class="row py-1">
      <font class="col-1">
        color:
      </font>
      <div class="col-11">
        <div class="row">
          <div
            v-for="item in colors"
            :key="item"
            class="col-1"
          >
            <b-loading :color="item" />
            <b-loading
              :color="item"
              status="grow"
            />
          </div>
        </div>
        <div class="row">
          <font
            v-for="item in colors"
            :key="item"
            class="col-1 text-wrap"
          >
            {{ item }}
          </font>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import variables from "@/components/util/variables.js";

import BLoading from "@/components/base/Loading/b-loading.vue";

export default {
  name: "BLoadingDemo",
  components: { BLoading },
  data() {
    return {
      colors: variables.base.color.text
    };
  }
};
</script>
