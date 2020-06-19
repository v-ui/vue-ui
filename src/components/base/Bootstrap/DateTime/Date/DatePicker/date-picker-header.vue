<template>
  <header>
    <font class="row text-center mx-1">
      <b-button
        class="col font-weight-bold border-0 bg-white text-body h5"
        style="height: 2.5em"
        :value="hearderText"
        @click.stop="$emit('clickHeader')"
      />
      <b-button
        class="border-0 bg-white text-body"
        style="height: 2.5em"
        :disabled="disabled"
        @click.stop="$emit('forward')"
      >
        <i class="fas fa-angle-left" />
      </b-button>
      <b-button
        class="border-0 bg-white text-body"
        style="height: 2.5em"
        :disabled="disabled || nowDisabled"
        @click.stop="$emit('checknow')"
      >
        <i class="fas fa-circle" />
      </b-button>
      <b-button
        class="border-0 bg-white text-body"
        style="height: 2.5em"
        :disabled="disabled"
        @click.stop="$emit('backward')"
      >
        <i class="fas fa-angle-right" />
      </b-button>
    </font>
  </header>
</template>

<script>
import util from "@/components/util/index.js";

import BButton from "@/components/Basic/Button/basic-button.vue";

export default {
  name: "date-picker-header",
  components: { BButton },
  props: {
    hearderText: util.props.String,
    disabled: util.props.Boolean,
    nowDisabled: util.props.Boolean,
  }
};
</script>
