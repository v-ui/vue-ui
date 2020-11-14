<template>
  <span class="d-inline-block position-relative rounded-sm border border-secondary align-middle" :class="{ 'color-check': active }" style="cursor: pointer; width: 15px; height: 15px;" :style="objStyle" />
</template>

<script>

export default {
  name: 'b-color-check',
  components: {  },
  props: {
    color: {
      type: String,
      default: '#000'
    },
    active: Boolean,
    disabled: Boolean,
  },
  computed: {
    objStyle: function() {
      const color = this.color === 'transparent'
        ? `background: linear-gradient(45deg, transparent 15%, #f00 15%, #ddd 25%, transparent 25%, transparent 45%, #f00 45%, #ddd 55%, transparent 55%, transparent 75%, #f00 75%, #ddd 85%, transparent 85% );`
        : `background: ${this.color};`
      return `${color}`
    },
  },
}
</script>

<style scoped>
.color-check::before {
  content: '';
  position: absolute;
  width: 17px;
  height: 17px;
  left: -2px;
  top: -2px;
  background: linear-gradient(217deg, rgba(255,0,0,.5), rgba(255,0,0,0) 70.71%),
              linear-gradient(127deg, rgba(0,255,0,.5), rgba(0,255,0,0) 70.71%),
              linear-gradient(336deg, rgba(0,0,255,.5), rgba(0,0,255,0) 70.71%);
}
</style>
