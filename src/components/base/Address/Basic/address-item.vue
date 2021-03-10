<template>
  <b-button
    class="p-1"
    color="link"
    :class="ObjClass"
    :disabled="disabled"
    :aria-selected="isSelected"
    @click.native="$emit('item:click', item)"
  >
    <slot>
      {{ item.name }}
    </slot>
  </b-button>
</template>

<script>
import util from "@/components/util/index.js";

import BButton from "@/components/basic/Button/basic-button.vue";
export default {
  name: 'address-item',
  components: { BButton },
  mixins: [ util.mixins.select.selectItem ],
  props: {
    disabled: util.props.Boolean,
  },
  computed: {
    ObjClass: function() {
      return this.isSelected ? '' : 'text-body'
    },
  },
}
</script>
