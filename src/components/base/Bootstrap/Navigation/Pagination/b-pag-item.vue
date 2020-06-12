<template>
  <li
    class="page-item text-center"
    :class="{disabled: disabled, active: active}"
    style="width: 2.5em"
    :aria-current="active ? 'page' : ''"
  >
    <span class="page-link text-center px-1" :disabled="disabled">
      <slot>{{value}}</slot>
      <span v-if="active" class="sr-only">(current)</span>
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
