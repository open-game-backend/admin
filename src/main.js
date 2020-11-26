import { createApp } from 'vue'
import Vuex from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

import API from './api.js'

import Login from './components/Login.vue'
import Servers from './components/Servers.vue'
import Queue from './components/Queue.vue'
import Logout from './components/Logout.vue'

// Create routes.
const routes = [
    { path: '/login', component: Login },
    { path: '/servers', component: Servers },
    { path: '/queue', component: Queue },
    { path: '/logout', component: Logout }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && !api.isLoggedIn()) {
        next({ path: '/login' });
    } else {
        next();
    }
});

// Create store.
const store = new Vuex.Store({
    state: {
        isLoggedIn: 0
    },
    mutations: {
        setIsLoggedIn (state, newIsLoggedIn) {
            state.isLoggedIn = newIsLoggedIn
        }
    }
})

// Create Vue instance.
const app = createApp(App)
    .use(router)
    .use(store)

// Create API.
const api = new API();
app.config.globalProperties.$api = api

// Mount app.
app.mount('#app')
