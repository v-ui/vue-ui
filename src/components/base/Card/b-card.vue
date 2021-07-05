<template>
  <div
    class="card p-0"
  >
    <slot name="card">
      <div
        v-if="!$slots.image && $slots.header"
        class="card-header"
      >
        <slot name="header" />
      </div>
      <slot name="top" />
      <slot name="body">
        <div class="card-body">
          <slot />
        </div>
      </slot>
      <slot name="bottom" />
      <div
        v-if="$slots.footer"
        class="card-footer"
      >
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
