<template>
  <div>
    <div class="d-flex p-1">
      <b-color-sl-panel class="m-1" :disabled="disabled" :style="{ background: color(hsl.h, 1, .5, 'hsl') }" v-model="lt"/>
      <b-color-hue-bar class="m-1" :disabled="disabled" status="column" v-model="hsl.h" />
    </div>
    <div class="p-1">
      <b-color-alpha-bar class="m-1" :disabled="disabled" :style="{ background: rgbCss }" v-model="alpha" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'b-color-hsl-panel',
}
</script>
