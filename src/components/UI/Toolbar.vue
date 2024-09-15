<template>
  <v-app-bar elevation="2" color="primary" class="px-6">
    <v-toolbar-title>
      <v-img
        :src="logo"
        width="120"
        class="cursor-pointer"
        @click="$router.push('/')"
      />
    </v-toolbar-title>
    <v-spacer />
    <v-btn icon class="cart-button" @click="$router.push('/cart')">
      <v-badge color="tertiary" :content="content" size="small">
        <v-icon>mdi-cart-variant</v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { useCartStore } from '@/store/cart';
import logo from '@/assets/img/logo.png';

export default {
  name: 'Toolbar',
  data() {
    return {
      logo,
      cartStore: useCartStore(),
    };
  },
  computed: {
    content() {
      return this.cartStore.itemCount;
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-button {
  position: relative;
}
</style>
