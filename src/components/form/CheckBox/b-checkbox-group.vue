<template>
  <div>
    <template v-for="(item, index) in list">
      <b-checkbox
        :id="item.id"
        :key="item.key || item.id || index"
        :mix-class="validateClass"
        unvalid
        :label="getDisplay(item)"
        :value="getKey(item)"
        :checked="isSelected(item)"
        :disabled="item.disabled || disabled"
        v-bind="$attrs"
        v-on="$listeners"
        @input="input($event, item)"
      >
        <template
          v-if="list.length - 1 == index"
          #valid
        >
          <slot name="valid">
            {{ validInfo }}
          </slot>
        </template>
        <template
          v-if="list.length - 1 == index"
          #invalid
        >
          <slot name="invalid">
            {{ invalidInfo }}
          </slot>
        </template>
      </b-checkbox>
    </template>
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BCheckbox from "./b-checkbox";
import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BCheckboxGroup",
  components: { BCheckbox, BInfo },
  mixins: [util.mixins.select.check, util.mixins.form.validator],
  inheritAttrs: false,
  props: {
    list: util.props.Array,
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
        this.selectedValue.push(item);
      } else {
        let index = this.selectedMap.indexOf(event.target.value);
        if (index >= 0) this.selectedValue.splice(index, 1);
      }
      this.validator( event, this.selectedValue,
        () => { this.validateClass = ""; },
        () => { this.validateClass = this.validClass; },
        () => { this.validateClass = this.inValidClass; }
      );
    },
    // 验证集合 通过返回 true，不通过返回 false
    validating: function (value) {
      // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
      if (!this.validateRequired(value)) return false
      // 验证成功
      return true
    },
  },
};
</script>
