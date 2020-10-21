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
      <b-slide class="col-10" start="20" end="50" />
    </div>
    <div class="row py-1">
      <font class="col-1">
        min/max:
      </font>
      <b-slide class="col-10" min="-100" max="0" start="-80" end="-50" />
    </div>
    <div class="row py-1">
      <font class="col-1">
        step:
      </font>
      <b-slide class="col-10" start="20" end="50" step="2" />
    </div>
    <div class="row py-1">
      <font class="col-1">
        info:
      </font>
      <b-slide
        class="col-10"
        start="20"
        end="50"
        info="info text"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        disabled:
      </font>
      <b-slide
        class="col-2"
        start="20"
        end="50"
        size="sm"
        disabled
      />
      <font class="col-1">
        startDisabled:
      </font>
      <b-slide
        class="col-2"
        start="20"
        end="50"
        size="sm"
        startDisabled
      />
      <font class="col-1">
        endDisabled:
      </font>
      <b-slide
        class="col-2"
        start="20"
        end="50"
        size="sm"
        endDiabled
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        size(sm):
      </font>
      <b-slide
        class="col-2"
        start="20"
        end="50"
        size="sm"
      />
      <font class="col-1">
        size(default):
      </font>
      <b-slide
        class="col-2"
        start="20"
        end="50"
      />
      <font class="col-1">
        size(lg):
      </font>
      <b-slide
        class="col-2"
        start="20"
        end="50"
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
            start="20"
            end="50"
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
    }
  },
}
</script>
