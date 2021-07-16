<template>
  <div>
    <h2>b-breadcrumb</h2>
    <hr>
    <div class="row my-1">
      <font class="col-1">
        default
      </font>
      <b-breadcrumb :list="list" />
    </div>
    <div class="row my-1">
      <font class="col-1">
        divider
      </font>
      <b-breadcrumb :list="list" :divider="divider" />
    </div>
  </div>
</template>

<script>
import BBreadcrumb from '@/components/base/Breadcrumb/b-breadcrumb.vue'

export default {
  name: 'BBreadcrumbDemo',
  components: { BBreadcrumb, },
  data() {
    return {
      list: [
        { label: 'Home', path: '#' },
        { label: 'breadcumb', active: true, },
      ],
      divider: '|'
    }
  },

}
</script>
