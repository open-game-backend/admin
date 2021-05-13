<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link to="/players" class="nav-link" v-bind:class="{ active: isRoute('/players') }"><i class="fas fa-users"></i> Players</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/collection" class="nav-link" v-bind:class="{ active: isRoute('/collection') }"><i class="fas fa-box-open"></i> Collection</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/quests" class="nav-link" v-bind:class="{ active: isRoute('/quests') }"><i class="fas fa-tasks"></i> Quests</router-link>
            </li>
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
                <router-link to="/secretkeys" class="nav-link" v-bind:class="{ active: isRoute('/secretkeys') }"><i class="fas fa-key"></i> Keys</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/logout" class="nav-link" v-bind:class="{ active: isRoute('/logout') }"><i class="fas fa-sign-out-alt"></i> Logout</router-link>
            </li>

            <li>
                <Loading />
            </li>
        </ul>

        <span class="navbar-text">
            <small><i :class="authProvider"></i> {{ providerUserId }}</small>
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
        providerUserId() {
            return this.$store.state.loggedInAs.providerUserId;
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
