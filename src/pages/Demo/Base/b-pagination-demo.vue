<template>
  <div>
    <h2>b-pag</h2>
    <hr>
    <div class="row py-1">
      <font class="col-1">
        default:
      </font>
      <b-pag
        class="col-11"
        end="25"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        active:
      </font>
      <b-pag
        class="col-11"
        end="25"
        active="10"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        size(sm):
      </font>
      <b-pag
        class="col-11"
        size="sm"
        end="25"
        active="10"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        size(lg):
      </font>
      <b-pag
        class="col-11"
        size="lg"
        end="25"
        active="10"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        v-model<br>{{ value }}:
      </font>
      <b-pag
        v-model="value"
        class="col-11"
        end="25"
      />
    </div>
  </div>
</template>

<script>
import BPag from '@/components/base/Pagination/b-pag.vue'

export default {
    name: 'BPaginationDemo',
    components: { BPag, },
    data () {
        return {
            value: 5,
        }
    },
}
</script>
