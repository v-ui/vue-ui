<template>
  <div class="d-flex d-print-none align-items-end justify-content-between py-1">
    <!-- <font>共 {{ count }} 条数据，本页 {{ num }} 条，共 {{ pageCount }} 页，第 {{ pageNumber }} 页，每页 {{ pageSize }} 条，跳转至第 {{ pageNumber }} 页</font> -->
    <font
      class="d-flex align-items-center"
      style="min-width: 550px"
    >
      {{ dataSize }} /
      {{ dataCount }} 条&nbsp;&nbsp;
      {{ pageNumber }} /
      {{ pageCount }} 页&nbsp;&nbsp;
      每页
      <b-select
        v-model="pageSize"
        class="d-inline-block mx-1"
        :list="pageSizeList"
        size="sm"
        hide-null
      />条&nbsp;&nbsp;
      <b-pagination
        v-model.number="pageNumber"
        start="1"
        :end="pageCount"
      >
        <b-number
          v-model.number="pageNumber"
          length="5"
          min="1"
          :max="pageCount"
          hide-button
        />
        <!-- <b-button class="mx-1" size="sm" value="跳转" outline /> -->
      </b-pagination>
    </font>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BNumber from "@/components/form/b-number.vue";
import BSelect from "@/components/form/b-select.vue";
import BPagination from "@/components/base/Pagination/b-pag";

export default {
  name: 'GridPagination',
  components: { BNumber, BSelect, BPagination, },
  model: {
    prop: 'page',
    event: 'page:changed'
  },
  props: {
    dataCount: util.props.UNumber, // 总条数
    page: {
      type: [Object, Number],
      default: 1,
    }, // 页数
  },
  data() {
    return {
      pageSizeList: [25, 50, 75, 100],
      pageNumber: this.page || 1, // 页码
      pageSize: 25 // 每页条数
    }
  },
  computed: {
    start: function() {
      return this.pageSize * (this.pageNumber - 1)
    },
    pageCount: function() {
      // 总页数
      return Number.parseInt(this.dataCount / this.pageSize) +
        (this.dataCount % this.pageSize == 0 ? 0 : 1)
    },
    dataSize: function() {
      // 本页条数
      return this.pageSize * this.pageNumber > this.dataCount
        ? this.dataCount - this.start
        : this.pageSize
    },
  },
  watch: {
    start: function() {
      this.$emit('page:changed', { start: this.start, end: this.start + this.pageSize })
    },
    page: function(value) {
      if (typeof value === 'number') this.pageNumber = value
    },
    pageCount: function(value) {
      if (this.pageNumber > value) this.pageNumber = value
    },
  },
  mounted() {
    this.$emit('page:changed', { start: this.start, end: this.start + this.pageSize })
  },
}
</script>
