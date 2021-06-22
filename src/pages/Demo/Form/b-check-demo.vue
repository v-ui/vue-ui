<template>
  <div>
    <h2>b-check</h2>
    <hr>
    <h4>基础属性</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        type:
      </font>
      <font class="col-1">
        checkbox(default):
      </font>
      <div class="col-4">
        <b-check type="checkbox" />
      </div>
      <font class="col-1">
        radiu:
      </font>
      <div class="col-4">
        <b-check type="radio" />
      </div>
    </div>
    <div class="row">
      <font class="col-1">
        checked:
      </font>
      <font class="col-1">
      </font>
      <div class="col-4">
        <b-check type="checkbox" :checked="true" />
      </div>
      <font class="col-1">
      </font>
      <div class="col-4">
        <b-check type="radio" :checked="true" />
      </div>
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <font class="col-1">
      </font>
      <div class="col-4">
        <b-check type="checkbox" disabled />
        <span class="mx-1" />
        <b-check type="checkbox" :checked="true" disabled />
      </div>
      <font class="col-1">
      </font>
      <div class="col-4">
        <b-check type="radio" disabled />
        <span class="mx-1" />
        <b-check type="checkbox" :checked="true" disabled />
      </div>
    </div>
    <div class="row">
      <font class="col-1">
        v-model:
      </font>
      <font class="col-1">
      </font>
      <div class="col-4">
        <b-check type="checkbox" v-model="checkbox" />
        {{ checkbox }}
      </div>
      <font class="col-1">
      </font>
      <div class="col-4">
        <b-check type="radio" v-model="radio" />
        {{ radio }}
      </div>
    </div>
    <h2>b-check-group</h2>
    <hr>
    <h4>基础属性</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
      </font>
      <font class="col-1">
      </font>
      <b-check-group
        class="col-4"
        type="checkbox"
        :list="list"
        name="group-default"
      />
      <font class="col-1">
      </font>
      <b-check-group
        class="col-4"
        type="radio"
        :list="list"
        name="group-default"
      />
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <font class="col-1">
      </font>
      <b-check-group
        class="col-4"
        type="checkbox"
        :list="list"
        name="group-default"
        disabled
      />
      <font class="col-1">
      </font>
      <b-check-group
        class="col-4"
        type="radio"
        :list="list"
        name="group-default"
        disabled
      />
    </div>
    <div class="row">
      <font class="col-1">
        inline:
      </font>
      <font class="col-1">
      </font>
      <b-check-group
        class="col-4"
        type="checkbox"
        :list="list"
        name="group-default"
        inline
      />
      <font class="col-1">
      </font>
      <b-check-group
        class="col-4"
        type="radio"
        :list="list"
        name="group-default"
        inline
      />
    </div>
    <div class="row">
      <font class="col-1">
        info:
      </font>
      <font class="col-1">
      </font>
      <b-check-group
        class="col-4"
        type="checkbox"
        :list="list"
        name="group-default"
        inline
        info="info message"
      />
      <font class="col-1">
      </font>
      <b-check-group
        class="col-4"
        type="radio"
        :list="list"
        name="group-default"
        inline
        info="info message"
      />
    </div>
    <div class="row">
      <font class="col-1">
        v-model:
      </font>
      <font class="col-1">
        {{ checkValue }}
      </font>
      <b-check-group
        v-model="checkValue"
        class="col-4"
        type="checkbox"
        :list="list"
        name="group-default"
        inline
      />
      <font class="col-1">
        {{ radioValue }}
      </font>
      <b-check-group
        v-model="radioValue"
        class="col-4"
        type="radio"
        :list="list"
        name="group-default"
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
      <font class="col-1">
      </font>
      <b-check-group
        class="col-4"
        type="checkbox"
        :list="list"
        name="group-required"
        inline
        required
      />
      <font class="col-1">
      </font>
      <b-check-group
        class="col-4"
        type="radio"
        :list="list"
        name="group-required"
        inline
        required
      />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error::
      </font>
      <font class="col-1">
      </font>
      <b-check-group
        class="col-4"
        type="checkbox"
        :list="list"
        name="group-required"
        invalid-info="error"
        valid-info="success"
        required
      />
      <font class="col-1">
      </font>
      <b-check-group
        class="col-4"
        type="radio"
        :list="list"
        name="group-required"
        invalid-info="error"
        valid-info="success"
        required
      />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error(2):
      </font>
      <font class="col-1">
      </font>
      <b-check-group
        class="col-4"
        type="checkbox"
        :list="list"
        name="group-required"
        required
      >
        <template #invalid>
          you can add anlything invalidInfo or DOM
        </template>
        <template #valid>
          you can add anlything validInfo or DOM
        </template>
      </b-check-group>
      <font class="col-1">
      </font>
      <b-check-group
        class="col-4"
        type="radio"
        :list="list"
        name="group-required"
        required
      >
        <template #invalid>
          you can add anlything invalidInfo or DOM
        </template>
        <template #valid>
          you can add anlything validInfo or DOM
        </template>
      </b-check-group>
    </div>
    <hr>
    <h2>b-check-button-group</h2>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
      </font>
      <font class="col-1">
      </font>
      <b-check-button-group
        class="col-4"
        type="checkbox"
        name="default-button-group"
        :list="buttongrouplist"
      />
      <font class="col-1">
      </font>
      <b-check-button-group
        class="col-4"
        type="radio"
        name="default-button-group"
        :list="buttongrouplist"
      />
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <font class="col-1">
      </font>
      <b-check-button-group
        class="col-4"
        type="checkbox"
        name="default-button-group"
        :list="buttongrouplist"
        disabled
      />
      <font class="col-1">
      </font>
      <b-check-button-group
        class="col-4"
        type="radio"
        name="default-button-group"
        :list="buttongrouplist"
        disabled
      />
    </div>
    <div class="row">
      <font class="col-1">
        info:
      </font>
      <font class="col-1">
      </font>
      <b-check-button-group
        class="col-4"
        type="checkbox"
        name="default-button-group"
        :list="buttongrouplist"
        info="button group info"
      />
      <font class="col-1">
      </font>
      <b-check-button-group
        class="col-4"
        type="radio"
        name="default-button-group"
        :list="buttongrouplist"
        info="button group info"
      />
    </div>
    <div class="row">
      <font class="col-1">
        v-model:
      </font>
      <font class="col-1">
        {{ checkbuttongroupvalue }}
      </font>
      <b-check-button-group
        v-model="checkbuttongroupvalue"
        class="col-4"
        type="checkbox"
        name="default-button-group"
        :list="buttongrouplist"
        info="button group info"
      />
      <font class="col-1">
        {{ radiobuttongroupvalue }}
      </font>
      <b-check-button-group
        v-model="radiobuttongroupvalue"
        class="col-4"
        type="radio"
        name="default-button-group"
        :list="buttongrouplist"
        info="button group info"
      />
    </div>
  </div>
</template>

<script>
import BCheck from "@/components/form/Check/b-check.vue";
import BCheckGroup from "@/components/form/Check/b-check-group.vue";
import BCheckButtonGroup from "@/components/form/Check/b-check-button-group.vue";

export default {
  name: "BCheckDemo",
  components: { BCheck, BCheckGroup, BCheckButtonGroup,},
  data() {
    return {
      type1: 'checkbox',
      type2: 'radio',
      checkbox: false,
      radio: false,
      list: [ "value1", 'value2', 'value3' ],
      checkValue: ["value2"],
      radioValue: 'value2',
      value2: { value: "value2", label: "value2" },
      buttongrouplist: [
        { value: "value1", label: "value1" },
        { value: "value2", label: "value2" },
        { value: "value3", label: "value3" },
        { value: "value4", label: "value4", disabled: true }
      ],
      checkbuttongroupvalue: ["value2"],
      radiobuttongroupvalue: 'value2',
    };
  }
};
</script>
