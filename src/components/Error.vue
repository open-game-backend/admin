<template>
    <div class="alert alert-danger" role="alert" v-if="error">
        {{ error }}
    </div>
</template>

<script>
import PubSub from 'pubsub-js'
import Topics from '../topics'

export default {
  name: 'Error',

  data: function() {
    return {
        error: ''
    }
  },

  created: function () {
    PubSub.subscribe(Topics.ERROR, this.onError);
    PubSub.subscribe(Topics.SESSION_EXPIRED, this.onSessionExpired);
  },

  methods: {
    onError: function (msg, data) {
      this.error = data;
    },

    onSessionExpired: function () {
      console.log('Session expired.')

      this.$api.removeJWT();
      this.$store.commit('setLoggedInAs', null)
      this.$router.push('/login');
    }
  }
}
</script>
