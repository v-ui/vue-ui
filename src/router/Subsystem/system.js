// system router

export default {
    SubsystemName: 'system',
    icon: 'far fa-dharmachakra',
    Modules: [
        { path: 'About', name: 'about', component: async () => await import(/* webpackChunkName: "about" */'@/pages/About.vue'), },
        {
            SubsystemName: 'systemb',
            Modules: [
                { path: 'About', name: 'about', component: async () => await import(/* webpackChunkName: "about" */'@/pages/About.vue'), },
                { path: 'Default', name: 'default', component: async () => await import(/* webpackChunkName: "default" */'@/pages/Default.vue'), },
            ]
        }
    ]
}
