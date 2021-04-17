<template>
  <nav class="container h-100 m-0 p-0">
    <ul class="list-group d-inline-block overflow-auto bg-primary h-100 w-100 p-0">
      <!-- 建议不多于七个汉子，超出部分会被隐藏 -->
      <NavItem
        v-for="(item, key) in Routers"
        :key="key"
        class="NavItem"
        :model="item"
      >
        <router-link
          class="list-group-item bg-primary text-white text-decoration-none d-flex justify-content-start"
          to
        >
          <i
            class="mr-2"
            :class="item.icon || 'fas fa-dot-circle'"
          />
          <font class="text-truncate">
            {{ item.SubsystemName }}
          </font>
        </router-link>
      </NavItem>
    </ul>
  </nav>
</template>

<script>
import util from '@/components/util/index.js'

export default {
  name: "MainMenu",
  components: {
    NavItem: () => import("./main-menu-item.vue")
  },
  filters: { ...util.filters, },
  data() {
    return {
      open: false,
      Routers: [],
      Subsystem: [],
      Modules: [],
      SubsystemName: ""
    };
  },
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    init: async function() {
      await this.InitRouters();
      await this.InitSubsystem();
      if (this.Subsystem.length > 0) {
        // 默认显示第一个
        await this.InitModules(this.Subsystem[0]);
      }
    },
    InitRouters: async function() {
      this.Routers = [];
      await import("@/router/routes").then(conf => {
        this.Routers = conf.Modules;
      });
      if (!this.Routers) {
        // console.warn('[System Error] routers is not an array')
      }
    },
    InitSubsystem: function() {
      this.Subsystem = [];
      for (const item of this.Routers) {
        if (item.SubsystemName) {
          this.Subsystem.push(item.SubsystemName);
        }
      }
    },
    InitModules: function(SubsystemName) {
      this.Modules = [];
      for (const item of this.Routers) {
        if (item.SubsystemName !== SubsystemName) continue;
        this.Modules = [...this.Modules, ...item.Modules];
        this.SubsystemName = SubsystemName;
        break;
      }
    }
  }
};
</script>
