<template>
  <div class="d-flex align-items-center justify-content-center">
    <span class="d-inline-block border border-primary m-1" style="width: 20px; height: 20px;" :style="`background: ${color}`"  />
    <strong class="text-center">{{ color }}</strong>
  </div>
</template>

<script>
export default {
  name: 'BColorLabel',
  props: {
    color: [String, Number],
  },
}
</script>
