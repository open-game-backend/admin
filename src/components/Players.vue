<template>
    <div>
        <h2>Players</h2>

        <div>
            <button type="button" v-on:click="getPlayers" class="btn btn-primary"><i class="fas fa-sync"></i> Refresh</button>
        </div>

        <p></p>

        <div v-if="players.length > 0">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Provider</th>
                        <th scope="col">Provider User ID</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="player in players" :key="player.playerId">
                        <th scope="row">{{ player.playerId }}</th>
                        <td>{{ player.provider }}</td>
                        <td>{{ player.providerUserId }}</td>
                        <td>
                        </td>
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
  name: 'Players',

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
        this.$api.get('/open-game-backend-auth/admin/players',
            response => {
                this.players = response.data.players;
            }
        );
    }
  }
}
</script>
