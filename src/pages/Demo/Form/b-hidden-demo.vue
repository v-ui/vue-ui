<template>
  <div>
    <h2>b-hidden(hidden 为隐藏元素)</h2>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
      </font>
      <b-hidden
        v-model="value"
        class="col-11"
      />
    </div>
  </div>
</template>

<script>
import BHidden from '@/components/form/b-hidden.vue'

export default {
    name: 'BHiddenDemo',
    components: { BHidden, },
    data () {
        return {
            value: 'uid',
        }
    }
}
</script>
