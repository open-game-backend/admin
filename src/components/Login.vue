<template>
    <p>Please sign in using one of the following OAuth providers:</p>
    <form>
        <button type="button" v-on:click="loginWithGitHub" class="btn btn-primary">Login with GitHub</button>
    </form>
</template>

<script>
export default {
  name: 'Login',

  mounted: function() {
      if (this.$route.query.code != null && this.$route.query.state != null) {
        if (this.$route.query.state === this.oAuthState) {
          this.login(this.$route.query.code, this.$route.query.state)
        }
      }
  },

  data: function() {
    return {
        userId: ''
    }
  },

  computed: {
    oAuthState() {
      return this.$store.state.oAuthState
    }
  },

  methods: {
      loginWithGitHub: function () {
        // https://gist.github.com/6174/6062387
        let newOAuthState = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        this.$store.commit('setOAuthState', newOAuthState) 

        window.location.href = 'https://github.com/login/oauth/authorize?client_id=' + this.$config.githubClientId + '&state=' + newOAuthState
      },

      login: function(code, state) {
        this.$api.post('/open-game-backend-auth/login',
            {
                'provider': 'github',
                'key': code,
                'context': state,
                'role': "ROLE_ADMIN"
            },
            response => {
                this.$api.setJWT(response.data.token);
                this.$store.commit('setIsLoggedIn', true)
                this.$router.push('/servers');
            });
      }
  }
}
</script>
