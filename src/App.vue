<template>
  <div class="app">
    <div class="container">
      <h1>Open Game Backend - Admin</h1>

      <Error />
      
      <Navigation v-if="isLoggedIn" />

      <router-view></router-view>
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

  computed: {
    isLoggedIn() {
      return this.$store.state.loggedInAs != null
    }
  }

}
</script>
