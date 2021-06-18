<template>
  <div>
    <h2>b-radio</h2>
    <hr>
    <h4>基础属性</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
      </font>
      <div class="col-11">
        <b-radio />
      </div>

    </div>
    <div class="row">
      <font class="col-1">
        checked:
      </font>
      <div class="col-11">
        <b-radio :checked="true" />
      </div>
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <div class="col-11">
        <b-radio disabled />
      </div>
    </div>
    <div class="row">
      <font class="col-1">
        value:
      </font>
      <div class="col-11">
        <b-radio value="value" />
      </div>
    </div>
    <div class="row">
      <font class="col-1">
        v-model:
        <br>
        {{ checked }}
      </font>
      <div class="col-11">
        <b-radio v-model="checked" />
      </div>
    </div>
    <hr>
    <h2>b-radio-group</h2>
    <hr>
    <h4>基础属性</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
      </font>
      <b-radio-group
        class="col-11"
        :list="list"
        name="group-default"
      />
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <b-radio-group
        class="col-11"
        :list="list"
        name="group-disabled"
        disabled
        inline
      />
    </div>
    <div class="row">
      <font class="col-1">
        inline:
      </font>
      <b-radio-group
        class="col-11"
        :list="list"
        name="group-inline"
        inline
      />
    </div>
    <div class="row">
      <font class="col-1">
        info:
      </font>
      <b-radio-group
        class="col-11"
        :list="list"
        name="group-info"
        info="info message"
        inline
      />
    </div>
    <br>
    <h4>v-model</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
        <br>
        {{ value1 }}
      </font>
      <b-radio-group
        v-model="value1"
        class="col-11"
        :list="list"
        name="group-v-model"
        inline
      />
    </div>
    <br>
    <h4>校验</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        required:
      </font>
      <b-radio-group
        class="col-11"
        :list="list"
        name="group-required"
        required
      />
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
        invalid-info="error"
        valid-info="success"
      />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error(2):
      </font>
      <b-radio-group
        class="col-11"
        :list="list"
        name="group-valide-two"
        required
      >
        <template #invalid>
          you can add anlything invalidInfo or DOM
        </template>
        <template #valid>
          you can add anlything validInfo or DOM
        </template>
      </b-radio-group>
    </div>
    <hr>
    <h2>b-radio-button-group</h2>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
      </font>
      <b-radio-button-group
        class="col-auto"
        name="default-button-group"
        :list="buttongrouplist"
      />
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <b-radio-button-group
        class="col-auto"
        name="disabled-button-group"
        :list="buttongrouplist"
        disabled
      />
    </div>
    <div class="row">
      <font class="col-1">
        value:
      </font>
      <b-radio-button-group
        class="col-auto"
        name="value-button-group"
        :list="buttongrouplist"
        value="value1"
      />
    </div>
    <div class="row">
      <font class="col-1">
        info:
      </font>
      <b-radio-button-group
        class="col-auto"
        name="info-button-group"
        :list="buttongrouplist"
        info="button group info"
      />
    </div>
    <div class="row">
      <font class="col-1">
        v-model:
        <br>
        {{ buttongroupvalue }}
      </font>
      <b-radio-button-group
        class="col-auto"
        v-model="buttongroupvalue"
        name="v-model-button-group"
        :list="buttongrouplist"
      />
    </div>
  </div>
</template>

<script>
import BRadio from "@/components/form/Radio/b-radio.vue";
import BRadioGroup from "@/components/form/Radio/b-radio-group.vue";
import BRadioButtonGroup from "@/components/form/Radio/b-radio-button-group.vue";

export default {
  name: "BRadioDemo",
  components: { BRadio, BRadioGroup, BRadioButtonGroup,},
  data() {
    return {
      checked: true,
      list: [
        { value: "value1", label: "value1" },
        { value: "value2", label: "value2" },
        { value: "disabled radio", label: "disabled radio", disabled: true }
      ],
      value1: "value2",
      value2: { value: "value2", label: "value2" },
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
