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
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="mb-6 list-item"
            >
              <div class="content">
                <span class="text-h6">
                  <span>{{ item.title }}</span>
                  <span class="ml-4">{{ item.price }}$</span>
                </span>
              </div>
              <div class="actions d-flex align-center">
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
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row v-if="cartItems.length">
          <v-col cols="12" class="py-0">
            <v-divider opacity="1" />
          </v-col>
        </v-row>
        <v-row v-if="cartItems.length">
          <v-col cols="12"> </v-col>
          <v-col cols="12" class="d-flex justify-space-between align-center">
            <span class="text-h6">Summary: {{ totalPrice }} $</span>
            <v-btn color="primary" @click="sendOrderNotification(cartItems)">
              Send order
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
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
    async sendOrderNotification(orderDetails) {
      const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      const orderItems = orderDetails
        .map((item) => {
          return `• ${item.title}: ${item.quantity} x ${item.price}$`;
        })
        .join('\n');

      const totalPrice = this.totalPrice;

      const message = `*New order received:*\n\n${orderItems}\n\n*Total Price:* ${totalPrice}$`;

      try {
        await axios
          .post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: message,
            parse_mode: 'MarkdownV2',
          })
          .then(() => {
            this.cartStore.clearCart();
            this.$router.push('/');
          });
      } catch (error) {
        console.error('Error sending message:', error);
      }
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

.list-item {
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #cccccc52;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 480px) {
    flex-direction: column;

    .content {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      text-align: center;
    }

    .actions {
      width: 100%;
      justify-content: space-around;
    }
  }
}
</style>
