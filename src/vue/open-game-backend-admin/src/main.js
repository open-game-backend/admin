import Vue from 'vue'
import Vuex from 'vuex'

import App from './App.vue'

import axios from 'axios'

Vue.config.productionTip = false

Vue.use(Vuex)

Vue.prototype.$api = axios.create({
    baseURL: 'http://localhost:9000'
})

const store = new Vuex.Store({
    state: {
        error: ''
    },

    mutations: {
        setError (state, newError) {
            state.error = newError
        }
    }
});

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
