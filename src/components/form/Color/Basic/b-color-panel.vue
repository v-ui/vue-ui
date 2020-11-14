<template>
  <div class="color-panel-main" style="cursor: pointer;" :style="{background: color(90, 1, .5, 'hsl')}">
    <div class="color-white-panel" />
    <div class="color-block-panel" />
  </div>
</template>

<script>
import util from '@/components/util'

export default {
  name: 'b-color-panel',
  mixins: [ util.mixins.color.base, ],
  computed: {

  },
}
</script>

<style scoped>
.color-panel-main {
  width: 200px;
  height: 200px;
  position: relative;
  background-position: initial initial;
}

.color-white-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
}

.color-block-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(0deg, #000, transparent)
}

</style>
