<template>
  <div>
    <b-modal
      v-if="show"
      id="exampleModal"
      title="title text"
      content="content text"
      :center="center"
      :size="size"
      :status="status"
    />
    <b-modal
      v-if="show"
      id="slotModal"
      title="slot Modal"
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
      :scrol="scrol"
      :center="center"
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
        type="button"
        class="btn btn-primary"
        v-modal="'#exampleModal'"
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
        type="button"
        class="btn btn-primary"
        v-modal="'#iconModal'"
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
        type="button"
        class="btn btn-primary"
        v-modal="'#slotModal'"
        @click="show=true;"
      >
        Modal`s slot
      </button>
    </div>
    <div class="row align-items-center py-1">
      <font class="col-1">
        center
      </font>
      <div class="col-1">
        <input
          id="center"
          class="mr-1"
          type="checkbox"
          @change="center=!center"
        >
        <label for="center">center</label>
      </div>
      <button
        type="button"
        class="col-auto btn btn-primary"
        v-modal="'#exampleModal'"
        @click="show=true"
      >
        center Modal
      </button>
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
      <button
        type="button"
        class="col-auto btn btn-primary"
        v-modal="'#scrolModal'"
        @click="show=true"
      >
        scrol Modal
      </button>
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
      <button
        type="button"
        class="col-auto btn btn-primary"
        v-modal="'#exampleModal'"
        @click="show=true"
      >
        size: {{ size }}
      </button>
    </div>
    <div class="row py-1">
      <font class="col-1">
        status
      </font>
      <button
        type="button"
        class="btn btn-primary"
        v-modal="'#exampleModal'"
        @click="status='info'; show=true"
      >
        status: info
      </button>
      <button
        type="button"
        class="btn btn-primary"
        v-modal="'#exampleModal'"
        @click="status='system'; show=true"
      >
        status: system
      </button>
      <button
        type="button"
        class="btn btn-primary"
        v-modal="'#exampleModal'"
        @click="status='issue'; show=true"
      >
        status: issue
      </button>
      <button
        type="button"
        class="btn btn-primary"
        v-modal="'#exampleModal'"
        @click="status='warning'; show=true"
      >
        status: warning
      </button>
      <button
        type="button"
        class="btn btn-primary"
        v-modal="'#exampleModal'"
        @click="status='error'; show=true"
      >
        status: error
      </button>
      <button
        type="button"
        class="btn btn-primary"
        v-modal="'#exampleModal'"
        @click="status='success'; show='true'"
      >
        status: success
      </button>
      <button
        type="button"
        class="btn btn-primary"
        v-modal="'#exampleModal'"
        @click="status='danger'; show='true'"
      >
        status: danger
      </button>
    </div>
  </div>
</template>

<script>
import BModal from '@/components/base/Bootstrap/Modal/b-modal.vue'

export default {
    name: 'BModalDemo',
    components: { BModal, },
    data () {
      return {
        status: '',
        show: false,
        center: false,
        scrol: false,
        size: '',
        icon: '',
      }
    },
}
</script>
