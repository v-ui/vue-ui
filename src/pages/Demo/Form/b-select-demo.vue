<template>
  <div class="Form">
    <h2>b-select</h2>
    <hr>
    <h4>基础属性</h4>
    <hr>
    <div class="row">
      <font class="col-1">default:</font>
      <b-select class="col-5" :list="list" />
      <b-select class="col-5" :list="list" multiple />
    </div>
    <div class="row">
      <font class="col-1">option group:</font>
      <b-select class="col-5" :list="list3" />
      <b-select class="col-5" :list="list3" multiple />
    </div>
    <div class="row">
      <font class="col-1">value:</font>
      <b-select class="col-5" :list="list" :value="value" />
      <b-select class="col-5" :list="list" :value="value1" multiple />
    </div>
    <div class="row">
      <font class="col-1">disabled:</font>
      <b-select class="col-5" disabled />
      <b-select class="col-5" :list="list" disabled multiple />
    </div>
    <div class="row">
      <font class="col-1">hideNull:</font>
      <b-select class="col-5" :list="list" hideNull />
      <b-select class="col-5" :list="list" hideNull multiple />
    </div>
    <div class="row">
      <font class="col-1">info:</font>
      <b-select class="col-5" :list="list" info="info text" />
      <b-select class="col-5" :list="list" info="info text" multiple />
    </div>
    <div class="row">
      <font class="col-1">row:</font>
      <b-select class="col-10" :list="list2" row="5" multiple />
    </div>
    <div class="row">
      <font class="col-1">size(lg):</font>
      <b-select class="col-5" :list="list" size="lg" />
      <b-select class="col-5" :list="list" size="lg" multiple />
    </div>
    <div class="row">
      <font class="col-1">size(sm):</font>
      <b-select class="col-5" :list="list" size="sm" />
      <b-select class="col-5" :list="list" size="sm" multiple />
    </div>
    <br>
    <h4>v-model</h4>
    <hr>
    <div class="row">
      <font class="col-1">v-model:</font>
      <div class="col-10 row">
        <b-select class="col-3" :list="list" v-model="value" :info="'selected: ' + value" />
        <b-select
          v-model="value1"
          class="col-3"
          :list="list"
          :info="'selected: ' + value1"
          multiple
        />
        <b-select class="col-3" :list="list3" v-model="value2" :info="'selected: ' + value2" />
        <b-select
          v-model="value3"
          class="col-3"
          :list="list3"
          :info="'selected: ' + value3"
          multiple
        />
      </div>
    </div>
    <h4>校验</h4>
    <hr>
    <div class="row">
      <font class="col-1">required:</font>
      <b-select class="col-5" :list="list" required />
      <b-select class="col-5" :list="list" required multiple />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error:
      </font>
      <b-select class="col-5" :list="list" invalidInfo="error" validInfo="success" required />
      <b-select
        class="col-5"
        :list="list"
        invalidInfo="error"
        validInfo="success"
        required
        multiple
      />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error(2):
      </font>
      <b-select class="col-5" :list="list" required>
        <template #invalid>you can add anlything invalidInfo or DOM</template>
        <template #valid>you can add anlything validInfo or DOM</template>
      </b-select>
      <b-select class="col-5" :list="list" required multiple>
        <template #invalid>you can add anlything invalidInfo or DOM</template>
        <template #valid>you can add anlything validInfo or DOM</template>
      </b-select>
    </div>
  </div>
</template>

<script>
import BSelect from "@/components/base/Bootstrap/Form/Select/b-select.vue";

export default {
  name: "b-select-demo",
  components: { BSelect },
  data() {
    return {
      list: [
        { value: "option1", text: "option1" },
        { value: "option2", text: "option2" },
        { value: "disabled option", text: "disabled option", disabled: true }
      ],
      list2: [
        { value: "option1", text: "option1" },
        { value: "option2", text: "option2" },
        { value: "option3", text: "option3" },
        { value: "option4", text: "option4" },
        { value: "option5", text: "option5" },
        { value: "option6", text: "option6" },
        { value: "option7", text: "option7" },
        { value: "disabled option", text: "disabled option", disabled: true }
      ],
      list3: [
        {
          label: "option group 1",
          children: [
            { value: "option1-1", text: "option1-1" },
            { value: "option1-2", text: "option1-2" },
            { value: "option1-3", text: "option1-3" }
          ]
        },
        {
          label: "option group 2",
          disabled: true,
          children: [
            { value: "option2-1", text: "option2-1" },
            { value: "option2-2", text: "option2-2" },
            { value: "option2-3", text: "option2-3" }
          ]
        },
        { value: "option3", text: "option3" },
        { value: "disabled option", text: "disabled option", disabled: true }
      ],

      value: "option1",
      value1: ["option1", "option2"],
      value2: "option1-1",
      value3: ["option1-1", "option2-2"]
    };
  }
};
</script>

