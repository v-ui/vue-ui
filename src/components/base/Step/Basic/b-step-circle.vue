<template>
  <span class="d-flex rounded-circle align-items-center">
    <b-ico class="m-auto" :class="iconClass" style="width: 50%; height: 50%" />
  </span>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: 'b-step-circle',
  mixins: [ util.mixins.status.method, ],
}
</script>
