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
                            <button type="button" title="Add" v-on:click="addItem" class="btn btn-secondary btn-sm"
                                :disabled="newItem.itemDefinitionId == '' || newItem.itemCount <= 0">
                                <i class="fas fa-plus"></i>
                            </button>
                        </td>
                    </tr>

                    <tr v-for="item in collection" :key="item.id">
                        <th scope="row">{{ item.id }}</th>
                        
                        <td scope="row" v-if="selectedItem.itemDefinitionId === item.id">
                            <input type="number" min="1" v-model="selectedItem.itemCount" />
                        </td>
                        <td scope="row" v-else>
                            {{ item.count }}
                        </td>
                        
                        <td scope="row" v-if="selectedItem.itemDefinitionId === item.id">
                            <button type="button" title="Accept" v-on:click="saveItem(item)" class="btn btn-secondary btn-sm"><i class="fas fa-check"></i></button>
                            <button type="button" title="Cancel" v-on:click="cancel()" class="btn btn-secondary btn-sm"><i class="fas fa-times"></i></button>
                        </td>
                        <td scope="row" v-else>
                            <button type="button" title="Edit" v-on:click="editItem(item)" class="btn btn-secondary btn-sm"><i class="fas fa-edit"></i></button>
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
            },
            selectedItem: {
                itemDefinitionId: null,
                itemCount: 0
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

                    console.log(this.collection[0].id)
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

        editItem: function(item) {
            this.selectedItem.itemDefinitionId = item.id
            this.selectedItem.itemCount = item.count
        },

        saveItem: function() {
            this.$api.put('/open-game-backend-collection/admin/collection/' + this.playerId + '/items/' + this.selectedItem.itemDefinitionId,
                { 'itemCount': this.selectedItem.itemCount },
                () => { 
                    this.getData();
                    this.cancel();
                }
            );
        },

        cancel: function() {
            this.selectedItem.itemDefinitionId = null
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
