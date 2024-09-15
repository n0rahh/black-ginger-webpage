<template>
  <v-container>
    <v-card class="pa-8" rounded="xl">
      <v-card-title class="mb-6">
        <h2 class="text-h4">Cart</h2>
      </v-card-title>
      <v-card-text v-if="!cartItems.length">
        <p class="text-h6">Your cart is empty</p>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-list>
              <v-list-item
                v-for="item in cartItems"
                :key="item.id"
                class="mb-6"
              >
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
                <v-list-item-subtitle> {{ item.price }}$ </v-list-item-subtitle>
                <v-spacer></v-spacer>
                <template v-slot:append>
                  <v-list-item-action>
                    <v-btn
                      color="tertiary"
                      size="x-small"
                      icon
                      @click="decrementQuantity(item)"
                    >
                      <v-icon size="small">mdi-minus</v-icon>
                    </v-btn>
                    <div class="square">
                      <span class="mx-4">{{ item.quantity }}</span>
                    </div>
                    <v-btn
                      color="tertiary"
                      size="x-small"
                      icon
                      @click="incrementQuantity(item)"
                    >
                      <v-icon size="small">mdi-plus</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-row v-if="cartItems.length">
          <v-col cols="12" class="d-flex justify-end">
            <span class="text-h6">Summary: {{ totalPrice }} $</span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { useCartStore } from '@/store/cart';

export default {
  name: 'Cart',
  data() {
    return {
      cartStore: useCartStore(),
    };
  },
  methods: {
    decrementQuantity(item) {
      this.cartStore.decrementQuantity(item);
    },
    incrementQuantity(item) {
      this.cartStore.incrementQuantity(item);
    },
  },
  computed: {
    cartItems() {
      return this.cartStore.items;
    },
    totalPrice() {
      return this.cartStore.totalPrice;
    },
  },
};
</script>

<style lang="scss" scoped>
.square {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0 8px;
}
</style>
