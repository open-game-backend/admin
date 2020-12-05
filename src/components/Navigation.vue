<template>
    <nav>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <router-link to="/servers" class="nav-link" v-bind:class="{ active: isRoute('/servers') }">Servers</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/queue" class="nav-link" v-bind:class="{ active: isRoute('/queue') }">Queue</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/admins" class="nav-link" v-bind:class="{ active: isRoute('/admins') }">Admins</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/logout" class="nav-link" v-bind:class="{ active: isRoute('/logout') }">Logout</router-link>
            </li>

            <li>
                <Loading />
            </li>
        </ul>
    </nav>
</template>

<script>
import Loading from './Loading.vue'

export default {
  name: 'Navigation',

components: {
    Loading
  },

  methods: {
    isRoute: function (routePath) {
        return this.$route.path == routePath;
    }
  }
}
</script>
