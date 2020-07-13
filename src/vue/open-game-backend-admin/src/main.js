import Vue from 'vue'
import Vuex from 'vuex'

import App from './App.vue'

import API from './api.js'

Vue.config.productionTip = false

Vue.use(Vuex)

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

Vue.prototype.$api = new API(store);

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
