<template>
    <div>
        <h2>Admins</h2>

        <div>
            <button type="button" v-on:click="getAdmins" class="btn btn-primary">Refresh</button>
        </div>

        <p></p>

        <div v-if="admins.length > 0">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Provider</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="admin in admins" :key="admin.userId">
                        <th scope="row">{{ admin.userId }}</th>
                        <td>{{ admin.provider }}</td>
                        <td>{{ admin.locked ? 'Locked' : 'OK' }}</td>
                        <td>
                            <a v-if="!admin.locked" href="#" v-on:click="lockAdmin(admin)">Lock</a>
                            <a v-else href="#" v-on:click="unlockAdmin(admin)">Unlock</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            No admins found.
        </div>
    </div>
</template>

<script>
export default {
  name: 'Admins',

  data: function() {
    return {
        admins: []
    }
  },

  created: function () {
    this.getAdmins();
  },

  methods: {
    getAdmins: function () {
        this.$api.get('/open-game-backend-auth/admins',
            response => {
                this.admins = response.data.admins;
            }
        );
    },

    lockAdmin: function (admin) {
        this.$api.post('/open-game-backend-auth/lockPlayer',
            {
                'userId': admin.userId,
                'provider': admin.provider
            },
            response => {
                admin.locked = response.data.locked
            });
    },

    unlockAdmin: function (admin) {
        this.$api.post('/open-game-backend-auth/unlockPlayer',
            {
                'userId': admin.userId,
                'provider': admin.provider
            },
            response => {
                admin.locked = response.data.locked
            });
    },
  }
}
</script>
