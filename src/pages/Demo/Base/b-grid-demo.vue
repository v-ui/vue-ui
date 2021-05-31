<template>
  <div>
    <h2>b-grid-row</h2>
    <hr>
    <div class="row">
      <font class="col-2 text-center">
        list
      </font>
      <font class="col-2 text-center">
        colCount
      </font>
      <font class="col-2 text-center">
        disabled
      </font>
      <font class="col-2 text-center">
        v-model multiple='false'(default)<br>
        {{ value1 }}
      </font>
      <font class="col-2 text-center">
        v-model multiple='true'(default)<br>
        {{ value2 }}
      </font>
    </div>
    <div class="row">
      <b-grid-row
        class="col-2"
        :list="list"
      />
      <div class="col-2">
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
      <b-grid-row
        class="col-2"
        :list="list"
        disabled
      />
      <b-grid-row
        v-model="value1"
        class="col-2"
        :list="list"
      />
      <b-grid-row
        v-model="value2"
        class="col-2"
        :list="list"
        multiple
      />
    </div>
    <h2>b-grid-table</h2>
    <hr>
    <div class="row">
      <font class="col-2 text-center">
        list
      </font>
      <font class="col-2 text-center">
        colCount
      </font>
      <font class="col-2 text-center">
        border
      </font>
      <font class="col-2 text-center">
        disabled
      </font>
      <font class="col-2 text-center">
        v-model multiple='false'(default)<br>
        {{ value1 }}
      </font>
      <font class="col-2 text-center">
        v-model multiple='true'(default)<br>
        {{ value2 }}
      </font>
    </div>
    <div class="row">
      <b-grid-table
        class="col-2"
        :list="list"
      />
      <div class="col-2">
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
      <b-grid-table
        class="col-2"
        :list="list"
        disabled
      />
      <b-grid-table
        class="col-2"
        :list="list"
        border
      />
      <b-grid-table
        v-model="value1"
        class="col-2"
        :list="list"
      />
      <b-grid-table
        v-model="value2"
        class="col-2"
        :list="list"
        multiple
      />
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
