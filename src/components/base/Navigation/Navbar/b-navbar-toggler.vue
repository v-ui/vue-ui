<template>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    :data-target="'#' + target"
    aria-expanded="false"
    aria-controls="navbarNav"
    aria-label="Toggle navigation"
  >
    <slot>
      <span class="navbar-toggler-icon" />
    </slot>
  </button>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "BNavbarToggler",
  props: {
    target: {
      ...util.props.String,
      required: true
    }
  }
};
</script>
