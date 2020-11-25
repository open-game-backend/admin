<template>
    <div class="alert alert-danger" role="alert" v-if="error">
        {{ error }}
    </div>
</template>

<script>
import PubSub from 'pubsub-js'
import Topics from '../topics'

export default {
  name: 'Error',

  data: function() {
    return {
        error: ''
    }
  },

  created: function () {
    PubSub.subscribe(Topics.ERROR, this.onError);
  },

  methods: {
    onError: function (msg, data) {
        this.error = data;
    }
  }
}
</script>
