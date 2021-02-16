// a router

export default {
  SubsystemName: 'Base',
  icon: 'fab fa-bootstrap',
  Modules: [
    { path: 'basic-icon', name: 'basic-icon', component: async () => await import(/* webpackChunkName: "base" */'@/pages/Demo/Base/basic-icon-demo.vue'), },
    { path: 'b-alert', name: 'b-alert', component: async () => await import(/* webpackChunkName: "base" */'@/pages/Demo/Base/b-alert-demo.vue'), },
    { path: 'b-badge', name: 'b-badge', component: async () => await import(/* webpackChunkName: "base" */'@/pages/Demo/Base/b-badge-demo.vue'), },
    { path: 'b-card', name: 'b-card', component: async () => await import(/* webpackChunkName: "base" */'@/pages/Demo/Base/b-card-demo.vue'), },
    { path: 'b-calendar', name: 'b-calendar', component: async () => await import(/* webpackChunkName: "base" */'@/pages/Demo/Base/b-calendar-demo.vue'), },
    { path: 'b-datetime', name: 'b-datetime', component: async () => await import(/* webpackChunkName: "base" */'@/pages/Demo/Base/b-datetime-demo.vue'), },
    { path: 'b-dropdown', name: 'b-dropdown', component: async () => await import(/* webpackChunkName: "base" */'@/pages/Demo/Base/b-dropdown-demo.vue'), },
    { path: 'b-grid', name: 'b-grid', component: async () => await import(/* webpackChunkName: "base" */'@/pages/Demo/Base/b-grid-demo.vue'), },
    { path: 'b-list', name: 'b-list', component: async () => await import(/* webpackChunkName: "base" */'@/pages/Demo/Base/b-list-demo.vue'), },
    { path: 'b-loading', name: 'b-loading', component: async () => await import(/* webpackChunkName: "base" */'@/pages/Demo/Base/b-loading-demo.vue'), },
    { path: 'b-media', name: 'b-media', component: async () => await import(/* webpackChunkName: "base" */'@/pages/Demo/Base/b-media-demo.vue'), },
    { path: 'b-nav', name: 'b-nav', component: async () => await import(/* webpackChunkName: "base" */'@/pages/Demo/Base/b-nav-demo.vue'), },
    { path: 'b-pagination', name: 'b-pagination', component: async () => await import(/* webpackChunkName: "base" */'@/pages/Demo/Base/b-pagination-demo.vue'), },
    { path: 'b-progress', name: 'b-progress', component: async () => await import(/* webpackChunkName: "base" */'@/pages/Demo/Base/b-progress-demo.vue'), },
    { path: 'b-step', name: 'b-step', component: async () => await import(/* webpackChunkName: "base" */'@/pages/Demo/Base/b-step-demo.vue'), },
    { path: 'b-slide', name: 'b-slide', component: async () => await import(/* webpackChunkName: "base" */'@/pages/Demo/Base/b-slide-demo.vue'), },
    { path: 'b-toast', name: 'b-toast', component: async () => await import(/* webpackChunkName: "base" */'@/pages/Demo/Base/b-toast-demo.vue'), },
  ],
}
