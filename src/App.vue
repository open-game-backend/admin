<template>
  <div class="app">
    <div class="container">
      <h1>Open Game Backend - Admin</h1>

      <Error />
      
      <Navigation v-if="isLoggedIn" />

      <router-view></router-view>

      <Footer />
    </div>
  </div>
</template>

<script>
import Error from './components/Error.vue'
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',

  data: function() {
    return {
        loggedIn: false
    }
  },

  components: {
    Error,
    Navigation,
    Footer
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.loggedInAs != null
    }
  },

  created: function () {
    if (this.$store.state.loggedInAs != null) {
      this.$api.setJWT(this.$store.state.loggedInAs.token);
    }
  }
}
</script>
