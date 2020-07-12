<template>
    <nav>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a v-bind:class="getNavLinkClass('Servers')" href="#" v-on:click="selectTab('Servers')">Servers</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="getNavLinkClass('Queue')" href="#" v-on:click="selectTab('Queue')">Queue</a>
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
    },

    getNavLinkClass: function (tabName) {
        return this.isTabSelected(tabName) ? "nav-link active" : "nav-link";
    }
  }
}
</script>
