<template>
  <table class="tabel text-center w-100 m-1">
    <tr v-for="index in rowCount" :key="'tr-'+index">
      <td v-for="(item, itemId) in list.slice((index-1)*colCount, index*colCount)" :key="'td-'+itemId" :item="item">
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
  name: 'date-panel-tabel',
  props: {
    list: util.props.Array,
    colCount: util.props.UInt,
    disabled: util.props.Boolean,
  },
  computed: {
    rowCount: function() {
      return Math.ceil(this.list.length / this.colCount);
    },
  },
}
</script>
