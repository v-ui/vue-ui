<template>
  <div>
    <div
      v-for="(item, index) in list"
      :key="index"
      class="form-check"
      :class="{ 'form-check-inline': inline, }"
    >
      <b-check
        :id="`${id}-${index}`"
        :type="type"
        :class="validateClass"
        :name="name"
        :checked="isSelected(item)"
        :value="getKey(item)"
        :disabled="disabled || item.disabled"
        v-bind="$attrs"
        v-on="$listeners"
        @input.native="input($event, item)"
      />
      <label
        class="form-check-label"
        :for="`${id}-${index}`"
      >
        <slot>{{ getDisplay(item) }}</slot>
      </label>
      <template v-if="list.length - 1 == index">
        <b-valid
          v-if="validInfo || $slots.valid"
          state="valid"
        >
          <slot name="valid">
            {{ validInfo }}
          </slot>
        </b-valid>
        <b-valid
          v-if="invalidInfo || $slots.invalid"
          state="invalid"
        >
          <slot name="invalid">
            {{ invalidInfo }}
          </slot>
        </b-valid>
      </template>
    </div>
    <b-info
      :class="{ 'pl-1': inline }"
      :info="info"
    />
  </div>

</template>

<script>
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import BCheck from "./b-check.vue"
import BInfo from "@/components/basic/basic-info.vue";
import BValid from "@/components/form/Other/b-form-valid.vue";

export default {
  name: "BCheckGroup",
  components: { BCheck, BInfo, BValid },
  mixins: [
    util.mixins.select.check,
    util.mixins.form.validator
  ],
  inheritAttrs: false,
  props: {
    list: util.props.Array,
    type: {
      type: String,
      default: 'radio',
      validator: value => ['radio', 'checkbox'].includes(value),
    },
    name: util.props.String,
    info: util.props.String,
    disabled: util.props.Boolean,
    id: {
      type: String,
      default: function() {
        return "check-group-" + tools.random.getRandomString();
      }
    },
    inline: util.props.Boolean,
  },
  data() {
    return {
      validateClass: "",
      isMultiple: this.type !== 'radio',
    }
  },
  methods: {
    input: function(event, item) {
      if (this.isMultiple) {
        const key = this.getKey(item)
        let index = this.selectedMap.indexOf(key)
        index >= 0
          ? this.selectedValue.splice(index, 1)
          : this.selectedValue.push(item)
      } else {
        this.selectedValue = item
      }
      this.validator(
        event,
        this.selectedValue,
        () => { this.validateClass = '' },
        () => { this.validateClass = this.validClass },
        () => { this.validateClass = this.inValidClass },
      )
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
