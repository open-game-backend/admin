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
        <button type="button" v-on:click="postLogin" class="btn btn-primary">Login</button>
    </form>
</template>

<script>
export default {
  name: 'Login',

  data: function() {
    return {
        userId: ''
    }
  },

  methods: {
      postLogin: function () {
          this.$api.post('/open-game-backend-auth/login',
              {
                  'playerId': this.userId
              },
              response => {
                  this.$emit('onLoggedIn', response.data.token);
              });
      }
  }
}
</script>
