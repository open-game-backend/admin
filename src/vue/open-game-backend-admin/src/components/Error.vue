<template>
    <div class="alert alert-danger" role="alert" v-if="error">
        {{ error }}
    </div>
</template>

<script>
import PubSub from 'pubsub-js'

export default {
  name: 'Error',

  data: function() {
    return {
        error: ''
    }
  },

  mounted: function () {
    PubSub.subscribe('error', this.onError);
  },

  methods: {
    onError: function (msg, data) {
        this.error = data;
    }
  }
}
</script>
