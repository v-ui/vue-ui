
<template>
  <div>
    <h2>b-checkbox</h2>
    <br>
    <h4>基础属性</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
      </font>
      <b-checkbox class="col-11" />
    </div>
    <div class="row">
      <font class="col-1">
        checked:
      </font>
      <b-checkbox
        class="col-11"
        :checked="Boolean(true)"
      />
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <b-checkbox
        class="col-11"
        disabled
      />
    </div>
    <div class="row">
      <font class="col-1">
        indeterminate:
      </font>
      <b-checkbox
        class="col-11"
        indeterminate="1"
      />
    </div>
    <div class="row">
      <font class="col-1">
        value:
      </font>
      <b-checkbox
        class="col-11"
        value="value"
      />
    </div>
    <div class="row">
      <font class="col-1">
        label:
      </font>
      <b-checkbox
        class="col-11"
        label="label text"
      />
    </div>
    <div class="row">
      <font class="col-1">
        inline:
      </font>
      <b-checkbox
        class="col-auto"
        label="checkbox1"
        inline
      />
      <b-checkbox
        class="col-auto"
        label="checkbox2"
        inline
      />
      <b-checkbox
        class="col-auto"
        label="checkbox3"
        inline
      />
      <b-checkbox
        class="col-auto"
        label="checkbox4"
        inline
      />
    </div>
    <div class="row">
      <font class="col-1">
        name:
      </font>
      <b-checkbox
        class="col-auto"
        label="checkbox1"
        name="inline-checkbox"
      />
      <b-checkbox
        class="col-auto"
        label="checkbox2"
        name="inline-checkbox"
      />
      <b-checkbox
        class="col-auto"
        label="checkbox3"
        name="inline-checkbox"
      />
      <b-checkbox
        class="col-auto"
        label="checkbox4"
        name="inline-checkbox"
      />
    </div>
    <div class="row">
      <font class="col-1">
        info:
      </font>
      <b-checkbox
        class="col-11"
        label="label text"
        info="a checkbox help info"
      />
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
      <b-checkbox
        v-model="checked"
        class="col-auto"
        value="one"
        label="one"
        name="v-model-checkbox"
      />
    </div>
    <br>
    <h4>校验</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        required:
      </font>
      <b-checkbox
        class="col-11"
        label="required checkbox"
        required
      />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error:
      </font>
      <b-checkbox
        class="col-11"
        label="required checkbox"
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
      <b-checkbox
        class="col-11"
        label="required checkbox"
        required
      >
        <template #invalid>
          you can add anlything invalidInfo or DOM
        </template>
        <template #valid>
          you can add anlything validInfo or DOM
        </template>
      </b-checkbox>
    </div>
    <h2>b-checkbox-group</h2>
    <br>
    <h4>基础属性</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
      </font>
      <b-checkbox-group
        class="col-11"
        :list="list"
      />
    </div>
    <div class="row">
      <font class="col-1">
        values:
      </font>
      <b-checkbox-group
        class="col-11"
        :list="list"
        :values="values"
      />
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <b-checkbox-group
        class="col-11"
        :list="list"
        :values="values"
        disabled
      />
    </div>
    <div class="row">
      <font class="col-1">
        inline:
      </font>
      <b-checkbox-group
        class="col-11"
        :list="list"
        :values="values"
        inline
      />
    </div>
    <div class="row">
      <font class="col-1">
        info:
      </font>
      <b-checkbox-group
        class="col-11"
        :list="list"
        :values="values"
        info="checkbox group info"
        inline
      />
    </div>
    <br>
    <h4>v-model</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        v-model:
        <br>
        ({{ values1 }})
      </font>
      <b-checkbox-group
        v-model="values1"
        class="col-11"
        :list="list"
        name="checkbox-v-model"
        inline
      />
    </div>
    <div class="row">
      <font class="col-1">
        v-model:
        <br>
        ({{ values }})
      </font>
      <b-checkbox-group
        v-model="values"
        class="col-11"
        :list="list"
        name="checkbox-v-model"
        primary-key="value"
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
      <b-checkbox-group
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
      <b-checkbox-group
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
      <b-checkbox-group
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
      </b-checkbox-group>
    </div>
    <h2>b-checkbox-button-group</h2>
    <br>
    <h4>基础属性</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
      </font>
      <b-checkbox-button-group class="col-11" />
    </div>
    <div class="row">
      <font class="col-1">
        checked:
      </font>
      <b-checkbox-button-group
        class="col-11"
        :checked="Boolean(true)"
      />
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <b-checkbox-button-group
        class="col-11"
        disabled
      />
    </div>
    <div class="row">
      <font class="col-1">
        label:
      </font>
      <b-checkbox-button-group
        class="col-11"
        label="label Text"
      />
    </div>
    <div class="row">
      <font class="col-1">
        value:
      </font>
      <b-checkbox-button-group
        class="col-11"
        name="value-button-group"
        value="value"
      />
    </div>
    <div class="row">
      <font class="col-1">
        info:
      </font>
      <b-checkbox-button-group
        class="col-11"
        name="info-button-group"
        info="button group info"
      />
    </div>
    <div class="row">
      <font class="col-1">
        v-model:
        <br>
        ({{ checked }})
      </font>
      <b-checkbox-button-group
        v-model="checked"
        class="col-11"
        name="v-model-button-group"
      />
    </div>
  </div>
</template>

<script>
import BCheckbox from "@/components/form/CheckBox/b-checkbox.vue";
import BCheckboxGroup from "@/components/form/CheckBox/b-checkbox-group.vue";
import BCheckboxButtonGroup from "@/components/form/CheckBox/b-checkbox-button-group.vue";

export default {
  name: "BCheckboxDemo",
  components: { BCheckbox, BCheckboxGroup, BCheckboxButtonGroup, },
  data() {
    return {
      checked: true,
      list: [
        { value: "value1", label: "value1" },
        { value: "value2", label: "value2" },
        { value: "disabled radio", label: "disabled checkbox", disabled: true }
      ],
      values: [{ value: "value2", label: "value2" }],
      values1: ["value2"],
    };
  }
};
</script>

