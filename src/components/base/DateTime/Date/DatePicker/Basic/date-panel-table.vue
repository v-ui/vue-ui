<template>
  <table class="table table-sm text-center w-100 m-1" :class="border ? 'table-bordered' : 'table-borderless'">
    <tr v-for="index in rowCount" :key="'tr-'+index">
      <td v-for="(item, itemIndex) in list.slice((index-1)*colCount, index*colCount)" :key="'td-'+itemIndex" class="p-0">
        <slot name="item" :item="item">
          {{ item }}
        </slot>
      </td>
    </tr>
  </table>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: 'date-panel-table',
  props: {
    list: util.props.Array,
    colCount: util.props.UInt,
    border: util.props.Boolean,
    disabled: util.props.Boolean,
  },
  computed: {
    rowCount: function() {
      return Math.ceil(this.list.length / this.colCount);
    },
  },
}
</script>
