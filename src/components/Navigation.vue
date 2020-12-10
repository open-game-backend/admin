<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link to="/servers" class="nav-link" v-bind:class="{ active: isRoute('/servers') }"><i class="fas fa-server"></i> Servers</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/queue" class="nav-link" v-bind:class="{ active: isRoute('/queue') }"><i class="fas fa-user-friends"></i> Queue</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/admins" class="nav-link" v-bind:class="{ active: isRoute('/admins') }"><i class="fas fa-users-cog"></i> Admins</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/logout" class="nav-link" v-bind:class="{ active: isRoute('/logout') }"><i class="fas fa-sign-out-alt"></i> Logout</router-link>
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
