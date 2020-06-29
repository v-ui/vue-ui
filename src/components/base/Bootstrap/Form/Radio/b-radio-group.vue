<template>
  <div>
    <template v-for="(item, index) in list">
      <b-redio
        :key="index"
        :mix-class="validateClass"
        unvalid
        :name="name"
        :value="item.value || item"
        :label="item.label"
        :checked="isChecked(item)"
        :disabled="item.disabled || disabled"
        v-bind="$attrs"
        v-on="$listeners"
        @input="input($event, item)"
      >
        <template v-if="list.length - 1 == index" #valid>
          <slot name="valid">{{ validInfo }}</slot>
        </template>
        <template v-if="list.length - 1 == index" #invalid>
          <slot name="invalid">{{ invalidInfo }}</slot>
        </template>
      </b-redio>
    </template>
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BRedio from "./b-radio";
import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-radio-group",
  components: { BRedio, BInfo },
  mixins: [util.mixins.select.check, util.mixins.form.validator],
  inheritAttrs: false,
  props: {
    primaryKey: {
      ...util.props.String,
      default: "value"
    },
    info: util.props.String,
    disabled: util.props.Boolean,
    name: {
      ...util.props.String,
      required: true,
    }
  },
  data() {
    return {
      validateClass: "",
      isMultiple: false,
    };
  },
  methods: {
    input: function(event, item) {
      if (event.target.checked) {
        this.checkedValues = item
          this.validator(event, this.checkedValues,
          () => { this.validateClass = '' },
          () => { this.validateClass = this.validClass },
          () => { this.validateClass = this.inValidClass },
        )
      }
    },
  },
};
</script>
