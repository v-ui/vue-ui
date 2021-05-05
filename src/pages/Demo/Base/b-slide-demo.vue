<template>
  <div>
    <h2>b-slide</h2>
    <hr>
    <div class="row py-1">
      <font class="col-1">
        default:
      </font>
      <b-slide class="col-10" />
    </div>
    <div class="row py-1">
      <font class="col-1">
        start/end:
      </font>
      <b-slide
        class="col-10"
        :value="value"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        min/max:
      </font>
      <b-slide
        class="col-10"
        min="-100"
        max="0"
        :value="{start: -80, end: -50}"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        step:
      </font>
      <b-slide
        class="col-10"
        :value="value"
        step="2"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        info:
      </font>
      <b-slide
        class="col-10"
        :value="value"
        info="info text"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        v-model:
        {{ `{start: ${value2.start}, end: ${value2.end} }` }}
      </font>
      <b-slide
        v-model="value2"
        class="col-10"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        readonly:
      </font>
      <b-slide
        class="col-10"
        :value="value"
        readonly
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        disabled:
      </font>
      <font class="col-1">
        disabled:
      </font>
      <b-slide
        class="col-2"
        :value="value"
        disabled
      />
      <font class="col-1">
        startDisabled:
      </font>
      <b-slide
        class="col-2"
        :value="value"
        start-disabled
      />
      <font class="col-1">
        endDisabled:
      </font>
      <b-slide
        class="col-2"
        :value="value"
        end-diabled
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        size:
      </font>
      <font class="col-1">
        sm:
      </font>
      <b-slide
        class="col-2"
        :value="value"
        size="sm"
      />
      <font class="col-1">
        (default):
      </font>
      <b-slide
        class="col-2"
        :value="value"
      />
      <font class="col-1">
        lg:
      </font>
      <b-slide
        class="col-2"
        :value="value"
        size="lg"
      />
    </div>
    <h4>color</h4>
    <hr>
    <div class="row py-1">
      <font class="col-1">
        color:
      </font>
      <div class="col-11">
        <template v-for="color in colors">
          {{ color || '(default)' }}:
          <b-slide
            :key="color"
            class="py-1"
            :color="color"
            :value="value"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import variables from "@/components/util/variables.js";

import BSlide from '@/components/base/Slide/b-slide.vue'

export default {
  name: 'BSlideDemo',
  components: { BSlide, },
  data() {
    return {
      colors: variables.base.color.bg,
      value: {start: 20, end: 50},
      value2: {start: 20, end: 50},
    }
  },
}
</script>
