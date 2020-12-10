<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <ul class="navbar-nav mr-auto">
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

        <span class="navbar-text">
            <small><i :class="authProvider"></i> {{ userId }}</small>
        </span>
    </nav>
</template>

<script>
import Loading from './Loading.vue'

export default {
    name: 'Navigation',

    components: {
        Loading
    },

    computed: {
        userId() {
            return this.$store.state.loggedInAs.userId;
        },

        authProvider() {
            switch (this.$store.state.loggedInAs.provider) {
                case 'github':
                    return "fab fa-github";
            }

            return "far fa-question-circle";
        }
    },

    methods: {
        isRoute: function (routePath) {
            return this.$route.path == routePath;
        }
    }
}
</script>
