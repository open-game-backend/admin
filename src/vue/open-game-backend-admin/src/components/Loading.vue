<template>
    <span class="spinner-border spinner-border-sm" role="status" v-if="isLoading" />
</template>

<script>
import PubSub from 'pubsub-js'

export default {
  name: 'Loading',

  data: function() {
    return {
        isLoading: ''
    }
  },

  mounted: function () {
    PubSub.subscribe('loading', this.onLoading);
  },

  methods: {
    onLoading: function (msg, data) {
        this.isLoading = data;
    }
  }
}
</script>
