<template>
  <div>
    <h2>b-color</h2>
    <br>
    <h4>b-color-panel</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
      </font>
      <b-color-picker />
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <b-color-picker disabled />
    </div>
    <h2>b-color</h2>
    <br>
    <h4>基础属性</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
      </font>
      <b-color />
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <b-color disabled />
    </div>
  </div>
</template>

<script>
import BColorPicker from '@/components/form/Color/Picker/b-color-picker.vue'
import BColor from '@/components/form/Color/b-color.vue'

export default {
  name: 'b-color-demo',
  components: { BColorPicker, BColor, },
}
</script>
