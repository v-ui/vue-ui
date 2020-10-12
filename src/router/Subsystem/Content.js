// a-b router

export default {
  SubsystemName: 'Content',
  icon: 'fas fa-dice-d6',
  Modules: [
    { path: 'c-a', name: 'c-a', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/c-a-demo.vue'), },
    { path: 'c-audio', name: 'c-audio', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/c-audio-demo.vue'), },
    { path: 'c-table', name: 'c-table', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/c-table-demo.vue'), },
    { path: 'c-video', name: 'c-video', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/c-video-demo.vue'), },
    { path: 'tree-view', name: 'tree-view', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/tree-view-demo.vue'), },
    { path: 'c-zTree', name: 'c-zTree', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/c-zTree-demo.vue'), },
    { path: 'video-player', name: 'video-player', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/c-video-player-demo.vue'), },
    { path: 'file-browser', name: 'file-browser', component: async () => await import(/* webpackChunkName: "content" */'@/pages/Demo/Content/b-file-browser-demo.vue'), },
  ],
}
