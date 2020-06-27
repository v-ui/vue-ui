<template>
  <div>
    <template v-for="(item, index) in list">
      <redio
        :key="index"
        v-bind="$attrs"
        :mix-class="validateClass"
        unvalid
        :name="name"
        :value="item.value || item"
        :label="item.label"
        :checked="value"
        :disabled="item.disabled || disabled"
        v-on="inputListeners"
        @input="input($event)"
      >
        <template v-if="list.length - 1 == index" #valid>
          <slot name="valid">{{ validInfo }}</slot>
        </template>
        <template v-if="list.length - 1 == index" #invalid>
          <slot name="invalid">{{ invalidInfo }}</slot>
        </template>
      </redio>
    </template>
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import redio from "./b-radio";
import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-radio-group",
  components: { redio, BInfo },
  mixins: [util.mixins.form.base, util.mixins.form.validator],
  inheritAttrs: false,
  model: {
    prop: "value",
    event: "raido:change"
  },
  props: {
    value: util.props.String,
    list: util.props.Array,
    info: util.props.String,
    disabled: util.props.Boolean,
    name: {
      ...util.props.String,
      required: true,
    }
  },
  data() {
    return {
      validateClass: ""
    };
  },
  methods: {
    input: function(e) {
      this.validator(e, null,
        () => { this.validateClass = '' },
        () => { this.validateClass = this.validClass },
        () => { this.validateClass = this.inValidClass },
      )
    },
  },
};
</script>
