<template>
  <div>
    <h2>b-slide</h2>
    <hr>
    <div class="row py-1">
      <font class="col-1">
        default:
      </font>
      <b-step
        class="col-10"
        :list="list"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        slot:
      </font>
      <b-step
        class="col-10"
        :list="list"
      >
        <template #item="{ color, title, select, info }">
          color: {{ color }}
          title: {{ title }}
          select: {{ select }}
          info: {{ info }}
        </template>
      </b-step>
    </div>
    <div class="row py-1">
      <font class="col-1">
        v-model:
      </font>
      <b-step
        v-model="select"
        class="col-10"
        :list="list"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        column:
      </font>
      <b-step
        class="col-10"
        column
        :list="list"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        size:
      </font>
      <font class="col-1">
        sm:
      </font>
      <b-step
        class="col-9"
        size="sm"
        :list="list"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        size:
      </font>
      <font class="col-1">
        (default):
      </font>
      <b-step
        class="col-9"
        :list="list"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        size:
      </font>
      <font class="col-1">
        lg:
      </font>
      <b-step
        class="col-9"
        size="lg"
        :list="list"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        set:
      </font>
      <div class="col-11 row py-1">
        <div class="row py-1">
          <font class="col-1">
            up:
          </font>
          <b-step
            class="col-10"
            set="up"
            :list="list"
          />
        </div>
        <div class="row py-1">
          <font class="col-1">
            end(default):
          </font>
          <b-step
            class="col-10"
            set="end"
            :list="list"
          />
        </div>
        <div class="row py-1">
          <font class="col-1">
            down:
          </font>
          <b-step
            class="col-10"
            set="down"
            :list="list"
          />
        </div>
        <div class="row py-1">
          <font class="col-1">
            start:
          </font>
          <b-step
            class="col-10"
            set="start"
            :list="list"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BStep from '@/components/base/Step/b-step.vue'

export default {
  name: 'BStepDemo',
  components: { BStep, },
  data() {
    return {
      list: [
        { status: 'default', label: 'default', value: 'default', info: "info text is tooo ooooooo ooooooo oooooo long",},
        { status: 'success', label: 'success', value: 'success', info: "info text",},
        { status: 'warning', label: 'warning', value: 'warning', info: "info text",},
        { status: 'error',   label: 'error',   value: 'error',    info: "info text",},
        { status: 'danger',  label: 'danger',  value: 'danger',  info: "info text",},
      ],
      select: { status: 'success', label: 'success', value: 'success', info: "info text",},
    }
  },
}
</script>
