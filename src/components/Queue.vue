<template>
    <div>
        <h2>Players</h2>

        <div>
            <button type="button" v-on:click="getPlayers" class="btn btn-primary">Refresh</button>
        </div>

        <p></p>

        <div v-if="players.length > 0">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Version</th>
                        <th scope="col">Game Mode</th>
                        <th scope="col">Region</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="player in players" :key="player.playerId">
                        <th scope="row">{{ player.playerId }}</th>
                        <td>{{ player.version }}</td>
                        <td>{{ player.gameMode }}</td>
                        <td>{{ player.region }}</td>
                        <td>{{ player.status }}</td>
                    </tr>
                </tbody>
            </table>
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

  created: function () {
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
