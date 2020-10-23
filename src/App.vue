<template>
  <div class="app">
    <div class="container">
      <h1>Open Game Backend - Admin</h1>

      <Error />
      
      <Navigation v-if="loggedIn" />

      <router-view @onLoggedIn="onLoggedIn" @onLogout="onLogout"></router-view>
    </div>
  </div>
</template>

<script>
import Error from './components/Error.vue'
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',

  data: function() {
    return {
        loggedIn: false
    }
  },

  components: {
    Error,
    Navigation
  },

  methods: {
    onLoggedIn: function(token) {
      this.$api.setJWT(token);
      this.loggedIn = true;

      this.$router.push('/servers');
    },

    onLogout: function() {
      this.$api.removeJWT();
      this.loggedIn = false;

      this.$router.push('/login');
    }
  }
}
</script>
