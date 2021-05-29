import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'

import '@fortawesome/fontawesome-free/css/all.css'

import App from './App.vue'

import API from './api.js'

import Login from './components/Login.vue'
import FirstTimeSetup from './components/FirstTimeSetup.vue'
import Locked from './components/Locked.vue'
import Players from './components/Players.vue'
import Player from './components/Player.vue'
import Servers from './components/Servers.vue'
import Queue from './components/Queue.vue'
import Admins from './components/Admins.vue'
import Logout from './components/Logout.vue'
import Collection from './components/Collection.vue'
import ItemDefinition from './components/ItemDefinition.vue'
import Quests from './components/Quests.vue'
import SecretKeys from './components/SecretKeys.vue'

// Create store.
const store = new createStore({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],

    state: {
        oAuthState: '',
        loggedInAs: null
    },

    mutations: {
        setOAuthState (state, newOAuthState) {
            state.oAuthState = newOAuthState
        },

        setLoggedInAs (state, newLoggedInAs) {
            state.loggedInAs = newLoggedInAs
        }
    }
})

// Create routes.
const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/firstTimeSetup', component: FirstTimeSetup },
    { path: '/locked', component: Locked },
    { path: '/players', component: Players },
    { path: '/players/:playerId', name: 'player', component: Player },
    { path: '/collection', component: Collection },
    { path: '/collection/:itemDefinitionId', name: 'itemDefinition', component: ItemDefinition },
    { path: '/quests', component: Quests },
    { path: '/servers', component: Servers },
    { path: '/queue', component: Queue },
    { path: '/admins', component: Admins },
    { path: '/secretkeys', component: SecretKeys },
    { path: '/logout', component: Logout }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && to.path !== '/locked' && store.state.loggedInAs == null) {
        next({ path: '/login' });
    } else {
        next();
    }
});

// Create Vue instance.
const app = createApp(App)
    .use(router)
    .use(store)



// Load config.
// https://stackoverflow.com/questions/60114173/vue-js-with-an-external-configuration-file
fetch(process.env.BASE_URL + "config.json")
    .then((response) => {
        response.json().then((config) => {
            app.config.globalProperties.$config = config

            // Create API.
            const api = new API(config);
            app.config.globalProperties.$api = api

            // Mount app.
            app.mount('#app')
        })
    })
