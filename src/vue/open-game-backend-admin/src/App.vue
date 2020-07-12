<template>
  <div class="app">
    <div class="container">
      <h1>Open Game Backend - Admin</h1>

      <Navigation v-if="isLoggedIn()" />

      <Login v-if="!isLoggedIn()" />
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import Login from './components/Login.vue'

export default {
  name: 'App',

  components: {
    Navigation,
    Login
  },

  methods: {
    isLoggedIn: function() {
      return this.$store.state.token;
    }
  }
}
</script>
