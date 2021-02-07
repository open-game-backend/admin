<template>
    <div>
        <h2>Player: {{ playerId }}</h2>

        <div>
            <button type="button" v-on:click="getData" class="btn btn-primary"><i class="fas fa-sync"></i> Refresh</button>
        </div>

        <p></p>

        <h4>Collection</h4>

        <div>
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">Item Definition</th>
                        <th scope="col">Count</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td scope="row">
                            <select class="form-select" v-model="newItem.itemDefinitionId">
                                <option disabled value="">Select item ...</option>
                                <option v-for="itemDefinition in itemDefinitions" :key="itemDefinition.id" :value="itemDefinition.id">
                                    {{ itemDefinition.id }}
                                </option>
                            </select>
                        </td>
                        <td scope="row">
                            <input type="number" min="1" v-model="newItem.itemCount" />
                        </td>
                        <td scope="row">
                            <button type="button" title="Add" v-on:click="addItem" class="btn btn-secondary btn-sm"><i class="fas fa-plus"></i></button>
                        </td>
                    </tr>

                    <tr v-for="item in collection" :key="item.id">
                        <th scope="row">{{ item.id }}</th>
                        <td scope="row">{{ item.count }}</td>
                        <td scope="row">
                            <button type="button" title="Remove" v-on:click="removeItem(item)" class="btn btn-secondary btn-sm"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Player',

  data: function() {
    return {
        collection: [],
        itemDefinitions: [],
        newItem: {
            itemDefinitionId: "",
            itemCount: 1
        }
    }
  },

  created: function () {
    this.getData();
  },

  computed: {
    playerId () {
        return this.$route.params.playerId
    }
  },

  methods: {
      getData: function () {
        this.$api.get('/open-game-backend-collection/admin/collection/' + this.playerId,
            response => {
                this.collection = response.data.collection;
            });
        
        this.$api.get('/open-game-backend-collection/admin/itemdefinitions',
            response => {
                this.itemDefinitions = response.data.itemDefinitions;
            });
      },

      addItem: function () {
            if (this.newItem.itemDefinitionId == "") {
                return;
            }

            this.$api.post('/open-game-backend-collection/admin/collection/' + this.playerId + '/items', this.newItem,
                () => { this.getData(); }
            );
      },

      removeItem: function (item) {
            this.$api.delete('/open-game-backend-collection/admin/collection/' + this.playerId + '/items/' + item.id,
                () => { this.getData(); }
            );
      }
  }
}
</script>

<style scoped>
</style>
