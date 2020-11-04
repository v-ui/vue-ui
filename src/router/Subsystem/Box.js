export default {
  SubsystemName: 'Box',
  icon: 'fas fa-box',
  Modules: [
    { path: 'b-tabs', name: 'b-tabs', component: async () => await import(/* webpackChunkName: "box" */'@/pages/Demo/Box/b-tabs-demo.vue'), },
    { path: 'b-swiper', name: 'b-swiper', component: async () => await import(/* webpackChunkName: "box" */'@/pages/Demo/Box/b-swiper-demo.vue'), },
    { path: 'b-collapse', name: 'b-collapse', component: async () => await import(/* webpackChunkName: "box" */'@/pages/Demo/Box/b-collapse-demo.vue'), },
    { path: 'b-scrollspy', name: 'b-scrollspy', component: async () => await import(/* webpackChunkName: "box" */'@/pages/Demo/Box/b-scrollspy-demo.vue'), },
    { path: 'b-tree-view', name: 'b-tree-view', component: async () => await import(/* webpackChunkName: "box" */'@/pages/Demo/Box/b-tree-view-demo.vue'), },
    { path: 'b-grid-view', name: 'b-grid-view', component: async () => await import(/* webpackChunkName: "box" */'@/pages/Demo/Box/b-grid-view-demo.vue'), },
    { path: 'b-video-player', name: 'b-video-player', component: async () => await import(/* webpackChunkName: "box" */'@/pages/Demo/Box/b-video-player-demo.vue'), },
    { path: 'b-file-browser', name: 'b-file-browser', component: async () => await import(/* webpackChunkName: "box" */'@/pages/Demo/Box/b-file-browser-demo.vue'), },
  ]
}
