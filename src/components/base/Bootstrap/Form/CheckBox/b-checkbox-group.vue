<template>
  <div>
    <template v-for="(item, index) in list">
      <b-checkbox
        :id="item.id"
        :key="item.key ? item.key : (item.id ? item.id : index)"
        :mix-class="validateClass"
        unvalid
        :label="item.label"
        :value="item.value || item"
        :checked="values.includes(item.value)"
        :disabled="item.disabled || disabled"
        v-bind="$attrs"
        v-on="$listeners"
        @input="getCheckedValues($event)"
      >
        <template v-if="list.length - 1 == index" #valid>
          <slot name="valid">{{ validInfo }}</slot>
        </template>
        <template v-if="list.length - 1 == index" #invalid>
          <slot name="invalid">{{ invalidInfo }}</slot>
        </template>
      </b-checkbox>
    </template>
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BCheckbox from "./b-checkbox";
import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-checkbox-group",
  components: { BCheckbox, BInfo },
  mixins: [util.mixins.form.base, util.mixins.form.validator],
  inheritAttrs: false,
  model: {
    prop: "values",
    event: "chebox:change"
  },
  props: {
    list: util.props.Array,
    values: util.props.Array,
    info: util.props.String,
    disabled: util.props.Boolean
  },
  data() {
    return {
      validateClass: ""
    };
  },
  methods: {
    getCheckedValues: function(event) {
      if (event.target.checked) {
        this.values.push(event.target.value);
      } else {
        if (this.values.includes(event.target.value))
          this.values.splice(this.values.indexOf(event.target.value), 1);
      }
      this.validator(event, this.values, null,
        () => { this.validateClass = '' },
        () => { this.validateClass = this.validClass },
        () => { this.validateClass = this.inValidClass },
      )
    },
  }
};
</script>
