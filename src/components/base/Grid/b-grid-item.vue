<template>
  <b-button
    class="rounded-pill w-100 m-1 p-2"
    style="min-width: 2.2em"
    :class="objClass"
    :disabled="disabled"
    :aria-selected="isSelected"
    @click.native="$emit('item:click', item)"
  >
    {{ getDisplay(item) }}
    <b-info
      :info="item.info"
      class="m-0"
      style="font-size: 0.5em"
    />
  </b-button>
</template>

<script>
import util from "@/components/util/index.js";

import BButton from "@/components/basic/Button/basic-button.vue";
import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BGridItem",
  components: { BButton, BInfo },
  mixins: [ util.mixins.select.selectItem, ],
  props: {
    disabled: util.props.Boolean,
  },
  computed: {
    objClass: function() {
      return this.isSelected
        ? "border-2 border-primary bg-transparent text-body"
        : "border-0 bg-transparent text-body";
    },
  }
};
</script>
