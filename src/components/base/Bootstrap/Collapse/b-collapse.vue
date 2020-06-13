<template functional>
  <div
    class="collapse"
    v-bind="data.attrs"
    v-on="listeners">
    <div class="card card-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "b-collapse-item"
};
</script>
