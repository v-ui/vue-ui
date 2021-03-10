<template>
  <div>
    <h2>b-slide</h2>
    <hr>
    <div class="row py-1">
      <font class="col-1">
        default:
      </font>
      <b-step class="col-10" :list="defaultList" />
    </div>
    <div class="row py-1">
      <font class="col-1">
        active:
      </font>
      <b-step class="col-10" :list="list2" />
    </div>
    <div class="row py-1">
      <font class="col-1">
        column:
      </font>
      <b-step class="col-10" column :list="list" />
    </div>
    <div class="row py-1">
      <font class="col-1">
        size:
      </font>
      <font class="col-1">
        sm:
      </font>
      <b-step class="col-2" column size="sm" :list="list" />
      <font class="col-1">
        (default):
      </font>
      <b-step class="col-2" column :list="list" />
      <font class="col-1">
        lg:
      </font>
      <b-step class="col-2" column size="lg" :list="list" />
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
          <b-step class="col-10" set="up" :list="list" />
        </div>
        <div class="row py-1">
          <font class="col-1">
            right(default):
          </font>
          <b-step class="col-10" set="right" :list="list" />
        </div>
        <div class="row py-1">
          <font class="col-1">
            down:
          </font>
          <b-step class="col-10" set="down" :list="list" />
        </div>
        <div class="row py-1">
          <font class="col-1">
            left:
          </font>
          <b-step class="col-10" set="left" :list="list" />
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
      defaultList: [
        { status: 'default',},
        { status: 'success',},
        { status: 'warning',},
        { status: 'error',},
        { status: 'danger',},
      ],
      list: [
        { status: 'default', title: 'title', info: "info text is tooo ooooooo ooooooo oooooo long",},
        { status: 'success', title: "title", info: "info text",},
        { status: 'warning', title: "title", info: "info text",},
        { status: 'error', title: "title ", info: "info text",},
        { status: 'danger', title: "title", info: "info text",},
      ],
      list2: [
        { status: 'default', title: 'active item', info: "It is a active item", active: true,},
        { status: 'success',},
        { status: 'warning',},
        { status: 'error',},
        { status: 'danger',},
      ],
    }
  },
}
</script>
