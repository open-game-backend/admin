<template>
    <div>
        <h2>Players</h2>

        <div>
            <button type="button" v-on:click="getPlayers" class="btn btn-primary">Refresh</button>
        </div>

        <p></p>

        <div v-if="players.length > 0">
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
        <div v-else>
            No players found.
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
      this.$api.get('/open-game-backend-matchmaking/queue',
        response => {
          this.players = response.data.players;
        });
      }
  }
}
</script>
