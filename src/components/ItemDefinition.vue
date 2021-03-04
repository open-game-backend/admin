<template>
    <div v-if="itemDefinition != null">
        <h2>Item Definition: {{ itemDefinition.id }}</h2>

        <p></p>

        <h4>Details</h4>

        <table class="table table-striped table-sm">
          <tbody>
            <tr>
                <th scope="row">Tags</th>
                <td>
                  <span class="badge bg-primary text-light" v-for="itemTag in itemDefinition.tags" :key="itemTag">{{ itemTag }}</span>
                </td>
            </tr>

            <tr>
                <th scope="row">Max Count</th>
                <td>{{ itemDefinition.maxCount }}</td>
            </tr>
          </tbody>
        </table>

        <h4>Containers</h4>

        <div v-for="(container, index) in itemDefinition.containers" :key="index">
          <h6>Container {{ index + 1 }} ({{ container.itemCount}} Item(s))</h6>

          <table class="table table-striped table-sm">
            <thead>
              <tr>
                  <th scope="col">Required Tags</th>
                  <th scope="col">Relative Probability</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, index) in container.containedItems" :key="index">
                <td>
                  <span class="badge bg-primary text-light" v-for="itemTag in item.requiredTags" :key="itemTag">{{ itemTag }}</span>
                </td>
                <td>{{ item.relativeProbability }}</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ItemDefinition',

  data: function() {
    return {
        itemDefinition: null
    }
  },

  computed: {
    itemDefinitionId () {
      return this.$route.params.itemDefinitionId
    }
  },

  created: function () {
    this.getData();
  },

  methods: {
    getData: function () {
      this.$api.get('/open-game-backend-collection/admin/itemdefinitions',
        response => {
          this.itemDefinition = response.data.itemDefinitions.find(item => item.id == this.itemDefinitionId);
        });
    }
  }
}
</script>

<style scoped>
</style>
