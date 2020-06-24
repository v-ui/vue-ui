<template>
  <div>
    <div
      v-if="$slots.default"
      class="input-group"
      :class="sizeClass"
      v-bind="$attrs"
    >
      <slot />
    </div>
    <!-- <b-valid v-if="$slots.valid || validInfo" state="valid">
      <slot name="valid">{{ validInfo }}</slot>
    </b-valid>
    <b-valid v-if="$slots.invalid || invalidInfo" state="invalid">
      <slot name="invalid">{{ invalidInfo }}</slot>
    </b-valid> -->
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

// import BValid from "@/components/base/Bootstrap/Form/Other/b-form-valid.vue";
import BInfo from "@/components/Basic/basic-info.vue";

export default {
  name: "b-input-group",
  components: { BInfo },
  // mixins: [
  //   util.mixins.form.readonly,
  //   util.mixins.form.validator
  // ],
  inheritAttrs: false,
  props: {
    size: util.props.size,
    info: util.props.String,
  },
  computed: {
    sizeClass: function() {
      return this.size ? `input-group-${this.size}` : "";
    },
  },
};
</script>
