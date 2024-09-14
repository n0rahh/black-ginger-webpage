import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  actions: {
    addToCart(item) {
      const existingItem = this.items.find((i) => i.title === item.title);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
    },
    decrementQuantity(item) {
      const existingItem = this.items.find((i) => i.title === item.title);
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        this.items = this.items.filter((i) => i.title !== item.title);
      }
    },
    incrementQuantity(item) {
      const existingItem = this.items.find((i) => i.title === item.title);
      if (existingItem.quantity < 10) existingItem.quantity++;
    },
    clearCart() {
      this.items = [];
    },
  },
  getters: {
    totalPrice: (state) => {
      return state.items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    itemCount: (state) => {
      return state.items.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
    },
  },
});
