export default {
  SubsystemName: 'Box',
  icon: 'fas fa-box',
  Modules: [
    { path: 'b-swiper', name: 'b-swiper', component: async () => await import(/* webpackChunkName: "box" */'@/pages/Demo/Box/b-swiper-demo.vue'), },
    { path: 'b-collapse', name: 'b-collapse', component: async () => await import(/* webpackChunkName: "box" */'@/pages/Demo/Box/b-collapse-demo.vue'), },
    { path: 'b-scrollspy', name: 'b-scrollspy', component: async () => await import(/* webpackChunkName: "box" */'@/pages/Demo/Box/b-scrollspy-demo.vue'), },
    { path: 'box-tabs', name: 'box-tabs', component: async () => await import(/* webpackChunkName: "box" */'@/pages/Demo/Box/box-tabs-demo.vue'), },
  ]
}
