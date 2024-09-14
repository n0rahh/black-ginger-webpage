<template>
  <v-app-bar elevation="2" color="primary">
    <v-toolbar-title>
      <v-img :src="logo" width="120" />
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
import logo from '@/assets/img/logo.png';
export default {
  name: 'Toolbar',
  data() {
    return {
      logo,
    };
  },
};
</script>
