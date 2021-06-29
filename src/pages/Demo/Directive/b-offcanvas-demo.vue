<template>
  <div>
    <h2>b-offcanvas(v-canvas)</h2>
    <hr>
    <b-offcanvas
      id="exampleOffcanvas"
      title="title text"
      content="content text"
      :scroll="scroll"
      :backdrop="backdrop"
      :status="status"
    />
    <b-offcanvas
      id="iconOffcanvas"
      title="title text"
      content="content text"
      :icon="icon"
    />
    <b-offcanvas
      id="slotOffcanvas"
      title="slot offcanvas"
    >
      you can add any string and DOM
    </b-offcanvas>
    <div class="row py-1">
      <font class="col-1">
        default
      </font>
      <button
        v-canvas="'#exampleOffcanvas'"
        type="button"
        class="btn btn-primary col-auto"
        @click="show=true"
      >
        default offcanvas
      </button>
    </div>
    <div class="row py-1">
      <font class="col-1">
        icon
      </font>
      <button
        v-canvas="'#iconOffcanvas'"
        type="button"
        class="btn btn-primary col-auto"
        @click="show=true; icon='envelope-fill'"
      >
        Offcanvas`s icon
      </button>
    </div>
    <div class="row py-1">
      <font class="col-1">
        slot
      </font>
      <button
        v-canvas="'#slotOffcanvas'"
        type="button"
        class="btn btn-primary col-auto"
        @click="show=true;"
      >
        Offcanvas`s slot
      </button>
    </div>
    <div class="row py-1">
      <font class="col-1">
        status
      </font>
      <button
        v-canvas="'#exampleOffcanvas'"
        type="button"
        class="btn btn-primary col-auto"
        @click="status='default'; show=true"
      >
        status: default
      </button>
      <button
        v-canvas="'#exampleOffcanvas'"
        type="button"
        class="btn btn-primary col-auto"
        @click="status='info'; show=true"
      >
        status: info
      </button>
      <button
        v-canvas="'#exampleOffcanvas'"
        type="button"
        class="btn btn-primary col-auto"
        @click="status='system'; show=true"
      >
        status: system
      </button>
      <button
        v-canvas="'#exampleOffcanvas'"
        type="button"
        class="btn btn-primary col-auto"
        @click="status='issue'; show=true"
      >
        status: issue
      </button>
      <button
        v-canvas="'#exampleOffcanvas'"
        type="button"
        class="btn btn-primary col-auto"
        @click="status='warning'; show=true"
      >
        status: warning
      </button>
      <button
        v-canvas="'#exampleOffcanvas'"
        type="button"
        class="btn btn-primary col-auto"
        @click="status='error'; show=true"
      >
        status: error
      </button>
      <button
        v-canvas="'#exampleOffcanvas'"
        type="button"
        class="btn btn-primary col-auto"
        @click="status='success'; show='true'"
      >
        status: success
      </button>
      <button
        v-canvas="'#exampleOffcanvas'"
        type="button"
        class="btn btn-primary col-auto"
        @click="status='danger'; show='true'"
      >
        status: danger
      </button>
    </div>
    以下两种属性不具有响应性特性（以第一次打开时为准）
    <div class="row align-items-center py-1">
      <font class="col-1">
        scroll
      </font>
      <div class="col-1">
        <b-switch v-model="scroll" label="scroll" />
      </div>
    </div>
    <div class="row align-items-center py-1">
      <font class="col-1">
        backdrop
      </font>
      <div class="col-1">
        <b-switch v-model="backdrop" label="backdrop" />
      </div>
    </div>
    <div class="row align-items-center py-1">
      <font class="col-1">
      </font>
      <div class="col-1">
        <button
          v-canvas="'#exampleOffcanvas'"
          type="button"
          class="btn btn-primary col-auto"
          @click="show=true"
        >
          default offcanvas
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BOffcanvas from '@/components/base/offcanvas/b-offcanvas.vue'

import BSwitch from '@/components/form/b-switch.vue'

export default {
  name: 'BOffcanvasDemo',
  components: { BOffcanvas, BSwitch, },
  data() {
    return {
      status: '',
      show: false,
      scroll: false,
      backdrop: true,
      icon: '',
    }
  },
}
</script>
