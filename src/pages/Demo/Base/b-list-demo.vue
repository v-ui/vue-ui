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
        drop:
      </font>
      <b-list
        class="col-11"
        :list="list"
        drop
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        select:
      </font>
      <b-list
        class="col-11"
        :list="list2"
        select="label1"
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
      <b-list class="col-11" :list="list4">
        <template #item="{ item }">
          <div class="d-flex justify-content-between w-100">
            {{ item.label }}
            <span class="badge badge-primary badge-pill">14</span>
          </div>
        </template>
      </b-list>
    </div>
  </div>
</template>

<script>
import BList from '@/components/base/List/b-list.vue'
export default {
    name: 'BListDemo',
    components: { BList, },
    data () {
        return {
            list: [
                {label: 'label1'},
                {label: 'label2', active: true,},
                {label: 'label3', disabled: true,},
                {label: 'href1', href: "#"},
                {label: 'href2', href: "#", active: true,},
                {label: 'href3', href: "#", disabled: true,},
            ],
            list2: [
                {label: 'label1'},
                {label: 'label2', active: true,},
                {label: 'href1', href: "#"},
                {label: 'href2', href: "#", active: true,},
            ],
            list3: [
                {label: 'label1'},
                {label: 'href1', href: "#"},
            ],
            list4: [
                {label: 'label1'},
                {label: 'toooooooooooooo loooooong'},
            ],
        }
    }
}
</script>

