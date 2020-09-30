<template>
  <div>
    <h2>b-select</h2>
    <hr>
    <h4>基础属性</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
      </font>
      <b-select
        class="col-5"
        :list="list"
      />
      <b-select
        class="col-5"
        :list="list"
        multiple
      />
    </div>
    <div class="row">
      <font class="col-1">
        option group:
      </font>
      <b-select
        class="col-5"
        :list="list3"
      />
      <b-select
        class="col-5"
        :list="list3"
        multiple
      />
    </div>
    <div class="row">
      <font class="col-1">
        value:
      </font>
      <b-select
        class="col-5"
        :list="list"
        :value="value"
      />
      <b-select
        class="col-5"
        :list="list"
        :value="value1"
        multiple
      />
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <b-select
        class="col-5"
        disabled
      />
      <b-select
        class="col-5"
        :list="list"
        disabled
        multiple
      />
    </div>
    <div class="row">
      <font class="col-1">
        hideNull:
      </font>
      <b-select
        class="col-5"
        :list="list"
        hide-null
      />
      <b-select
        class="col-5"
        :list="list"
        hide-null
        multiple
      />
    </div>
    <div class="row">
      <font class="col-1">
        info:
      </font>
      <b-select
        class="col-5"
        :list="list"
        info="info label"
      />
      <b-select
        class="col-5"
        :list="list"
        info="info label"
        multiple
      />
    </div>
    <div class="row">
      <font class="col-1">
        row:
      </font>
      <b-select
        class="col-10"
        :list="list2"
        row="5"
        multiple
      />
    </div>
    <div class="row">
      <font class="col-1">
        size(lg):
      </font>
      <b-select
        class="col-5"
        :list="list"
        size="lg"
      />
      <b-select
        class="col-5"
        :list="list"
        size="lg"
        multiple
      />
    </div>
    <div class="row">
      <font class="col-1">
        size(sm):
      </font>
      <b-select
        class="col-5"
        :list="list"
        size="sm"
      />
      <b-select
        class="col-5"
        :list="list"
        size="sm"
        multiple
      />
    </div>
    <br>
    <h4>v-model</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        default: 接收/返回字符串
      </font>
      <div class="col-10 row">
        <b-select
          v-model="value"
          class="col-3"
          :list="list"
          :info="'selected: ' + value"
        />
        <b-select
          v-model="value1"
          class="col-3"
          :list="list"
          :info="'selected: ' + value1"
          multiple
        />
        <b-select
          v-model="value2"
          class="col-3"
          :list="list3"
          :info="'selected: ' + value2"
        />
        <b-select
          v-model="value3"
          class="col-3"
          :list="list3"
          :info="'selected: ' + value3"
          multiple
        />
      </div>
    </div>
    <div class="row">
      <font class="col-1">
        接收/返回对象
      </font>
      <div class="col-10 row">
        <b-select
          v-model="value4"
          class="col-3"
          :list="list"
          :info="'selected: ' + value4"
          primary-key
        />
        <b-select
          v-model="value5"
          class="col-3"
          :list="list"
          :info="'selected: ' + value5"
          primary-key
          multiple
        />
        <b-select
          v-model="value6"
          class="col-3"
          :list="list3"
          :info="'selected: ' + value6"
          primary-key
        />
        <b-select
          v-model="value7"
          class="col-3"
          :list="list3"
          :info="'selected: ' + value7"
          primary-key
          multiple
        />
      </div>
    </div>
    <h4>校验</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        required:
      </font>
      <b-select
        class="col-5"
        :list="list"
        required
      />
      <b-select
        class="col-5"
        :list="list"
        required
        multiple
      />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error:
      </font>
      <b-select
        class="col-5"
        :list="list"
        invalid-info="error"
        valid-info="success"
        required
      />
      <b-select
        class="col-5"
        :list="list"
        invalid-info="error"
        valid-info="success"
        required
        multiple
      />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error(2):
      </font>
      <b-select
        class="col-5"
        :list="list"
        required
      >
        <template #invalid>
          you can add anlything invalidInfo or DOM
        </template>
        <template #valid>
          you can add anlything validInfo or DOM
        </template>
      </b-select>
      <b-select
        class="col-5"
        :list="list"
        required
        multiple
      >
        <template #invalid>
          you can add anlything invalidInfo or DOM
        </template>
        <template #valid>
          you can add anlything validInfo or DOM
        </template>
      </b-select>
    </div>
  </div>
</template>

<script>
import BSelect from "@/components/form/b-select.vue";

export default {
  name: "BSelectDemo",
  components: { BSelect },
  data() {
    return {
      list: [
        { value: "option1", label: "label option1" },
        { value: "option2", label: "label option2" },
        { value: "disabled option", label: "disabled label option", disabled: true }
      ],
      list2: [
        { value: "option1", label: "label option1" },
        { value: "option2", label: "label option2" },
        { value: "option3", label: "label option3" },
        { value: "option4", label: "label option4" },
        { value: "option5", label: "label option5" },
        { value: "option6", label: "label option6" },
        { value: "option7", label: "label option7" },
        { value: "disabled option", label: "disabled label option", disabled: true }
      ],
      list3: [
        {
          label: "option group 1",
          children: [
            { value: "option1-1", label: "label option1-1" },
            { value: "option1-2", label: "label option1-2" },
            { value: "option1-3", label: "label option1-3" }
          ]
        },
        {
          label: "option group 2",
          disabled: true,
          children: [
            { value: "option2-1", label: "label option2-1" },
            { value: "option2-2", label: "label option2-2" },
            { value: "option2-3", label: "label option2-3" }
          ]
        },
        { value: "option3", label: "label option3" },
        { value: "disabled option", label: "disabled label option", disabled: true }
      ],

      value: "option2",
      value1: ["option1", "option2"],
      value2: "option1-1",
      value3: ["option1-1","option2-2", "label option2-2"],

      value4: { value: "option2", label: "label option2" },
      value5: [{ value: "option1", label: "label option1" }, { value: "option2", label: "label option2" }],
      value6: { value: "option1-1", label: "label option1-1" },
      value7: [{ value: "option1-1", label: "label option1-1" }, { value: "option2-2", label: "label option2-2" }]
    };
  }
};
</script>

