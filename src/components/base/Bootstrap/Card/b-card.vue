<template functional>
  <basic-slot class="card" :class="data.staticClass" v-bind="data.attrs" v-on="listeners">
    <slot name="card">
      <basic-slot v-if="!slots().image" class="card-header">
        <slot name="header" />
      </basic-slot>
      <slot name="image" />
      <slot name="body">
        <basic-slot class="card-body">
          <slot />
        </basic-slot>
      </slot>
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
