<template functional>
  <li
    class="page-item text-center"
    :class="{disabled: props.disabled, active: props.active}"
    style="width: 2.5em"
    :aria-current="props.active ? 'page' : ''"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <span class="page-link text-center px-1" :disabled="props.disabled">
      <slot>{{ props.value }}</slot>
      <span v-if="props.active" class="sr-only">(current)</span>
    </span>
  </li>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "b-pag-item",
  props: {
    value: util.props.String,
    disabled: util.props.Boolean,
    active: util.props.Boolean
  }
};
</script>
