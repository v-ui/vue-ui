<template>
  <div>
    <div class="row">
      <font class="col-2">
      </font>
      <font class="col-4">
        b-grid-row
      </font>
      <font class="col-4">
        b-grid-table
      </font>
    </div>
    <div class="row">
      <font class="col-2">
        list
      </font>
       <b-grid-row
        class="col-4"
        :list="list"
      />
      <div class="col-4">
        <b-grid-table
          :list="list"
        />
      </div>
    </div>
    <div class="row">
      <font class="col-2">
        colCount
      </font>
      <div class="col-4">
        <b-range
          v-model="col"
          min="1"
          max="12"
        />
        <b-grid-row
          :list="list"
          :col-count="col"
        />
      </div>
      <div class="col-4">
        <b-range
          v-model="col"
          min="1"
          max="12"
        />
        <b-grid-table
          :list="list"
          :col-count="col"
        />
      </div>
    </div>
    <div class="row">
      <font class="col-2">
        disabled
      </font>
      <b-grid-row
        class="col-4"
        :list="list"
        disabled
      />
      <div class="col-4">
        <b-grid-table
          :list="list"
          disabled
        />
      </div>
    </div>
    <div class="row">
      <font class="col-2">
        v-model multiple='false'(default)<br>
        {{ value1 }}
      </font>
      <b-grid-row
        v-model="value1"
        class="col-4"
        :list="list"
      />
      <div class="col-4">
        <b-grid-table
          :list="list"
          border
        />
      </div>
    </div>
    <div class="row">
      <font class="col-2">
        v-model multiple='true'(default)<br>
        {{ value2 }}
      </font>
      <b-grid-row
        v-model="value2"
        class="col-4"
        :list="list"
        multiple
      />
      <div class="col-4">
        <b-grid-table
          v-model="value2"
          :list="list"
          multiple
        />
      </div>
    </div>
  </div>
</template>

<script>
import BGridRow from '@/components/base/Grid/b-grid-row.vue'
import BGridTable from '@/components/base/Grid/b-grid-table.vue'

import BRange from '@/components/form/b-range.vue'
export default {
  name: 'BGridDemo',
  components: {
    BGridRow,
    BGridTable,
    BRange,
  },
  data() {
    return {
      list: [
        { value: "value1", label: "label1", info: "info text" },
        { value: "value2", label: "label2", info: "info text" },
        { value: "value3", label: "label3" },
        { value: "value4", label: "label4" },
        { value: "value5", label: "label5" },
        { value: "value6", label: "disabled", disabled: true },
      ],
      value1: { value: "value1", label: "label1" },
      value2: [
        { value: "value1", label: "label1" },
        { value: "value2", label: "label2" },
        { value: "value3", label: "label3" }
      ],
      col: 6,
    }
  },
}
</script>
