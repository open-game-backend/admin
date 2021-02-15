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
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="itemDefinition in itemDefinitions" :key="itemDefinition.id">
                        <th scope="row">{{ itemDefinition.id }}</th>
                        <td>
                            <span class="badge bg-primary text-light" v-for="itemTag in itemDefinition.tags" :key="itemTag">{{ itemTag }}</span>
                        </td>
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
    </div>
</template>

<script>
import FileSaver from 'file-saver';

export default {
    name: 'Collection',

    data: function() {
        return {
            itemDefinitions: [],
            itemSets: []
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

        downloadAsJson: function (data, fileName) {
            let json = JSON.stringify(data, null, 2);
            let blob = new Blob([json], { type: "application/json;charset=utf-8" });
            FileSaver.saveAs(blob, fileName);
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

        uploadAsJson: function (event, url, onSuccess) {
            if (event.target.files.length <= 0) {
                event.target.value = null;
                return;
            }

            const fileReader = new FileReader();

            fileReader.onload = e => {
                const fileContents = JSON.parse(e.target.result);

                this.$api.put(url, fileContents,
                    () => {
                        onSuccess(fileContents);
                    });
            }
            fileReader.readAsText(event.target.files.item(0));

            event.target.value = null;
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
