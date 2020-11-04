<template>
  <div
    id="app"
    class="m-0 p-0 min-vw-100 min-vh-100"
  >
    <template v-if="show">
      <!-- Load Plugin Page -->
      <router-view />
    </template>
    <template v-else>
      <layout />
    </template>
  </div>
</template>

<script>
// 资源文件
// bootstrap
import 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// 图标
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('bootstrap-icons/icons', false, /\.svg$/)
requireAll(req)

import '@fortawesome/fontawesome-free/css/all.min.css'
import layout from "@/components/layout/layout.vue"

export default {
  components: {
   layout
  },
  computed: {
    show: function () {
      return this.$route.fullPath.includes('/Plugin-')
    },
  },
};
</script>

