<template>
  <b-color-panel
    v-model="selectedValue"
    :max="{ l: 1, t: 1 }"
    filter="background: linear-gradient(to bottom, hsl(0, 0%, 100%) 0%, hsla(0, 0%, 100%, 0) 50%, hsla(0, 0%, 0%, 0) 50%, hsl(0, 0%, 0%) 100%), linear-gradient(to right, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%);"
    :disabled="disabled"
  />
</template>

<script>
import util from "@/components/util";

import BColorPanel from '../../Basic/b-color-panel'

export default {
  name: "b-color-sl-panel",
  components: { BColorPanel, },
  mixins: [ util.mixins.color.colorPanel, ],
};
</script>
