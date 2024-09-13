<template>
  <v-app theme="dark" class="app">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
@import '@/styles/global';

.app {
  background-color: $background-color !important;
}
</style>
