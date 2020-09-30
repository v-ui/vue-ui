export default {
  SubsystemName: 'Directive',
  icon: 'fas fa-tools',
  Modules: [
    { path: 'v-modal', name: 'v-modal', component: async () => await import(/* webpackChunkName: "Directive" */'@/pages/Demo/Directive/b-modal-demo.vue'), },
    { path: 'v-tip', name: 'v-tip', component: async () => await import(/* webpackChunkName: "directive" */'@/pages/Demo/Directive/b-tooltip-demo.vue'), },
  ]
}
