<template>
  <div>
    <h2>b-button</h2>basic-button 中的属性在 basic-reset basic-submit 中是通用的
    <hr>
    <div class="row py-1">
      <font class="col-1">default:</font>
      <font class="mx-1">button:</font>
      <basic-button />
      <font class="mx-1">a:</font>
      <basic-button href="#" />
    </div>
    <div class="row py-1">
      <font class="col-1">active:</font>
      <basic-button active />
    </div>
    <div class="row py-1">
      <font class="col-1">disabled:</font>
      <basic-button disabled />
    </div>
    <div class="row py-1">
      <font class="col-1">value:</font>
      <basic-button value="button text" />
    </div>
    <div class="row py-1">
      <font class="col-1">outline:</font>
      <basic-button value="button text" outline />
    </div>
    <div class="row py-1">
      <font class="col-1">block:</font>
      <basic-button class="col-10" value="button text" block />
    </div>
    <div class="row py-1">
      <font class="col-1">size:</font>
      <font class="col-auto">default:</font>
      <basic-button value="text" />
      <font class="col-auto">lg:</font>
      <basic-button value="lg size" size="lg" />
      <font class="col-auto">sm:</font>
      <basic-button value="sm size" size="sm" />
    </div>
    <div class="row py-1">
      <font class="col-1">loading:</font>
      <font class="col-auto">default:</font>
      <basic-button loading />
      <font class="col-auto">outline:</font>
      <basic-button loading outline />
      <font class="col-auto">lg size:</font>
      <basic-button loading size="lg" />
      <font class="col-auto">sm size:</font>
      <basic-button loading size="sm" />
    </div>
    <div class="row my-1">
      <font class="col-1">color:</font>
      <div class="col-11">
        <font class="col-1">default:</font>
        <basic-button
          v-for="item in colors"
          :key="'default-' + item"
          class="m-1"
          :color="item"
        >{{ item }}</basic-button>
        <br>
        <font class="col-1">outline:</font>
        <basic-button
          v-for="item in colors"
          :key="'outline-' + item"
          class="m-1"
          :color="item"
          outline
        >{{ item }}</basic-button>
      </div>
    </div>
    <h2>basic-reset</h2>
    <font class="text-danger">不建议使用 使用 v-model 绑定数据的控件均不能正确响应 b-reset</font>
    <hr>
    <div class="row py-1">
      <font class="col-1">default:</font>
      <basic-reset />
    </div>
    <h2>b-submit</h2>
    <hr>
    <div class="row py-1">
      <font class="col-1">default:</font>
      <basic-submit />
    </div>
    <h2>button group</h2>
    <hr>
    <div class="row py-1">
      <font class="col-1">default:</font>
      <b-button-group>
        <basic-button value="button text" />
        <basic-button value="button text" />
        <basic-button value="button text" />
      </b-button-group>
    </div>
    <div class="row py-1">
      <font class="col-1">vertical:</font>
      <b-button-group vertical>
        <basic-button value="button text" />
        <basic-button value="button text" />
        <basic-button value="button text" />
      </b-button-group>
    </div>
    <div class="row py-1">
      <font class="col-1">size:</font>
      <font class="col-1">default:</font>
      <b-button-group>
        <basic-button value="button text" />
        <basic-button value="button text" />
        <basic-button value="button text" />
      </b-button-group>
    </div>
    <div class="row py-1">
      <font class="col-1" />
      <font class="col-1">lg:</font>
      <b-button-group size="lg">
        <basic-button value="button text" />
        <basic-button value="button text" />
        <basic-button value="button text" />
      </b-button-group>
    </div>
    <div class="row py-1">
      <font class="col-1" />
      <font class="col-1">sm:</font>
      <b-button-group size="sm">
        <basic-button value="button text" />
        <basic-button value="button text" />
        <basic-button value="button text" />
      </b-button-group>
    </div>
    <h2>button toolbar</h2>
    <hr>
    <b-button-toolbar>
      <b-button-group class="mr-2">
        <basic-button value="button text" />
        <basic-button value="button text" />
        <basic-button value="button text" />
      </b-button-group>
      <b-button-group>
        <basic-button value="button text" />
        <basic-button value="button text" />
        <basic-button value="button text" />
      </b-button-group>
    </b-button-toolbar>
  </div>
</template>

<script>
import variables from "@/components/util/variables.js";

import BasicButton from "@/components/Basic/Button/basic-button.vue";
import BasicReset from "@/components/Basic/Button/basic-reset.vue";
import BasicSubmit from "@/components/Basic/Button/basic-submit.vue";

import BButtonGroup from "@/components/base/Bootstrap/ButtonGroup/b-button-group.vue";
import BButtonToolbar from "@/components/base/Bootstrap/ButtonGroup/b-btn-toolbar.vue";

export default {
  name: "b-button-demo",
  components: { BasicButton, BasicReset, BasicSubmit, BButtonGroup, BButtonToolbar },
  data() {
    return {
      colors: variables.base.color.base,
      BTextValue: "BTextValue",
      list: [
        { value: "value1", text: "text1" },
        { value: "value2", text: "text2" },
        { value: "value3", text: "text3" },
        { value: "value4", text: "text4" },
        { value: "value5", text: "text5" },
        { value: "value6", text: "disabled", disabled: true }
      ]
    };
  }
};
</script>
