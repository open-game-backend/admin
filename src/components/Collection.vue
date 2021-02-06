<template>
    <div>
        <h2>Collection</h2>

        <div>
            <button type="button" v-on:click="getData" class="btn btn-primary"><i class="fas fa-sync"></i> Refresh</button>
            <button type="button" v-on:click="downloadItemDefinitions" class="btn btn-primary"><i class="fas fa-download"></i> Download</button>

            <label class="btn btn-primary btn-upload">
                <i class="fas fa-upload"></i> Upload
                <input type="file" accept="application/json" v-on:input="uploadItemDefinitions" hidden>
            </label>
        </div>

        <p></p>

        <h4>Item Definitions</h4>

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

        <p></p>

        <h4>Item Tags</h4>

        <div v-if="itemTags.length > 0">
            <ul>
                <li v-for="tag in itemTags" :key="tag">{{ tag }}</li>
            </ul>
        </div>
        <div v-else>
            No item tags found.
        </div>
    </div>
</template>

<script>
import FileSaver from 'file-saver';

export default {
  name: 'Collection',

  data: function() {
    return {
        itemTags: [],
        itemDefinitions: []
    }
  },

  created: function () {
    this.getData();
  },

  methods: {
      getData: function () {
          this.$api.get('/open-game-backend-collection/admin/itemdefinitions',
              response => {
                  this.itemTags = response.data.itemTags;
                  this.itemDefinitions = response.data.itemDefinitions;
              });
      },

      downloadItemDefinitions: function () {
        this.downloadAsJson(
            {
                itemTags: this.itemTags,
                itemDefinitions: this.itemDefinitions
            },
            "ItemDefinitions.json");
      },

      uploadItemDefinitions: function (event) {
        if (event.target.files.length <= 0) {
            event.target.value = null;
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = e => {
            const fileContents = JSON.parse(e.target.result);

            this.$api.put('/open-game-backend-collection/admin/itemdefinitions', fileContents,
              () => {
                  this.itemTags = fileContents.itemTags;
                  this.itemDefinitions = fileContents.itemDefinitions;
              });
        }
        fileReader.readAsText(event.target.files.item(0));

        event.target.value = null;
      },

      downloadAsJson: function (data, fileName) {
        let json = JSON.stringify(data, null, 2);
        let blob = new Blob([json], { type: "application/json;charset=utf-8" });
        FileSaver.saveAs(blob, fileName);
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
