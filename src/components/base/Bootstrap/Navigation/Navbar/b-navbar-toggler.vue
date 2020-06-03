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
export default {
  name: "b-navbar-toggler",
  props: {
    target: {
      type: String,
      required: true
    }
  }
};
</script>
