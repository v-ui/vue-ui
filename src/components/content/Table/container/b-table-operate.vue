<template>
  <div
    class="d-print-none align-middle text-center mx-1"
    data-type="operate"
  >
    <slot>
      <span
        v-for="(item, index) in oper"
        :key="index"
        v-tip:tooltip="item.value.tip"
        class="border-0 bg-transparent text-primary text-center p-0 mx-1"
        style="cursor: pointer; font-size: 1em"
        @click="$emit('tr:oper', item.type)"
      >
        <i :class="item.value.icon" />
      </span>
    </slot>
  </div>
</template>

<script>
import config from "@/config/index.js";

export default {
  name: 'BTableOperate',
  props: {
    operate: {
      type: Array,
      validator: value =>
        value.every &&
        value.every(e => Object.keys(config.ui.table.operate).includes(e))
    }
  },
  computed: {
    oper: function() {
      return this.operate.map(e => ({
        type: e,
        value: config.ui.table.operate[e]
      }));
    }
  }
}
</script>
