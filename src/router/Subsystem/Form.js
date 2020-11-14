export default {
  SubsystemName: 'Form',
  icon: 'fab fa-wpforms',
  Modules: [
    { path: 'b-button', name: 'b-button', component: async () => await import(/* webpackChunkName: "form" */'@/pages/Demo/Form/b-button-demo.vue'), },
    { path: 'b-text', name: 'b-text', component: async () => await import(/* webpackChunkName: "form" */'@/pages/Demo/Form/b-text-demo.vue'), },
    { path: 'b-color', name: 'b-color', component: async () => await import(/* webpackChunkName: "form" */'@/pages/Demo/Form/b-color-demo.vue'), },
    { path: 'b-textarea', name: 'b-textarea', component: async () => await import(/* webpackChunkName: "form" */'@/pages/Demo/Form/b-textarea-demo.vue'), },
    { path: 'b-number', name: 'b-number', component: async () => await import(/* webpackChunkName: "form" */'@/pages/Demo/Form/b-number-demo.vue'), },
    { path: 'b-radio', name: 'b-radio', component: async () => await import(/* webpackChunkName: "form" */'@/pages/Demo/Form/b-radio-demo.vue'), },
    { path: 'b-select', name: 'b-select', component: async () => await import(/* webpackChunkName: "form" */'@/pages/Demo/Form/b-select-demo.vue'), },
    { path: 'b-checkbox', name: 'b-checkbox', component: async () => await import(/* webpackChunkName: "form" */'@/pages/Demo/Form/b-checkbox-demo.vue'), },
    { path: 'b-switch', name: 'b-switch', component: async () => await import(/* webpackChunkName: "form" */'@/pages/Demo/Form/b-switch-demo.vue'), },
    { path: 'b-range', name: 'b-range', component: async () => await import(/* webpackChunkName: "form" */'@/pages/Demo/Form/b-range-demo.vue'), },
    { path: 'b-file', name: 'b-file', component: async () => await import(/* webpackChunkName: "form" */'@/pages/Demo/Form/b-file-demo.vue'), },
    // { path: 'b-hidden', name: 'b-hidden', component: async () => await import(/* webpackChunkName: "form" */'@/pages/Demo/Form/b-hidden-demo.vue'), },
    { path: 'b-input-group', name: 'b-input-group', component: async () => await import(/* webpackChunkName: "form" */'@/pages/Demo/Form/b-input-group-demo.vue'), },

  ]
}
