<template>
  <div>
    <h2>b-alert</h2>
    <hr>
    <div class="row my-5">
      <font class="col-1">
        default
      </font>
      <b-alert show>
        default Alert
      </b-alert>
    </div>
    <div class="row my-5">
      <font class="col-1">
        dismissible
      </font>
      <b-alert
        show
        dismissible
      >
        dismissible Alert
      </b-alert>
    </div>
    <div class="row my-5">
      <font class="col-1">
        countDownDisdismis
      </font>
      <b-alert
        show
        count-down-disdismis
      >
        countDownDisdismis Alert
      </b-alert>
    </div>
    <div class="row my-5">
      <font class="col-1">
        countDownSec
      </font>
      <b-alert
        show
        count-down-sec="10"
      >
        countDownSec Alert
      </b-alert>
    </div>
    <div class="row my-5">
      <font class="col-1">
        position
      </font>
      <b-radio-group
        v-model="position"
        name="position"
        :list="list"
      />
      <b-alert
        :position="position.value"
        show
      >
        {{ position.value }}
      </b-alert>
    </div>
    <div class="row my-5">
      <font class="col-1">
        size
      </font>
    </div>
    <div class="row my-5">
      <font class="col-1">
        default
      </font>
      <b-alert show>
        default size
      </b-alert>
    </div>
    <div class="row my-5">
      <font class="col-1">
        lg
      </font>
      <b-alert
        size="lg"
        show
      >
        lg size
      </b-alert>
    </div>
    <div class="row my-5">
      <font class="col-1">
        sm
      </font>
      <b-alert
        size="sm"
        show
      >
        sm size
      </b-alert>
    </div>
    <div class="row my-5">
      <font class="col-1">
        link
      </font>
      <b-alert show>
        <b-alert-link href="#">
          alert link
        </b-alert-link>
      </b-alert>
    </div>
    <div class="row my-5">
      <font class="col-1">
        header and footer
      </font>
      <b-alert show>
        <template #header>
          header text
        </template>
        info
        <template #footer>
          footer text
        </template>
      </b-alert>
    </div>
    <h2>color</h2>
    <hr>
    <div
      v-for="color in colors"
      :key="color"
      class="row my-5"
    >
      <font class="col-1">
        {{ color }}
      </font>
      <b-alert
        :color="color"
        show
      >
        {{ color }}
      </b-alert>
    </div>
  </div>
</template>

<script>
import BAlert from "@/components/base/Alert/b-alert.vue";
import BAlertLink from "@/components/base/Alert/b-alert-link.vue";

import BRadioGroup from "@/components/form/Radio/b-radio-group.vue";

import variables from "@/components/util/variables.js";
export default {
  name: "BAlertDemo",
  components: { BAlert, BAlertLink, BRadioGroup },
  data() {
    return {
      position: { value: "top-center" },
      list: variables.base.position.default.map(e => ({ value: e, label: e })),
      colors: variables.base.color.bg
    };
  }
};
</script>
