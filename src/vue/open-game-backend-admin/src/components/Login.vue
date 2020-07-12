<template>
    <form>
        <div class="form-group">
            <label for="userIdInput">User ID</label>
            <input type="text" class="form-control" id="userIdInput" v-model="userId">
        </div>
        <div class="form-group">
            <label for="passwordInput">Password</label>
            <input type="password" class="form-control" id="passwordInput">
        </div>
        <div class="alert alert-danger" role="alert" v-if="errorMessage">
            {{ errorMessage }}
        </div>
        <button type="button" v-on:click="postLogin" class="btn btn-primary">Login</button>
    </form>
</template>

<script>
export default {
  name: 'Login',
  data: function() {
    return {
        userId: '',
        errorMessage: ''
    }
  },
  methods: {
      postLogin: function () {
          this.$api.post('/open-game-backend-auth/login', {
              'playerId': this.userId
          })
      .then(response => {
          this.errorMessage = '';

          this.$store.commit('setToken', response.data.token)
      })
      .catch(error => {
          if (error.response) {
            this.errorMessage = error.response.data.errorMessage;
          } else {
            this.errorMessage = error.message;
          }
      });
      }
    }
}
</script>
