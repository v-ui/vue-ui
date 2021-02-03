<template>
  <header class="row text-center mx-1">
    <slot name="header">
      <b-button
        class="cannt-hide col font-weight-bold border-0 bg-transparent text-body h5"
        style="height: 2.5em"
        :value="headerText"
        :disabled="diesableHeaderClick"
        @click.stop="$emit('clickHeader')"
      />
    </slot>
    <template v-if="!hideController">
      <b-button
        class="cannt-hide border-0 bg-transparent text-body"
        style="height: 2.5em"
        :disabled="disabled"
        @click.stop="$emit('forward')"
      >
        <i class="fas fa-angle-left" />
      </b-button>
      <b-button
        class="border-0 bg-transparent text-body"
        :class="{ 'cannt-hide': disabled || disabledNow }"
        style="height: 2.5em"
        :disabled="disabled || disabledNow"
        @click.stop="$emit('checknow')"
      >
        <i class="fas fa-circle" />
      </b-button>
      <b-button
        class="cannt-hide border-0 bg-transparent text-body"
        style="height: 2.5em"
        :disabled="disabled"
        @click.stop="$emit('backward')"
      >
        <i class="fas fa-angle-right" />
      </b-button>
    </template>
  </header>
</template>

<script>
import util from "@/components/util/index.js";

import BButton from "@/components/basic/Button/basic-button.vue";

export default {
  name: "DatePanelHeader",
  components: { BButton },
  props: {
    disabled: util.props.Boolean,
    headerText: util.props.String,
    disabledNow: util.props.Boolean,
    hideController: util.props.Boolean,
    diesableHeaderClick: util.props.Boolean,
  }
};
</script>
