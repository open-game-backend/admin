import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import App from './App.vue'

import API from './api.js'

import Login from './components/Login.vue'
import Servers from './components/Servers.vue'
import Queue from './components/Queue.vue'
import Logout from './components/Logout.vue'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueRouter)

// Create API.
const api = new API();
Vue.prototype.$api = api;

// Create routes.
const routes = [
    { path: '/login', component: Login },
    { path: '/servers', component: Servers },
    { path: '/queue', component: Queue },
    { path: '/logout', component: Logout }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && !api.isLoggedIn()) {
        next({ path: '/login' });
    } else {
        next();
    }
});

// Create Vue instance.
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
