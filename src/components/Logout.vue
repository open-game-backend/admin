<template>
    <div>
        <h2>Logout</h2>

        <p>Are you sure you want to logout?</p>

        <div>
            <button type="button" v-on:click="logout" class="btn btn-primary"><i class="fas fa-sign-out-alt"></i> Logout</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Logout',

  methods: {
      logout: function () {
          this.$api.removeJWT();
          this.$store.commit('setLoggedInAs', null)
          this.$router.push('/login');
      }
  }
}
</script>
