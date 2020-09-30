<template>
  <div>
    <h2>b-range</h2>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
      </font>
      <b-range class="col-11" />
    </div>
    <div class="row">
      <font class="col-1">
        value:
      </font>
      <b-range
        class="col-11"
        value="15"
      />
    </div>
    <div class="row">
      <font class="col-1">
        hideValue:
      </font>
      <b-range
        class="col-11"
        hide-value
      />
    </div>
    <div class="row">
      <font class="col-1">
        info:
      </font>
      <b-range
        class="col-11"
        info="info text"
      />
    </div>
    <div class="row">
      <font class="col-1">
        prompt:
      </font>
      <b-range
        class="col-11"
        info="info text"
        prompt
      />
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <b-range
        class="col-11"
        disabled
      />
    </div>
    <div class="row">
      <font class="col-1">
        min-value<br>max-value:
      </font>
      <b-range
        class="col-11"
        min-value="min value"
        max-value="max value"
      />
    </div>
    <div class="row">
      <font class="col-1">
        min<br>max<br>step:
      </font>
      <b-range
        class="col-11"
        min="-10"
        max="10"
        step="5"
      />
    </div>
    <div class="row">
      <font class="col-1">
        v-model<br>{{ value }}:
      </font>
      <b-range
        v-model.number="value"
        class="col-11"
      />
    </div>
  </div>
</template>

<script>
import BRange from '@/components/base/Bootstrap/Form/b-range.vue'

export default {
    name: 'BRangeDemo',
    components: { BRange, },
    data () {
        return {
            value: 20,
        }
    },
}
</script>
