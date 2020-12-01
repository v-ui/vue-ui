<template>
  <div>
    <h2>b-color</h2>
    <br>
    <h4>b-color-panel</h4>
    <hr>
    <div class="row">
      <div class="col-3 row">
        <font class="col-3">
          default:
        </font>
        <b-color-picker />
      </div>
      <div class="col-3 row">
        <font class="col-3">
          disabled:
        </font>
        <b-color-picker disabled />
      </div>
      <div class="col-3 row">
        <font class="col-3">
          value:
        </font>
        <b-color-picker value="rgb(0, 255, 0)" />
      </div>
      <div class="col-3 row">
        <font class="col-3">
          v-model:
          <br>
          ({{ value }})
        </font>
        <b-color-picker v-model="value" />
      </div>
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
    <div class="row">
      <font class="col-1">
        v-model:
        <br>
        ({{ value2 }})
      </font>
      <b-color v-model="value2" />
    </div>
  </div>
</template>

<script>
import BColorPicker from '@/components/form/Color/Picker/b-color-picker.vue'
import BColor from '@/components/form/Color/b-color.vue'

export default {
  name: 'b-color-demo',
  components: { BColorPicker, BColor, },
  data() {
    return {
      value: 'rgb(0, 255, 0)',
      value2: 'rgb(0, 255, 0)',
    }
  },
}
</script>
