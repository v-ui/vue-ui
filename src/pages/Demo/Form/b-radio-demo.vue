<template>
  <div>
    <h2>b-radio</h2>
    <hr>
    <h4>基础属性</h4>
    <hr>
    <div class="row">
      <font class="col-1">default:</font>
      <b-radio class="col-11" />
    </div>
    <div class="row">
      <font class="col-1">checked:</font>
      <b-radio class="col-11" :checked="Boolean(true)" />
    </div>
    <div class="row">
      <font class="col-1">disabled:</font>
      <b-radio class="col-11" disabled />
    </div>
    <div class="row">
      <font class="col-1">value:</font>
      <b-radio class="col-11" value="value" />
    </div>
    <div class="row">
      <font class="col-1">label:</font>
      <b-radio class="col-11" label="label text" />
    </div>
    <div class="row">
      <font class="col-1">inline:</font>
      <b-radio class="col-auto" label="radio1" inline />
      <b-radio class="col-auto" label="radio2" inline />
      <b-radio class="col-auto" label="radio3" inline />
      <b-radio class="col-auto" label="radio4" inline />
    </div>
    <div class="row">
      <font class="col-1">name:</font>
      <b-radio class="col-auto" label="radio1" name="inline-radio" />
      <b-radio class="col-auto" label="radio2" name="inline-radio" />
      <b-radio class="col-auto" label="radio3" name="inline-radio" />
      <b-radio class="col-auto" label="radio4" name="inline-radio" />
    </div>
    <div class="row">
      <font class="col-1">info:</font>
      <b-radio class="col-11" label="label text" info="a radio help info" />
    </div>
    <br>
    <h4>v-model</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        v-model:
        <br>
        ({{ checked }})
      </font>
      <b-radio class="col-auto" v-model="checked" value="one" label="one" name="v-model-radio" />
      <b-radio class="col-auto" v-model="checked" value="two" label="two" name="v-model-radio" />
    </div>
    <hr>
    <h2>b-radio-group</h2>
    <hr>
    <h4>基础属性</h4>
    <hr>
    <hr>
    <div class="row">
      <font class="col-1">default:</font>
      <b-radio-group class="col-11" :list="list" name="group-default" />
    </div>
    <div class="row">
      <font class="col-1">value:</font>
      <b-radio-group class="col-11" :list="list" name="group-value" :value="value" />
    </div>
    <div class="row">
      <font class="col-1">disabled:</font>
      <b-radio-group class="col-11" :list="list" name="group-disabled" disabled inline />
    </div>
    <div class="row">
      <font class="col-1">inline:</font>
      <b-radio-group class="col-11" :list="list" name="group-inline" inline />
    </div>
    <div class="row">
      <font class="col-1">info:</font>
      <b-radio-group class="col-11" :list="list" name="group-info" info="info message" inline />
    </div>
    <br>
    <h4>v-model</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        v-model:
        <br>
        ({{value}})
      </font>
      <b-radio-group class="col-11" :list="list" name="group-v-model" v-model="value" inline />
    </div>
    <br>
    <h4>校验</h4>
    <hr>
    <div class="row">
      <font class="col-1">required:</font>
      <b-radio-group class="col-11" :list="list" name="group-required" required />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error:
      </font>
      <b-radio-group
        class="col-11"
        :list="list"
        name="group-valide-one"
        required
        invalidInfo="error"
        validInfo="success"
      />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error(2):
      </font>
      <b-radio-group class="col-11" :list="list" name="group-valide-two" required>
        <template #invalid>you can add anlything invalidInfo or DOM</template>
        <template #valid>you can add anlything validInfo or DOM</template>
      </b-radio-group>
    </div>
    <hr>
    <h2>b-radio-button-group</h2>
    <hr>
    <div class="row">
      <font class="col-1">default:</font>
      <b-radio-button-group name="default-button-group" :list="buttongrouplist" />
    </div>
    <div class="row">
      <font class="col-1">disabled:</font>
      <b-radio-button-group name="disabled-button-group" :list="buttongrouplist" disabled />
    </div>
    <div class="row">
      <font class="col-1">value:</font>
      <b-radio-button-group name="value-button-group" :list="buttongrouplist" value="value1" />
    </div>
    <div class="row">
      <font class="col-1">info:</font>
      <b-radio-button-group
        name="info-button-group"
        :list="buttongrouplist"
        info="button group info"
      />
    </div>
    <div class="row">
      <font class="col-1">
        v-model:
        <br>
        ({{buttongroupvalue}})
      </font>
      <b-radio-button-group
        v-model="buttongroupvalue"
        name="v-model-button-group"
        :list="buttongrouplist"
      />
    </div>
  </div>
</template>

<script>
import BRadio from "@/components/base/Bootstrap/Form/Radio/b-radio.vue";
import BRadioGroup from "@/components/base/Bootstrap/Form/Radio/b-radio-group.vue";
import BRadioButtonGroup from "@/components/base/Bootstrap/Form/Radio/b-radio-button-group.vue";

export default {
  name: "b-radio-demo",
  components: { BRadio, BRadioGroup, BRadioButtonGroup, },
  data() {
    return {
      checked: "one",
      list: [
        { value: "value1", label: "value1" },
        { value: "value2", label: "value2" },
        { value: "disabled radio", label: "disabled radio", disabled: true }
      ],
      value: { value: "value2", label: "value2" },
      buttongrouplist: [
        { value: "value1", label: "value1" },
        { value: "value2", label: "value2" },
        { value: "value3", label: "value3" },
        { value: "value4", label: "value4", disabled: true }
      ],
      buttongroupvalue: "value2"
    };
  }
};
</script>
