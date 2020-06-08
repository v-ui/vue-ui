<template>
  <div v-show="$slots.default" class="card">
    <slot name="card">
      <div v-show="$slots.header" class="card-header">
        <slot name="header" />
      </div>
      <div class="card-body">
        <slot />
      </div>
      <div v-show="$slots.footer" class="card-footer">
        <slot name="footer" />
      </div>
    </slot>
  </div>
</template>

<script>

export default {
  name: "b-card",
};
</script>
