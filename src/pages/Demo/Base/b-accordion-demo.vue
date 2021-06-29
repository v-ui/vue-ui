<template>
  <div>
    <h2>b-accordion</h2>
    基于 b-collapse v-coll
    <hr>
    <div class="row py-1">
      <font class="col-1">
        list
      </font>
      <b-accordion
        id="list-acc"
        class="col-11"
        :list="list"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        flush
      </font>
      <b-accordion
        id="flush-acc"
        class="col-11"
        :list="list"
        flush
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        allwaysOpen
      </font>
      <b-accordion
        id="allways-open-acc"
        class="col-11"
        :list="list"
        allways-open
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        slot
      </font>
      <b-accordion
        id="slot-acc"
        class="col-11"
        :list="list"
      >
        <template #header="item">{{ item }}</template>
        <template #body="item">{{ item }}</template>
      </b-accordion>
    </div>
  </div>
</template>

<script>
import BAccordion from "@/components/base/Accordion/b-accordion.vue"

export default {
  name: 'b-accordion-demo',
  components: { BAccordion, },
  data() {
    return {
      list: [
        { title: 'title 1', content: 'content 1', show: true, },
        { title: 'title 2', content: 'content 2' },
        { title: 'title 3', content: 'content 3' },
        { title: 'title 4', content: 'content 4' },
        { title: 'title 5', content: 'content 5' },
        { title: 'title 6', content: 'content 6' },
      ],
    }
  },
}
</script>
