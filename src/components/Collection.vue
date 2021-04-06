<template>
    <div>
        <h2>Collection</h2>

        <div>
            <button type="button" v-on:click="getData" class="btn btn-primary"><i class="fas fa-sync"></i> Refresh</button>
        </div>

        <p></p>

        <h4>Item Definitions</h4>

        <div>
            <button type="button" v-on:click="downloadItemDefinitions" class="btn btn-primary btn-sm"><i class="fas fa-download"></i> Download</button>

            <label class="btn btn-primary btn-sm btn-upload">
                <i class="fas fa-upload"></i> Upload
                <input type="file" accept="application/json" v-on:input="uploadItemDefinitions" hidden>
            </label>
        </div>
        <div v-if="itemDefinitions.length > 0">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tags</th>
                        <th scope="col">Max Count</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="itemDefinition in itemDefinitions" :key="itemDefinition.id">
                        <th scope="row">
                            <router-link :to="getItemDefinitionLink(itemDefinition)">{{ itemDefinition.id }}</router-link>
                        </th>

                        <td>
                            <span class="badge bg-primary text-light" v-for="itemTag in itemDefinition.tags" :key="itemTag">{{ itemTag }}</span>
                        </td>
                        <td>{{ itemDefinition.maxCount }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            No item definitions found.
        </div>

        <h4>Item Sets</h4>

        <div>
            <button type="button" v-on:click="downloadItemSets" class="btn btn-primary btn-sm"><i class="fas fa-download"></i> Download</button>

            <label class="btn btn-primary btn-sm btn-upload">
                <i class="fas fa-upload"></i> Upload
                <input type="file" accept="application/json" v-on:input="uploadItemSets" hidden>
            </label>
        </div>
        <div v-if="itemSets.length > 0">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Items</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="itemSet in itemSets" :key="itemSet.id">
                        <th scope="row">{{ itemSet.id }}</th>
                        <td>
                            <ul>
                                <li v-for="item in itemSet.items" :key="item.itemDefinitionId">
                                    {{ item.count }}x {{ item.itemDefinitionId }}
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            No item sets found.
        </div>

        <h4>Loadout Types</h4>

        <div>
            <button type="button" v-on:click="downloadLoadoutTypes" class="btn btn-primary btn-sm"><i class="fas fa-download"></i> Download</button>

            <label class="btn btn-primary btn-sm btn-upload">
                <i class="fas fa-upload"></i> Upload
                <input type="file" accept="application/json" v-on:input="uploadLoadoutTypes" hidden>
            </label>
        </div>
        <div v-if="loadoutTypes.length > 0">
            <div v-for="loadoutType in loadoutTypes" :key="loadoutType.id">
                <h6>{{ loadoutType.id }} </h6>

                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Item Tag</th>
                            <th scope="col">Min Total</th>
                            <th scope="col">Max Total</th>
                            <th scope="col">Max Copies</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="loadoutRule in loadoutType.rules" :key="loadoutRule.itemTag">
                            <th scope="row">{{ loadoutRule.itemTag }}</th>
                            <td scope="row">{{ loadoutRule.minTotal }}</td>
                            <td scope="row">{{ loadoutRule.maxTotal }}</td>
                            <td scope="row">{{ loadoutRule.maxCopies }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else>
            No loadout types found.
        </div>
    </div>
</template>

<script>
import DownloadUploadMixin from '../mixins/DownloadUploadMixin'

export default {
    name: 'Collection',

    mixins: [ DownloadUploadMixin ],

    data: function() {
        return {
            itemDefinitions: [],
            itemSets: [],
            loadoutTypes: []
        }
    },

    created: function () {
        this.getData();
    },

    methods: {
        getData: function () {
            this.$api.get('/open-game-backend-collection/admin/itemdefinitions',
                response => {
                    this.itemDefinitions = response.data.itemDefinitions;
                });

            this.$api.get('/open-game-backend-collection/admin/itemsets',
                response => {
                    this.itemSets = response.data.itemSets;
                });

            this.$api.get('/open-game-backend-collection/admin/loadouttypes',
                response => {
                    this.loadoutTypes = response.data.loadoutTypes;
                });
        },

        downloadItemDefinitions: function () {
            this.downloadAsJson(
                {
                    itemDefinitions: this.itemDefinitions
                },
                "ItemDefinitions.json");
        },

        downloadItemSets: function () {
            this.downloadAsJson(
                {
                    itemSets: this.itemSets
                },
                "ItemSets.json");
        },

        downloadLoadoutTypes: function () {
            this.downloadAsJson(
                {
                    loadoutTypes: this.loadoutTypes
                },
                "LoadoutTypes.json");
        },

        uploadItemDefinitions: function (event) {
            this.uploadAsJson(event, '/open-game-backend-collection/admin/itemdefinitions', (fileContents) => {
                this.itemDefinitions = fileContents.itemDefinitions;
            });
        },

        uploadItemSets: function (event) {
            this.uploadAsJson(event, '/open-game-backend-collection/admin/itemsets', (fileContents) => {
                this.itemSets = fileContents.itemSets;
            });
        },

        uploadLoadoutTypes: function (event) {
            this.uploadAsJson(event, '/open-game-backend-collection/admin/loadouttypes', (fileContents) => {
                this.loadoutTypes = fileContents.loadoutTypes;
            });
        },

        getItemDefinitionLink (itemDefinition) {
            return {
                name: 'itemDefinition',
                params: {
                    itemDefinitionId: itemDefinition.id
                }
            }
        }
    }
}
</script>

<style scoped>
    .badge {
        margin-right: 0.5em;
    }

    .btn {
        margin-right: 0.5em;    
    }

    .btn-upload {
        margin-bottom: 0;
    }
</style>
