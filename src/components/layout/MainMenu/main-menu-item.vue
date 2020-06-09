<template>
  <!-- Nav Item template -->
  <!-- 建议不多于十八个汉子，超出部分会被隐藏 -->
  <li class="p-0 w-100 border-0">
    <div @click="toggle">
      <slot>
        <router-link
          v-if="!model.Modules"
          :to="model.path"
          class="list-group-item border-top-0 text-decoration-none bg-light "
          :class=" $route.path == model.path ? 'text-primary font-weight-bold' : 'text-dark'"
        >
          <font class="text-truncate w-100 d-inline-block">{{ model.name | upperToHyphenLower }}</font>
        </router-link>
        <router-link
          v-else
          to
          class="list-group-item bg-light text-dark border-top-0 text-decoration-none d-flex justify-content-between"
        >
          <font class="text-truncate">{{ model.SubsystemName | worldUpperCase | firstUpperCase }}</font>
          <i class="d-flex align-self-center fas fa-chevron-down" v-if="!open" />
          <i class="d-flex align-self-center fas fa-chevron-up" v-else />
        </router-link>
      </slot>
    </div>
    <ul class="list-group p-0 border-0 w-100" v-show="open" v-if="model.Modules">
      <item class="NavItem" v-for="(Module, key) in model.Modules" :key="key" :model="Module" />
    </ul>
  </li>
</template>

<script>
import util from '@/components/util/index.js'

export default {
  name: "main-menu-item",
  components: {
    item: () => import("./main-menu-item.vue")
  },
  filters: { ...util.filters, },
  data() {
    return {
      open: false
    };
  },
  props: {
    model: Object
  },
  created() {
    this.open = false;
  },
  methods: {
    toggle: function() {
      this.open = !this.open;
    }
  },
  watch: {
    model: function(newValue, oldValue) {
      if (newValue != oldValue) {
        this.model = newValue;
        this.open = false;
      }
    }
  }
};
</script>
