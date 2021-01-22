<template>
    <div>
        <h2>Admins</h2>

        <div>
            <button type="button" v-on:click="getAdmins" class="btn btn-primary"><i class="fas fa-sync"></i> Refresh</button>
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
                    <tr v-for="admin in admins" :key="admin.providerUserId">
                        <th scope="row">{{ admin.providerUserId }} <span v-if="isMe(admin)">(you)</span></th>
                        <td>{{ admin.provider }}</td>
                        <td>{{ admin.locked ? 'Locked' : 'OK' }}</td>
                        <td>
                            <a v-if="!isMe(admin) && !admin.locked" href="#" v-on:click="lockAdmin(admin)">Lock</a>
                            <a v-if="!isMe(admin) && admin.locked" href="#" v-on:click="unlockAdmin(admin)">Unlock</a>
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
        this.$api.get('/open-game-backend-auth/admin/admins',
            response => {
                this.admins = response.data.admins;
            }
        );
    },

    lockAdmin: function (admin) {
        this.$api.post('/open-game-backend-auth/admin/lockPlayer',
            {
                'provider': admin.provider,
                'providerUserId': admin.providerUserId,
            },
            response => {
                admin.locked = response.data.locked
            });
    },

    unlockAdmin: function (admin) {
        this.$api.post('/open-game-backend-auth/admin/unlockPlayer',
            {
                'provider': admin.provider,
                'providerUserId': admin.providerUserId,
            },
            response => {
                admin.locked = response.data.locked
            });
    },

    isMe: function (admin) {
        let loggedInAs = this.$store.state.loggedInAs;
        return loggedInAs != null && admin.providerUserId === loggedInAs.providerUserId && admin.provider === loggedInAs.provider
    }
  }
}
</script>
