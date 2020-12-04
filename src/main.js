import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'

import App from './App.vue'

import API from './api.js'

import Login from './components/Login.vue'
import FirstTimeSetup from './components/FirstTimeSetup.vue'
import Servers from './components/Servers.vue'
import Queue from './components/Queue.vue'
import Logout from './components/Logout.vue'

// Create store.
const store = new createStore({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],

    state: {
        oAuthState: '',
        isLoggedIn: 0
    },

    mutations: {
        setOAuthState (state, newOAuthState) {
            state.oAuthState = newOAuthState
        },

        setIsLoggedIn (state, newIsLoggedIn) {
            state.isLoggedIn = newIsLoggedIn
        }
    }
})

// Create routes.
const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/firstTimeSetup', component: FirstTimeSetup },
    { path: '/servers', component: Servers },
    { path: '/queue', component: Queue },
    { path: '/logout', component: Logout }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && to.path !== '/locked' && !store.state.isLoggedIn) {
        next({ path: '/login' });
    } else {
        next();
    }
});

// Create Vue instance.
const app = createApp(App)
    .use(router)
    .use(store)

// Create API.
const api = new API();
app.config.globalProperties.$api = api

// Load config.
// https://stackoverflow.com/questions/60114173/vue-js-with-an-external-configuration-file
fetch(process.env.BASE_URL + "config.json")
    .then((response) => {
        response.json().then((config) => {
            app.config.globalProperties.$config = config

            // Mount app.
            app.mount('#app')
        })
    })
