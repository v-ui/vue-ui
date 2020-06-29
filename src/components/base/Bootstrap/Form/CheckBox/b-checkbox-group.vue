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
  mixins: [util.mixins.select.check, util.mixins.form.validator],
  inheritAttrs: false,
  props: {
    primaryKey: {
      ...util.props.String,
      default: "value"
    },
    info: util.props.String,
    disabled: util.props.Boolean
  },
  data() {
    return {
      validateClass: "",
      isMultiple: true,
    };
  },
  methods: {
    input: function(event, item) {
      if (event.target.checked) {
        this.checkedValues.push(item);
      } else {
        let index = this.checkedMap.indexOf(event.target.value);
        if (index >= 0) this.checkedValues.splice(index, 1);
      }
      this.validator( event, this.checkedValues,
        () => { this.validateClass = ""; },
        () => { this.validateClass = this.validClass; },
        () => { this.validateClass = this.inValidClass; }
      );
    }
  },
};
</script>
