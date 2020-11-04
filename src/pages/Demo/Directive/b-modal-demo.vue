<template>
  <div>
    <b-modal
      v-if="show"
      id="exampleModal"
      title="title text"
      content="content text"
      :size="size"
      :status="status"
    />
    <b-modal
      v-if="show"
      id="slotModal"
      title="slot Modal"
      :set="set"
      :size="size"
      :drawer="drawer"
      :scrol="scrol"
    >
      you can add any string and DOM
    </b-modal>
    <b-modal
      v-if="show"
      id="iconModal"
      title="icon Modal"
      content="content text"
      :icon="icon"
    />
    <b-modal
      v-if="show"
      id="scrolModal"
      title="scrol Modal"
      content="content text"
      :status="status"
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
        class="btn btn-primary"
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
        class="btn btn-primary"
        @click="show=true; icon='fas fa-envelope'"
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
        class="btn btn-primary"
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
        class="btn btn-primary"
        @click="status='default'; show=true"
      >
        status: default
      </button>
      <button
        v-modal="'#exampleModal'"
        type="button"
        class="btn btn-primary"
        @click="status='info'; show=true"
      >
        status: info
      </button>
      <button
        v-modal="'#exampleModal'"
        type="button"
        class="btn btn-primary"
        @click="status='system'; show=true"
      >
        status: system
      </button>
      <button
        v-modal="'#exampleModal'"
        type="button"
        class="btn btn-primary"
        @click="status='issue'; show=true"
      >
        status: issue
      </button>
      <button
        v-modal="'#exampleModal'"
        type="button"
        class="btn btn-primary"
        @click="status='warning'; show=true"
      >
        status: warning
      </button>
      <button
        v-modal="'#exampleModal'"
        type="button"
        class="btn btn-primary"
        @click="status='error'; show=true"
      >
        status: error
      </button>
      <button
        v-modal="'#exampleModal'"
        type="button"
        class="btn btn-primary"
        @click="status='success'; show='true'"
      >
        status: success
      </button>
      <button
        v-modal="'#exampleModal'"
        type="button"
        class="btn btn-primary"
        @click="status='danger'; show='true'"
      >
        status: danger
      </button>
    </div>
    <div class="row align-items-center py-1">
      <font class="col-1">
        drawer
      </font>
      <div class="col-1">
        <input
          id="drawer"
          class="mr-1"
          type="checkbox"
          @change="drawer=!drawer"
        >
        <label for="drawer">drawer</label>
      </div>
    </div>
    <div class="row align-items-center py-1">
      <font class="col-1">
        scrol
      </font>
      <div class="col-1">
        <input
          id="scrol"
          class="mr-1"
          type="checkbox"
          @change="scrol=!scrol"
        >
        <label for="scrol">scrol</label>
      </div>
    </div>
    <div class="row align-items-center py-1">
      <font class="col-1">
        size
      </font>
      <div class="col-3">
        <input
          id="null"
          class="mr-1"
          type="radio"
          name="size"
          checked
          @change="size=''"
        >
        <label
          class="mr-2"
          for="null"
        >default</label>
        <input
          id="xl"
          class="mr-1"
          type="radio"
          name="size"
          @change="size='xl'"
        >
        <label
          class="mr-2"
          for="xl"
        >xl</label>
        <input
          id="lg"
          class="mr-1"
          type="radio"
          name="size"
          @change="size='lg'"
        >
        <label
          class="mr-2"
          for="lg"
        >lg</label>
        <input
          id="sm"
          class="mr-1"
          type="radio"
          name="size"
          @change="size='sm'"
        >
        <label
          class="mr-2"
          for="sm"
        >sm</label>
      </div>
    </div>
    <div class="row py-1">
      <font class="col-1">
        show model
      </font>
      <button
        v-modal="'#slotModal'"
        type="button"
        class="col-auto btn btn-primary"
        @click="show=true"
      >
        Modal
      </button>
    </div>
    <div class="row py-1">
      <font class="col-1">
        position
      </font>
      <button
        v-modal="'#slotModal'"
        type="button"
        class="btn btn-primary"
        @click="set='top'; show=true"
      >
        position: top(default)
      </button>
      <button
        v-modal="'#slotModal'"
        type="button"
        class="btn btn-primary"
        @click="set='center'; show=true"
      >
        position: center
      </button>
      <button
        v-modal="'#slotModal'"
        type="button"
        class="btn btn-primary"
        @click="set='down'; show=true"
      >
        position: down
      </button>
      <button
        v-modal="'#slotModal'"
        type="button"
        class="btn btn-primary"
        @click="set='left'; show=true"
      >
        position: left
      </button>
      <button
        v-modal="'#slotModal'"
        type="button"
        class="btn btn-primary"
        @click="set='right'; show=true"
      >
        position: right
      </button>
    </div>
  </div>
</template>

<script>
import BModal from '@/components/base/Modal/b-modal.vue'

export default {
    name: 'BModalDemo',
    components: { BModal, },
    data () {
      return {
        status: '',
        show: false,
        scrol: false,
        drawer: false,
        set: '',
        size: '',
        icon: '',
      }
    },
}
</script>
