<template>
  <div class="mx-2">
    <h2>Icon</h2>参考链接：
    <!-- <base-a
      class="px-1"
      href="https://fontawesome.com"
      text="fontawesome"
    /> -->
    <base-a
      class="px-1"
      href="https://icons.getbootstrap.com"
      text="bootstrap icons"
    />
    <hr>
    <div class="container">
      <b-text class="m-5" type="search" size="lg" v-model="search" />
      <p class="mb-3">共 {{ searchIcons.length }} 个</p>
      <ul class="row row-cols-3 row-cols-sm-4 row-cols-lg-6 row-cols-xl-8  list-unstyled list">
        <li v-for="(item, key) in searchIcons" :key="key" class="col mb-4">
          <a class="d-block text-decoration-none text-center">
            <div class="p-3 py-4 mb-2 bg-light text-primary text-center rounded" style="font-size: 2em">
              <basic-icon :icon="item" />
            </div>
            <font class="clip btn btn-link pt-1" v-tip.bottom="'Click to copy'" :data-clipboard-text="item">
              {{ item }}
            </font>
            <basic-icon v-if="item === copyed" class="text-success mx-1" icon="check-circle-fill" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import util from '@/components/util'

import BasicIcon from '@/components/basic/basic-icon.vue'

import BaseA from "@/components/basic/A/basic-a.vue";
import BText from "@/components/form/b-text.vue";

export default {
  name: "basic-icon-demo",
  components: { BasicIcon, BaseA, BText },
  mixins: [ util.mixins.clip.base, ],
  data() {
    return {
      search: null,
      clipElement: '.clip',
      copyed: null,
    }
  },
  mounted() {
    this.clipboard.on('success',(e) => {
      this.copyed = e.trigger.attributes["data-clipboard-text"].value
    })
  },
  computed: {
    icons: function() {
      const requireAll = requireContext => requireContext.keys().map(requireContext)
      const req = require.context('bootstrap-icons/icons', false, /\.svg$/)
      const modules = requireAll(req).map(e => e.default.id.slice(5) )
      return modules
    },
    searchIcons: function() {
      return this.search
        ? this.icons.filter(e => e.includes(this.search))
        : this.icons
    },
  },
};
</script>
