<template>
    <div>
        <h2>Servers</h2>

        <div v-for="server in servers" :key="server.id">
            <div class="row">
                <div class="col-sm">
                    <strong>{{ server.id }}</strong>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-2">
                    Max Players:
                </div>
                <div class="col-sm">
                    {{ server.maxPlayers }}
                </div>
            </div>

            <div class="row">
                <div class="col-sm-2">
                    Status:
                </div>
                <div class="col-sm">
                    {{ server.status }}
                </div>
            </div>

            <div class="row">
                <div class="col-sm-2">
                    Version:
                </div>
                <div class="col-sm">
                    {{ server.version }}
                </div>
            </div>

            <div class="row">
                <div class="col-sm-2">
                    Game Mode:
                </div>
                <div class="col-sm">
                    {{ server.gameMode }}
                </div>
            </div>

            <div class="row">
                <div class="col-sm-2">
                    Region:
                </div>
                <div class="col-sm">
                    {{ server.region }}
                </div>
            </div>

            <div class="row">
                <div class="col-sm-2">
                    IPv4 Address:
                </div>
                <div class="col-sm">
                    {{ server.ipV4Address }}
                </div>
            </div>

            <div class="row">
                <div class="col-sm-2">
                    Port:
                </div>
                <div class="col-sm">
                    {{ server.port }}
                </div>
            </div>

            <div class="row">
                <div class="col-sm-2">
                    Players:
                </div>
                <div class="col-sm">
                    <ul>
                        <li v-for="player in server.playerIds" :key="player">{{ player }}</li>
                    </ul>
                </div>
            </div>
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

  mounted: function () {
    this.getServers();
  },

  methods: {
      getServers: function () {
          this.$api.get('/open-game-backend-matchmaking/servers')
      .then(response => {
          this.$store.commit('setError', '')

          this.servers = response.data.servers;
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
