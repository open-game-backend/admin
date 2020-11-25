<template>
    <div>
        <h2>Logout</h2>

        <p>Are you sure you want to logout?</p>

        <div>
            <button type="button" v-on:click="logout" class="btn btn-primary">Logout</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Logout',

  methods: {
      logout: function () {
          this.$api.removeJWT();
          this.$store.commit('setIsLoggedIn', false)
          this.$router.push('/login');
      }
  }
}
</script>
