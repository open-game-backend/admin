<template>
    <div class="alert alert-danger" role="alert" v-if="$store.state.error">
        {{ $store.state.error }}
    </div>
</template>

<script>
export default {
  name: 'Error',
}
</script>
