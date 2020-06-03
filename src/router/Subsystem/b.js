// a-b router

export default {
    SubsystemName: 'b',
    Modules: [
        { path: 'About', name: 'about', component: async () => await import(/* webpackChunkName: "about" */'@/pages/About.vue'), },
        {
            SubsystemName: 'bb',
            Modules: [
                { path: 'About', name: 'about', component: async () => await import(/* webpackChunkName: "about" */'@/pages/About.vue'), },
                { path: 'Default', name: 'default', component: async () => await import(/* webpackChunkName: "default" */'@/pages/Default.vue'), },
                {
                    SubsystemName: 'bbc',
                    Modules: [
                        { path: 'About', name: 'about', component: async () => await import(/* webpackChunkName: "about" */'@/pages/About.vue'), },
                        { path: 'Default', name: 'default', component: async () => await import(/* webpackChunkName: "default" */'@/pages/Default.vue'), },
                    ]
                },
            ]
        }
    ]
}
