<template>
    <nav>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link" v-bind:class="{ active: isTabSelected('Servers') }" href="#" v-on:click="selectTab('Servers')">Servers</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" v-bind:class="{ active: isTabSelected('Queue') }" href="#" v-on:click="selectTab('Queue')">Queue</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" v-bind:class="{ active: isTabSelected('Logout') }" href="#" v-on:click="selectTab('Logout')">Logout</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  name: 'Navigation',

  data: function() {
    return {
        selectedTab: 'Servers'
    }
  },

  methods: {
    selectTab: function (tabName) {
        if (this.isTabSelected(tabName)) {
            return;
        }

        this.selectedTab = tabName;

        this.$emit('onSelectedTabChanged', this.selectedTab)
    },

    isTabSelected: function (tabName) {
        return this.selectedTab == tabName;
    }
  }
}
</script>
