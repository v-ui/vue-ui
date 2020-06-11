<template>
  <th v-if="!hideSerial" class="align-middle text-center" data-type="serial">
    <slot>{{ number }}</slot>
  </th>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "table-serial-td",
  props: {
    number: util.props.UInt,
    hideSerial: util.props.Boolean,
  }
};
</script>
