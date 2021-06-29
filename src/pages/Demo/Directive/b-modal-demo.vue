<template>
  <div>
    <b-modal
      id="exampleModal"
      title="title text"
      content="content text"
      :size="size"
      :center="center"
      :backdrop="backdrop"
      :keyboard="keyboard"
      :status="status"
    />
    <b-modal
      id="slotModal"
      title="slot Modal"
    >
      you can add any string and DOM
    </b-modal>
    <b-modal
      id="iconModal"
      title="icon Modal"
      content="content text"
      :icon="icon"
    />
    <b-modal
      id="scrolModal"
      title="scrol Modal"
      content="content text"
      scrol
    >
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
      there is too long<br>
    </b-modal>
    <div class="row py-1">
      <font class="col-1">
        default
      </font>
      <button
        v-modal="'#exampleModal'"
        type="button"
        class="btn btn-primary col-auto"
        @click="show=true"
      >
        default Modal
      </button>
    </div>
    <div class="row py-1">
      <font class="col-1">
        icon
      </font>
      <button
        v-modal="'#iconModal'"
        type="button"
        class="btn btn-primary col-auto"
        @click="show=true; icon='envelope-fill'"
      >
        Modal`s icon
      </button>
    </div>
    <div class="row py-1">
      <font class="col-1">
        slot
      </font>
      <button
        v-modal="'#slotModal'"
        type="button"
        class="btn btn-primary col-auto"
        @click="show=true;"
      >
        Modal`s slot
      </button>
    </div>
    <div class="row py-1">
      <font class="col-1">
        status
      </font>
      <button
        v-modal="'#exampleModal'"
        type="button"
        class="btn btn-primary col-auto"
        @click="status='default'; show=true"
      >
        status: default
      </button>
      <button
        v-modal="'#exampleModal'"
        type="button"
        class="btn btn-primary col-auto"
        @click="status='info'; show=true"
      >
        status: info
      </button>
      <button
        v-modal="'#exampleModal'"
        type="button"
        class="btn btn-primary col-auto"
        @click="status='system'; show=true"
      >
        status: system
      </button>
      <button
        v-modal="'#exampleModal'"
        type="button"
        class="btn btn-primary col-auto"
        @click="status='issue'; show=true"
      >
        status: issue
      </button>
      <button
        v-modal="'#exampleModal'"
        type="button"
        class="btn btn-primary col-auto"
        @click="status='warning'; show=true"
      >
        status: warning
      </button>
      <button
        v-modal="'#exampleModal'"
        type="button"
        class="btn btn-primary col-auto"
        @click="status='error'; show=true"
      >
        status: error
      </button>
      <button
        v-modal="'#exampleModal'"
        type="button"
        class="btn btn-primary col-auto"
        @click="status='success'; show='true'"
      >
        status: success
      </button>
      <button
        v-modal="'#exampleModal'"
        type="button"
        class="btn btn-primary col-auto"
        @click="status='danger'; show='true'"
      >
        status: danger
      </button>
    </div>
    <div class="row align-items-center py-1">
      <font class="col-1">
        scrol
      </font>
      <div class="col-1">

        <button
          v-modal="'#scrolModal'"
          type="button"
          class="btn btn-primary col-auto"
        >
          scrol
        </button>
      </div>
    </div>
    <div class="row align-items-center py-1">
      <font class="col-1">
        center
      </font>
      <div class="col-1">
        <b-switch v-model="center" label="center" />
      </div>
    </div>
    <div class="row align-items-center py-1">
      <font class="col-1">
        size
      </font>
      <div class="col-3">
        <input
          id="null"
          class="me-1"
          type="radio"
          name="size"
          checked
          @change="size=''"
        >
        <label
          class="me-2"
          for="null"
        >default</label>
        <input
          id="xl"
          class="me-1"
          type="radio"
          name="size"
          @change="size='xl'"
        >
        <label
          class="me-2"
          for="xl"
        >xl</label>
        <input
          id="lg"
          class="me-1"
          type="radio"
          name="size"
          @change="size='lg'"
        >
        <label
          class="me-2"
          for="lg"
        >lg</label>
        <input
          id="sm"
          class="me-1"
          type="radio"
          name="size"
          @change="size='sm'"
        >
        <label
          class="me-2"
          for="sm"
        >sm</label>
      </div>
    </div>

    以下两种属性不具有响应性特性（以第一次打开时为准）
    <div class="row align-items-center py-1">
      <font class="col-1">
        keyboard
      </font>
      <div class="col-1">
        <b-switch v-model="keyboard" label="keyboard" />
      </div>
    </div>

    <div class="row align-items-center py-1">
      <font class="col-1">
        backdrop
      </font>
      <div class="col-3">
        <input
          id="true"
          class="me-1"
          type="radio"
          name="backdrop"
          checked
          @change="backdrop=true"
        >
        <label
          class="me-2"
          for="true"
        >true(default)</label>
        <input
          id="false"
          class="me-1"
          type="radio"
          name="backdrop"
          @change="backdrop=false"
        >
        <label
          class="me-2"
          for="false"
        >false</label>
        <input
          id="static"
          class="me-1"
          type="radio"
          name="backdrop"
          @change="backdrop='static'"
        >
        <label
          class="me-2"
          for="static"
        >static</label>
      </div>
    </div>


    <div class="row py-1">
      <font class="col-1">
        show model
      </font>
      <button
        v-modal="{ target:'#exampleModal', keyboard: false }"
        type="button"
        class="col-auto btn btn-primary"
        @click="show=true"
      >
        Modal
      </button>
    </div>
  </div>
</template>

<script>
import BModal from '@/components/base/Modal/b-modal.vue'

import BSwitch from '@/components/form/b-switch.vue'

export default {
    name: 'BModalDemo',
    components: { BModal, BSwitch, },
    data () {
      return {
        status: '',
        show: false,
        center: false,
        backdrop: 'true',
        keyboard: true,
        size: '',
        icon: '',
      }
    },
}
</script>
