<template>
    <div>
        <h2>Players</h2>

        <div>
            <button type="button" v-on:click="getPlayers(0)" class="btn btn-primary"><i class="fas fa-sync"></i> Refresh</button>
        </div>

        <p></p>

        <div v-if="players.length > 0">
            <div>
                {{ totalPlayers }} players total.
            </div>
            
            <p></p>

            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Provider</th>
                        <th scope="col">Provider User ID</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="player in players" :key="player.playerId">
                        <th scope="row">
                            <router-link :to="getPlayerLink(player)">{{ player.playerId }}</router-link>
                        </th>
                        <td>{{ player.provider }}</td>
                        <td>{{ player.providerUserId }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            No players found.
        </div>

        <p></p>

        <nav>
            <ul class="pagination flex-wrap">
                <li v-if="hasPrevious" class="page-item">
                    <a class="page-link" href="#" v-on:click="getPlayers(currentPage - 1)">Previous</a>
                </li>
                <li v-else class="page-item disabled">
                    <span class="page-link">Previous</span>
                </li>

                <li class="page-item" v-for="page in totalPages" :key="page" v-bind:class="{ active: isCurrentPage(page) }">
                    <span v-if="isCurrentPage(page)">
                        <span class="page-link">{{ page }}</span>
                    </span>
                    <span v-else>
                        <a class="page-link" href="#" v-on:click="getPlayers(page - 1)">{{ page }}</a>
                    </span>
                </li>

                <li v-if="hasNext" class="page-item">
                    <a class="page-link" href="#" v-on:click="getPlayers(currentPage + 1)">Next</a>
                </li>
                <li v-else class="page-item disabled">
                    <span class="page-link">Next</span>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Players',

    data: function() {
        return {
            players: [],
            totalPlayers: 0,
            totalPages: 0,
            currentPage: 0
        }
    },

    created: function () {
        this.getPlayers(0);
    },

    computed: {
        hasPrevious() {
            return this.currentPage > 0;
        },

        hasNext() {
            return this.currentPage < this.totalPages - 1;
        },
    },

    methods: {
        getPlayers: function (page) {
            this.$api.get('/open-game-backend-auth/admin/players?page=' + page,
                response => {
                    this.players = response.data.players;
                    this.totalPlayers = response.data.totalPlayers;
                    this.totalPages = response.data.totalPages;
                    this.currentPage = page;
                }
            );
        },

        isCurrentPage(page) {
            return (page - 1) == this.currentPage;
        },

        getPlayerLink (player) {
            return {
                name: 'player',
                params: {
                    playerId: player.playerId
                }
            }
        }
    }
}
</script>
