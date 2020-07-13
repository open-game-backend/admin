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
                <router-link to="/logout" class="nav-link" v-bind:class="{ active: isRoute('/logout') }">Logout</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  name: 'Navigation',

  methods: {
    isRoute: function (tabName) {
        return this.$route.path == tabName;
    }
  }
}
</script>
