<template>
  <div class="px-1">
    <h2>b-list</h2>
    <hr>
    <div class="row py-1">
      <font class="col-1">
        default:
      </font>
      <b-list
        class="col-11"
        :list="list"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        disabled:
      </font>
      <b-list
        class="col-11"
        :list="list"
        disabled
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        numbered:
      </font>
      <b-list
        class="col-11"
        :list="list"
        numbered
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        v-model:<br>
        {{ value }}
      </font>
      <b-list
        v-model="value"
        class="col-11"
        :list="list"
        primary-key="label"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        flush:
      </font>
      <b-list
        class="col-11"
        :list="list3"
        flush
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        inline:
      </font>
      <b-list
        class="col-11"
        :list="list4"
        inline
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        inline<br>fill:
      </font>
      <b-list
        class="col-11"
        :list="list4"
        inline
        fill
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        solt:
      </font>
      <b-list
        class="col-11"
        :list="list4"
      >
        <template #item="{ item }">
          {{ item }}
        </template>
      </b-list>
    </div>
    <div class="row py-1">
      <font class="col-1">
        color:
      </font>
      <b-list class="col-11">
        <b-list-item
          v-for="item in colors"
          :key="item"
          :color="item"
        >
          {{ item }}
        </b-list-item>
      </b-list>
    </div>
    <br>
    <h2>b-list with b-check</h2>
    <hr>
    <div class="row py-1">
      <font class="col-1">
        type:
      </font>
      <font class="col-1">
        radio(default):
      </font>
      <b-check-list
        class="col-4"
        v-model="radioValue"
        :list="listCheck"
        name="radio-list-item"
      />
      <font class="col-1">
        checkbox:
      </font>
      <b-check-list
        class="col-4"
        v-model="checkValue"
        :list="listCheck"
        name="check-list-item"
        type="checkbox"
      />
    </div>
  </div>
</template>

<script>
import variables from '@/components/util/variables.js'

import BList from '@/components/base/List/b-list.vue'
import BListItem from '@/components/base/List/b-list-item.vue'
import BCheckList from "@/components/base/List/b-check-list.vue"

export default {
    name: 'BListDemo',
    components: { BList, BListItem, BCheckList, },
    data () {
        return {
            colors: variables.base.color.bg,
            list: [
                {label: 'label1', info: "info text", icon: "record-circle-fill" },
                {label: 'label2',  },
                {label: 'label3', disabled: true,},
                {label: 'href1', href: "#"},
                {label: 'href2', href: "#", },
                {label: 'href3', href: "#", disabled: true,},
            ],
            list2: [
                {label: 'label1'},
                {label: 'label2', },
                {label: 'href1', href: "#"},
                {label: 'href2', href: "#", },
            ],
            list3: [
                {label: 'label1'},
                {label: 'href1', href: "#"},
            ],
            list4: [
                {label: 'label1'},
                {label: 'toooooooooooooo loooooong'},
            ],
            value: {label: 'label2', },
            listCheck: [
              { value: "value1", label: "value1" },
              { value: "value2", label: "value2" },
              { value: "value3", label: "value3" },
              { value: "value4", label: "value4", disabled: true }
            ],
            radioValue: { value: "value3", label: "value3" },
            checkValue: [{ value: "value3", label: "value3" },]
        }
    }
}
</script>

