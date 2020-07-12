<template>
  <div class="app">
    <div class="container">
      <h1>Open Game Backend - Admin</h1>

      <Login v-if="!isLoggedIn()" />

      <Navigation v-if="isLoggedIn()" @onSelectedTabChanged="onSelectedTabChanged($event)"/>

      <component v-if="isLoggedIn()" v-bind:is="selectedTab"></component>
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import Login from './components/Login.vue'
import Servers from './components/Servers.vue'
import Queue from './components/Queue.vue'

export default {
  name: 'App',

  data: function() {
    return {
        selectedTab: 'Servers'
    }
  },

  components: {
    Navigation,
    Login,
    Servers,
    Queue
  },

  methods: {
    isLoggedIn: function() {
      return this.$store.state.token;
    },

    onSelectedTabChanged: function(selectedTab) {
      this.selectedTab = selectedTab;
    }
  }
}
</script>
