<template>
    <footer class="text-right">
        <small>Version {{ version }}</small>
    </footer>
</template>

<script>
export default {
  name: 'Footer',

  computed: {
    version() {
      return process.env.VUE_APP_VERSION
    }
  },
}
</script>
