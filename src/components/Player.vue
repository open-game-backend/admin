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
                        <td>
                            <select class="form-select" v-model="newItem.itemDefinitionId">
                                <option disabled value="">Select item ...</option>
                                <option v-for="itemDefinition in itemDefinitions" :key="itemDefinition.id" :value="itemDefinition.id">
                                    {{ itemDefinition.id }}
                                </option>
                            </select>
                        </td>
                        <td>
                            <input type="number" min="1" v-model="newItem.itemCount" />
                        </td>
                        <td>
                            <button type="button" title="Add" v-on:click="addItem" class="btn btn-secondary btn-sm"
                                :disabled="newItem.itemDefinitionId == '' || newItem.itemCount <= 0">
                                <i class="fas fa-plus"></i>
                            </button>
                        </td>
                    </tr>

                    <tr v-for="item in collection" :key="item.id">
                        <th scope="row">{{ item.id }}</th>
                        
                        <td v-if="selectedItem.itemDefinitionId === item.id">
                            <input type="number" min="1" v-model="selectedItem.itemCount" />
                        </td>
                        <td v-else>
                            {{ item.count }}
                        </td>
                        
                        <td v-if="selectedItem.itemDefinitionId === item.id">
                            <button type="button" title="Accept" v-on:click="saveItem(item)" class="btn btn-secondary btn-sm"><i class="fas fa-check"></i></button>
                            <button type="button" title="Cancel" v-on:click="cancel()" class="btn btn-secondary btn-sm"><i class="fas fa-times"></i></button>
                        </td>
                        <td v-else>
                            <button type="button" title="Edit" v-on:click="editItem(item)" class="btn btn-secondary btn-sm"><i class="fas fa-edit"></i></button>
                            <button type="button" title="Remove" v-on:click="removeItem(item)" class="btn btn-secondary btn-sm"><i class="fas fa-trash"></i></button>                           
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p></p>

        <h4>Claimed Item Sets</h4>

        <div v-if="claimedItemSets.length > 0">
            <ul>
                <li v-for="claimedItemSet in claimedItemSets" :key="claimedItemSet">{{ claimedItemSet }}</li>
            </ul>
        </div>
        <div v-else>
            No item sets claimed yet.
        </div>

        <p></p>
        
        <h4>Quests</h4>

        <div>
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">Quest</th>
                        <th scope="col">Progress</th>
                        <th scope="col">Generated At</th>
                        <th scope="col">Completed At</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="quest in quests" :key="quest.id">
                        <th scope="row">{{ quest.questDefinitionId }}</th>
                        <td>{{ quest.currentProgress }}/{{ quest.requiredProgress }}</td>
                        <td>{{ quest.generatedAt }}</td>
                        <td>{{ quest.completedAt }}</td>
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
            claimedItemSets: [],
            quests: [],
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
                });
            
            this.$api.get('/open-game-backend-collection/admin/itemdefinitions',
                response => {
                    this.itemDefinitions = response.data.itemDefinitions;
                });

            this.$api.get('/open-game-backend-collection/admin/claimeditemsets/' + this.playerId,
                response => {
                    this.claimedItemSets = response.data.claimedItemSets;
                });

            this.$api.get('/open-game-backend-quests/admin/playerquests/' + this.playerId,
                response => {
                    this.quests = response.data.quests;
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
    .btn-sm {
        width: 3em;
        margin-right: 0.5em;
    }
</style>
