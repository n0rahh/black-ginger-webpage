<template>
  <v-app theme="dark" class="app">
    <Toolbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Toolbar from './components/UI/Toolbar.vue';
export default {
  name: 'App',
  components: {
    Toolbar,
  },
};
</script>

<style lang="scss">
@import '@/styles/global';

.app {
  background-color: $primary !important;
  color: $tertiary !important;
}
</style>
