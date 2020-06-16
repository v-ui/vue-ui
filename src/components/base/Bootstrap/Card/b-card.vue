<template functional>
  <basic-slot class="card">
    <slot name="card">
      <basic-slot class="card-header">
        <slot name="header" />
      </basic-slot>
      <basic-slot class="card-body">
        <slot />
      </basic-slot>
      <basic-slot class="card-footer">
        <slot name="footer" />
      </basic-slot>
    </slot>
  </basic-slot>
</template>

<script>

import '@/components/Basic/basic-slot.js'

export default {
  name: "b-card",
};
</script>
