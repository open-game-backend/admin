<template>
    <span class="spinner-border spinner-border-sm" role="status" v-if="isLoading" />
</template>

<script>
import PubSub from 'pubsub-js'
import Topics from '../topics'

export default {
  name: 'Loading',

  data: function() {
    return {
        isLoading: ''
    }
  },

  created: function () {
    PubSub.subscribe(Topics.LOADING, this.onLoading);
  },

  methods: {
    onLoading: function (msg, data) {
        this.isLoading = data;
    }
  }
}
</script>
