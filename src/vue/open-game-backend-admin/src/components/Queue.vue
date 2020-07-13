<template>
    <div>
        <h2>Players</h2>

        <div class="row">
            <div class="col-sm">
                <strong>ID</strong>
            </div>
            <div class="col-sm">
                <strong>Version</strong>
            </div>
            <div class="col-sm">
                <strong>Game Mode</strong>
            </div>
            <div class="col-sm">
                <strong>Region</strong>
            </div>
            <div class="col-sm">
                <strong>Status</strong>
            </div>
        </div>

        <div v-for="player in players" :key="player.playerId">
            <div class="row">
                <div class="col-sm">
                    {{ player.playerId }}
                </div>
                <div class="col-sm">
                    {{ player.version }}
                </div>
                <div class="col-sm">
                    {{ player.gameMode }}
                </div>
                <div class="col-sm">
                    {{ player.region }}
                </div>
                <div class="col-sm">
                    {{ player.status }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Queue',

  data: function() {
    return {
        players: []
    }
  },

  mounted: function () {
    this.getPlayers();
  },

  methods: {
      getPlayers: function () {
          this.$api.get('/open-game-backend-matchmaking/queue')
      .then(response => {
          this.$store.commit('setError', '')

          this.players = response.data.players;
      })
      .catch(error => {
          if (error.response) {
            this.$store.commit('setError', error.response.data.errorMessage);
          } else {
            this.$store.commit('setError', error.message);
          }
      });
      }
  }
}
</script>
