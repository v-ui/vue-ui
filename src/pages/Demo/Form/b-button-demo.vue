<template>
  <div>
    <h2>b-button</h2>
    <hr>
    <div class="row py-1">
      <font class="col-1">
        default:
      </font>
      <font class="col-1">
        button:
      </font>
      <basic-button class="col-auto" />
      <font class="col-1">
        a:
      </font>
      <basic-button class="col-auto" href="#" />
    </div>
    <div class="row py-1">
      <font class="col-1">
        type:
      </font>
      <font class="col-1">
        button(default):
      </font>
      <basic-button class="col-auto" type="button" />
      <font class="col-1">
        submit:
      </font>
      <basic-button class="col-auto" type="submit" />
      <font class="col-1">
        reset:
      </font>
      <basic-button class="col-auto" type="reset" />
    </div>
    <div class="row py-1">
      <font class="col-1">
        active:
      </font>
      <basic-button class="col-auto" active />
    </div>
    <div class="row py-1">
      <font class="col-1">
        disabled:
      </font>
      <basic-button class="col-auto" disabled />
    </div>
    <div class="row py-1">
      <font class="col-1">
        value:
      </font>
      <basic-button class="col-auto" value="button text" />
    </div>
    <div class="row py-1">
      <font class="col-1">
        outline:
      </font>
      <basic-button
        class="col-auto"
        value="button text"
        outline
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        size(default):
      </font>
      <basic-button class="col-auto" value="text" />
    </div>
    <div class="row py-1">
      <font class="col-1">
        size(lg):
      </font>
      <basic-button
        class="col-auto"
        value="lg size"
        size="lg"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        size(sm):
      </font>
      <basic-button
        class="col-auto"
        value="sm size"
        size="sm"
      />
    </div>
    <div class="row my-1">
      <font class="col-1">
        color:
      </font>
      <div class="col-11">
        <font class="col-1">
          default:
        </font>
        <basic-button
          v-for="item in colors"
          :key="'default-' + item"
          class="m-1"
          :color="item"
        >
          {{ item }}
        </basic-button>
        <br>
        <font class="col-1">
          outline:
        </font>
        <basic-button
          v-for="item in colors"
          :key="'outline-' + item"
          class="m-1"
          :color="item"
          outline
        >
          {{ item }}
        </basic-button>
      </div>
    </div>
    <h2>button group</h2>
    <hr>
    <div class="row py-1">
      <font class="col-1">
        default:
      </font>
      <b-button-group class="col-auto">
        <basic-button value="button text" />
        <basic-button value="button text" />
        <basic-button value="button text" />
      </b-button-group>
    </div>
    <div class="row py-1">
      <font class="col-1">
        vertical:
      </font>
      <b-button-group class="col-auto" vertical>
        <basic-button value="button text" />
        <basic-button value="button text" />
        <basic-button value="button text" />
      </b-button-group>
    </div>
    <div class="row py-1">
      <font class="col-1">
        size:
      </font>
      <font class="col-1">
        default:
      </font>
      <b-button-group class="col-auto">
        <basic-button value="button text" />
        <basic-button value="button text" />
        <basic-button value="button text" />
      </b-button-group>
    </div>
    <div class="row py-1">
      <font class="col-1" />
      <font class="col-1">
        lg:
      </font>
      <b-button-group class="col-auto" size="lg">
        <basic-button value="button text" />
        <basic-button value="button text" />
        <basic-button value="button text" />
      </b-button-group>
    </div>
    <div class="row py-1">
      <font class="col-1" />
      <font class="col-1">
        sm:
      </font>
      <b-button-group class="col-auto" size="sm">
        <basic-button value="button text" />
        <basic-button value="button text" />
        <basic-button value="button text" />
      </b-button-group>
    </div>
    <h2>button toolbar</h2>
    <hr>
    <b-button-toolbar class="col-auto">
      <b-button-group class="me-2">
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

import BasicButton from "@/components/basic/Button/basic-button.vue";

import BButtonGroup from "@/components/basic/Button/basic-button-group.vue";
import BButtonToolbar from "@/components/basic/Button/basic-button-toolbar.vue";

export default {
  name: "BButtonDemo",
  components: { BasicButton, BButtonGroup, BButtonToolbar },
  data() {
    return {
      colors: [...variables.base.color.base, 'link'],
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
