<template>
    <div>
        <h2>Secret Keys</h2>

        <div>
            <button type="button" v-on:click="getKeys" class="btn btn-primary"><i class="fas fa-sync"></i> Refresh</button>
            <button type="button" v-on:click="generateKey" class="btn btn-primary"><i class="fas fa-plus"></i> Generate Key</button>
        </div>

        <p></p>

        <div v-if="keys.length > 0">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">Key</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="key in keys" :key="key">
                        <th scope="row">{{ key }}</th>
                        <td>
                          <button type="button" title="Remove" v-on:click="removeKey(key)" class="btn btn-secondary btn-sm"><i class="fas fa-trash"></i></button>  
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            No secret keys found.
        </div>
    </div>
</template>

<script>
export default {
  name: 'SecretKeys',

  data: function() {
    return {
        keys: []
    }
  },

  created: function () {
    this.getKeys();
  },

  methods: {
      getKeys: function () {
          this.$api.get('/open-game-backend-auth/admin/secretkeys',
              response => {
                  this.keys = response.data.keys;
              });
      },
      generateKey: function () {
          this.$api.post('/open-game-backend-auth/admin/secretkeys', null,
              response => {
                  this.keys.push(response.data.key);
              });
      },
      removeKey: function (key) {
          this.$api.delete('/open-game-backend-auth/admin/secretkeys/' + key,
              () => {
                  this.keys.splice(this.keys.indexOf(key), 1);
              });
      }
  }
}
</script>

<style scoped>
    .btn {
        margin-right: 0.5em;    
    }
</style>
