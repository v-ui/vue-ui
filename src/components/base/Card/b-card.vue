<template>
  <div
    class="card"
  >
    <slot name="card">
      <div
        v-if="!$slots.image"
        class="card-header"
      >
        <slot name="header" />
      </div>
      <slot name="image" />
      <slot name="body">
        <div class="card-body">
          <slot />
        </div>
      </slot>
      <div class="card-footer">
        <slot name="footer" />
      </div>
    </slot>
  </div>
</template>

<script>

export default {
  name: "BCard",
};
</script>
