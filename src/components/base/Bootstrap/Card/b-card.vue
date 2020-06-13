<template functional>
  <div v-if="slots().default" class="card" v-bind="data.attrs" v-on="listeners">
    <slot name="card">
      <div v-if="slots().header" class="card-header">
        <slot name="header" />
      </div>
      <div class="card-body">
        <slot />
      </div>
      <div v-if="slots().footer" class="card-footer">
        <slot name="footer" />
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "b-card"
};
</script>
