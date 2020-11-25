<template>
    <div>
        <h2>Servers</h2>

        <div>
            <button type="button" v-on:click="getServers" class="btn btn-primary">Refresh</button>
        </div>

        <p></p>

        <div v-if="servers.length > 0">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Max Players</th>
                        <th scope="col">Status</th>
                        <th scope="col">Version</th>
                        <th scope="col">Game Mode</th>
                        <th scope="col">Region</th>
                        <th scope="col">IPv4 Address</th>
                        <th scope="col">Port</th>
                        <th scope="col">Players</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="server in servers" :key="server.id">
                        <th scope="row">{{ server.id }}</th>
                        <td>{{ server.maxPlayers }}</td>
                        <td>{{ server.status }}</td>
                        <td>{{ server.version }}</td>
                        <td>{{ server.gameMode }}</td>
                        <td>{{ server.region }}</td>
                        <td>{{ server.ipV4Address }}</td>
                        <td>{{ server.port }}</td>
                        <td>
                            <ul>
                                <li v-for="player in server.playerIds" :key="player">{{ player }}</li>
                            </ul>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            No servers found.
        </div>
    </div>
</template>

<script>
export default {
  name: 'Servers',

  data: function() {
    return {
        servers: []
    }
  },

  created: function () {
    this.getServers();
  },

  methods: {
      getServers: function () {
          this.$api.get('/open-game-backend-matchmaking/servers',
              response => {
                  this.servers = response.data.servers;
              });
      }
  }
}
</script>
