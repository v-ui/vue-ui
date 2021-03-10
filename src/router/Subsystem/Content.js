// a-b router

export default {
  SubsystemName: 'Content',
  icon: 'fas fa-dice-d6',
  Modules: [
    { path: 'b-a', name: 'b-a', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/b-a-demo.vue'), },
    { path: 'b-tabs', name: 'b-tabs', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/b-tabs-demo.vue'), },
    { path: 'b-swiper', name: 'b-swiper', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/b-swiper-demo.vue'), },
    { path: 'b-collapse', name: 'b-collapse', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/b-collapse-demo.vue'), },
    { path: 'b-scrollspy', name: 'b-scrollspy', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/b-scrollspy-demo.vue'), },
    { path: 'b-audio', name: 'b-audio', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/b-audio-demo.vue'), },
    { path: 'b-video', name: 'b-video', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/b-video-demo.vue'), },
    { path: 'b-video-player', name: 'b-video-player', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/b-video-player-demo.vue'), },
    { path: 'b-zTree', name: 'b-zTree', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/b-zTree-demo.vue'), },
    { path: 'b-tree-view', name: 'b-tree-view', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/b-tree-view-demo.vue'), },
    { path: 'b-table', name: 'b-table', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/b-table-demo.vue'), },
    { path: 'b-grid-view', name: 'b-grid-view', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/b-grid-view-demo.vue'), },
    { path: 'b-file-browser', name: 'b-file-browser', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/b-file-browser-demo.vue'), },
  ],
}
