<template>
  <div class="app">
    <div class="container">
      <h1>Open Game Backend - Admin</h1>

      <Error />

      <Login v-if="!loggedIn" @onLoggedIn="onLoggedIn($event) "/>

      <Navigation v-if="loggedIn" @onSelectedTabChanged="onSelectedTabChanged($event) "/>

      <component v-if="loggedIn" v-bind:is="selectedTab"></component>
    </div>
  </div>
</template>

<script>
import Error from './components/Error.vue'
import Navigation from './components/Navigation.vue'
import Login from './components/Login.vue'
import Servers from './components/Servers.vue'
import Queue from './components/Queue.vue'

export default {
  name: 'App',

  data: function() {
    return {
        selectedTab: 'Servers',
        loggedIn: false
    }
  },

  components: {
    Error,
    Navigation,
    Login,
    Servers,
    Queue
  },

  methods: {
    onLoggedIn: function(token) {
      this.$api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      this.loggedIn = true;
    },

    onSelectedTabChanged: function(selectedTab) {
      this.selectedTab = selectedTab;
    }
  }
}
</script>
