<template>
    <div>
        <h2>Quests</h2>

        <div>
            <button type="button" v-on:click="getData" class="btn btn-primary"><i class="fas fa-sync"></i> Refresh</button>
        </div>

        <p></p>

        <h4>Quest Categories</h4>

        <div>
            <button type="button" v-on:click="downloadQuestCategories" class="btn btn-primary btn-sm"><i class="fas fa-download"></i> Download</button>

            <label class="btn btn-primary btn-sm btn-upload">
                <i class="fas fa-upload"></i> Upload
                <input type="file" accept="application/json" v-on:input="uploadQuestCategories" hidden>
            </label>
        </div>
        <div v-if="questCategories.length > 0">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Generation Hour Of Day</th>
                        <th scope="col">Generation Day Of Week</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="questCategory in questCategories" :key="questCategory.id">
                        <th scope="row">{{ questCategory.id }}</th>
                        <td>{{ questCategory.generationHourOfDay }}</td>
                        <td>{{ questCategory.generationDayOfWeek }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            No quest categories found.
        </div>

        <h4>Quest Definitions</h4>

        <div>
            <button type="button" v-on:click="downloadQuestDefinitions" class="btn btn-primary btn-sm"><i class="fas fa-download"></i> Download</button>

            <label class="btn btn-primary btn-sm btn-upload">
                <i class="fas fa-upload"></i> Upload
                <input type="file" accept="application/json" v-on:input="uploadQuestDefinitions" hidden>
            </label>
        </div>
        <div v-if="questDefinitions.length > 0">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Category</th>
                        <th scope="col">Required Progress</th>
                        <th scope="col">Reward</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="questDefinition in questDefinitions" :key="questDefinition.id">
                        <th scope="row">{{ questDefinition.id }}</th>
                        <td>{{ questDefinition.category }}</td>
                        <td>{{ questDefinition.requiredProgress }}</td>
                        <td>{{ questDefinition.rewardItemCount }}x {{ questDefinition.rewardItemDefinitionId }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            No quest definitions found.
        </div>
    </div>
</template>

<script>
import DownloadUploadMixin from '../mixins/DownloadUploadMixin'

export default {
    name: 'Quests',

    mixins: [ DownloadUploadMixin ],
    
    data: function() {
        return {
            questCategories: [],
            questDefinitions: []
        }
    },

    created: function () {
        this.getData();
    },

    methods: {
        getData: function () {
            this.$api.get('/open-game-backend-quests/admin/questcategories',
                response => {
                    this.questCategories = response.data.categories;
                });

            this.$api.get('/open-game-backend-quests/admin/questdefinitions',
                response => {
                    this.questDefinitions = response.data.questDefinitions;
                });
        },

        downloadQuestCategories: function () {
            this.downloadAsJson(
                {
                    categories: this.questCategories
                },
                "QuestCategories.json");
        },

        downloadQuestDefinitions: function () {
            this.downloadAsJson(
                {
                    questDefinitions: this.questDefinitions
                },
                "QuestDefinitions.json");
        },

        uploadQuestCategories: function (event) {
            this.uploadAsJson(event, '/open-game-backend-quests/admin/questcategories', (fileContents) => {
                this.questCategories = fileContents.categories;
            });
        },

        uploadQuestDefinitions: function (event) {
            this.uploadAsJson(event, '/open-game-backend-quests/admin/questdefinitions', (fileContents) => {
                this.questDefinitions = fileContents.questDefinitions;
            });
        }
    }
}
</script>

<style scoped>
    .btn {
        margin-right: 0.5em;    
    }

    .btn-upload {
        margin-bottom: 0;
    }
</style>
