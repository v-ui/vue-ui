<template>
<div>
  <h2>b-data</h2>
  <hr>
  <h2>b-panel-list</h2>
  <hr>
  <b-data-sort class="border " :list="list" />
  </div>
</template>

<script>
import BDataSort from '@/components/content/Data/b-data-sort.vue'
export default {
  name: 'BDataDemo',
  components: { BDataSort, },
  data() {
    return {
      list: [
        { value: 'value-1', label: 'label-1' },
        { value: 'value-2', label: 'label-2' },
        { value: 'value-3', label: 'label-3' },
        { value: 'value-4', label: 'label-4' },
        { value: 'value-5', label: 'label-5' },
        { value: 'value-6', label: 'label-6' },
        { value: 'value-7', label: 'label-7' },
      ],
    }
  },
}
</script>
