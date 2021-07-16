<template>
  <div>
    <b-table
      v-model="selectedValue"
      :head="head"
      :list="data"
      :operate="operate"
      :row-style="rowStyle"
      :multiple="isMultiple"
    >
      <template #body-_serial="{ index }">
        <b-table-serial :index="index" />
      </template>
      <template #head-check>
        <b-button
          color="link"
          class="px-0"
          value="反选"
          @click="headClick"
        />
      </template>
      <template #body-check="{ row }">
        <b-check
          type="checkbox"
          :checked="isSelected(row)"
          @input="input($event, row)"
        />
      </template>
      <template #body-_operate>
        <b-table-operate :operate="operate.value" />
      </template>
      <template #body-1-1-1>
        slot
      </template>
    </b-table>
    {{ selectedValue }}
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BTable from '@/components/content/Table/b-table.vue'
import BTableSerial from '@/components/content/Table/container/b-table-serial.vue'
import BTableOperate from '@/components/content/Table/container/b-table-operate.vue'

import BButton from '@/components/basic/Button/basic-button.vue';
import BCheck from "@/components/form/Check/b-check.vue";
export default {
  name: 'BTableDemo',
  components: { BTable, BTableSerial, BTableOperate, BButton, BCheck },
  mixins: [ util.mixins.select.check ],
  data() {
    return {

      isMultiple: true,
      head: [
        {
          icon: "hash",
          field: "_serial",
          colStyle: 'width: 35px;',
          canNotSort: true,
        },
        {
          label: "id",
          icon: 'key-fill',
          field: "id",
          colClass: "bg-info",
          colStyle: "width: 58px;"
        },
        {
          field: "check",
          colStyle: "width: 58px;",
          canNotSort: true,
        },
        {
          label: "name",
          field: "name",
          colStyle: "width: 100px;",
          format: value => "name_" + value
        },
        { label: "sex", field: "sex", colStyle: "width: 100px;" },
        {
          label: "age",
          field: "age",
          colStyle: "width: 58px;",
          cellStyle: value => ({ class: Number(value) ? "bg-success" : "bg-danger" })
        },
        {
          label: "1",
          field: "1",
          children: [
            {
              label: "1-1",
              field: "1-1",
              children: [
                { label: "1-1-1", field: "1-1-1" },
                { label: "1-1-2", field: "1-1-2" }
              ]
            },
            { label: "1-2", field: "1-2" },
            {
              label: "1-3",
              field: "1-3",
              children: [
                { label: "1-3-1", field: "1-3-1" },
                { label: "1-3-2", field: "1-3-2" }
              ]
            }
          ]
        },
        {
          label: "2",
          field: "2",
          children: [
            {
              label: "2-1",
              field: "2-1",
              children: [
                { label: "2-1-1", field: "2-1-1" },
                { label: "2-1-2", field: "2-1-2" }
              ]
            },
            {
              label: "2-2",
              field: "2-2",
              children: [
                { label: "2-2-1", field: "2-2-1" },
                { label: "2-2-2", field: "2-2-2" }
              ]
            },
            { label: "2-3", field: "2-3" }
          ]
        }
      ],
      operate: {
        index: 3,
        value: ["check", "view", "edit", "delete", "flow"]
      },
      rowStyle: {
        class: function(row) {
          if (row && row.age && Number(row.age) == 5) return "text-warning";
        }
      },
      data: [
        { id: "id_1", name: "mack", sex: "man", age: 1 },
        { id: "id_2", name: "jack", sex: "man", age: 2 },
        { id: "id_3", name: "mack", sex: "man", },
        { id: "id_4", name: "mack", sex: "man", age: 3 },
        { id: "id_5", name: "mack", sex: "man", age: 4 },
        { id: "id_6", name: "mack", sex: "man", age: 5 },
        { id: "id_7", name: "mack", sex: "man", age: 6 },
        { id: "id_8", name: "mack", sex: "man", age: 7 },
        { id: "id_9", name: "mack", sex: "man", age: 8 },
        { id: "id_10", name: "mack", sex: "man" },
        { id: "id_11", name: "mack", sex: "man", age: 9 },
        { id: "id_12", name: "mack", sex: "man", age: 10 },
        { id: "id_13", name: "mack", sex: "woman", age: 11 },

      ]
    }
  },
  methods: {
    itemClick: function(item) {
      if (this.isMultiple) {
        const value = this.getKey(item)
        let index = this.selectedMap.indexOf(value)
        index >= 0
          ? this.selectedValue.splice(index, 1)
          : this.selectedValue.push(item)
      } else {
        this.selectedValue = item
      }
      this.$emit('item:click', this.selectedValue)
    },
    input: function(event, item) {
      if (event.target.checked) {
        this.selectedValue.push(item);
      } else {
        const value = this.getKey(item)
        let index = this.selectedMap.indexOf(value);
        if (index >= 0) this.selectedValue.splice(index, 1);
      }
    },
    headClick: function() {
      this.data.forEach(e => {
        const value = this.getKey(e)
        let index = this.selectedMap.indexOf(value);
        index >= 0
          ? this.selectedValue.splice(index, 1)
          : this.selectedValue.push(e)
      })

    },
  },
}
</script>
