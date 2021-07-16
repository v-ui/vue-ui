<template>
  <div class="form-check form-switch">
    <b-check
      :id="id"
      type="checkbox"
      :checked="checked"
      v-bind="$attrs"
      v-on="$listeners"
      @input.native="input"
    />
    <label
      class="form-check-label"
      :for="id"
    >
      {{ label }}
    </label>
    <b-info :info="info" />
  </div>
</template>

<script>
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import BCheck from '@/components/form/Check/b-check.vue'
import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BSwitch",
  components: { BCheck, BInfo },
  inheritAttrs: false,
  model: {
    prop: "checked",
    event: "check:changed"
  },
  props: {
    label: util.props.String,
    info: util.props.String,
    checked: util.props.Boolean,
    id: {
      type: String,
      default: function() {
        return "switch-" + tools.random.getRandomString();
      }
    }
  },
  methods: {
    input: function(event) {
      this.$emit("check:changed", event.target.checked);
    }
  },
};
</script>
