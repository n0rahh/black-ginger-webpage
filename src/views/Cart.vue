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
              class="mb-4 list-item"
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
        <div v-if="cartItems.length">
          <v-row>
            <v-col cols="12" class="py-0">
              <v-divider opacity="1" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex flex-column">
              <v-form ref="form" v-model="isFormValid">
                <span class="text-h6">Provide some information</span>
                <v-text-field
                  v-model="customer.name"
                  label="Your name"
                  variant="outlined"
                  :rules="nameRules"
                  max-width="300"
                  class="my-4"
                  required
                />
                <v-text-field
                  v-model="customer.instagramUsername"
                  label="Your Instagram username"
                  variant="outlined"
                  :rules="instagramRules"
                  max-width="300"
                  class="mb-4"
                  required
                />
              </v-form>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="py-0">
              <v-divider opacity="1" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12"> </v-col>
            <v-col
              cols="12"
              class="d-flex"
              :class="{
                'justify-space-between align-center': !$vuetify.display.xs,
                'flex-column': $vuetify.display.xs,
              }"
            >
              <p class="d-flex align-center justify-space-between">
                <span class="text-h6">Summary:</span>
                <span class="text-h5 ml-4">{{ totalPrice }} $</span>
              </p>
              <v-btn
                color="primary"
                @click="submitOrder"
                :class="{
                  'mt-4': $vuetify.display.xs,
                }"
              >
                <span v-if="!isLoading">Send order</span>
                <v-progress-circular
                  v-else
                  indeterminate
                  color="white"
                  size="24"
                />
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar.show" :color="snackbar.snackbarColor">
      {{ snackbar.snackbarText }}
    </v-snackbar>
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
      snackbar: {
        show: false,
        snackbarText: '',
        snackbarColor: 'green',
      },
      customer: {
        name: '',
        instagramUsername: '',
      },
      nameRules: [(v) => !!v || 'Name is required'],
      instagramRules: [(v) => !!v || 'Instagram username is required'],
      isLoading: false,
      isFormValid: false,
    };
  },
  methods: {
    decrementQuantity(item) {
      this.cartStore.decrementQuantity(item);
    },
    incrementQuantity(item) {
      this.cartStore.incrementQuantity(item);
    },
    clearSnackbar() {
      this.snackbar.show = false;
      this.snackbar.snackbarText = '';
    },
    async sendOrderNotification(orderDetails) {
      const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      const orderItems = orderDetails
        .map((item) => `• ${item.title}: ${item.quantity} x ${item.price}$`)
        .join('\n');
      const totalPrice = this.totalPrice;
      const message =
        `*New order received:*\n\n` +
        `*Name:* ${this.customer.name}\n` +
        `*Instagram:* ${this.customer.instagramUsername}\n\n` +
        `${orderItems}\n\n` +
        `*Total Price:* ${totalPrice}$`;

      try {
        await axios.post(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            chat_id: chatId,
            text: message,
            parse_mode: 'MarkdownV2',
          },
        );
        this.snackbar.snackbarText = 'Order sent successfully';
        this.snackbar.show = true;
        this.isLoading = false;

        setTimeout(() => {
          this.clearSnackbar();
          this.cartStore.clearCart();
          this.$router.push('/');
        }, 2000);
      } catch {
        this.snackbar.snackbarText = 'Error sending order';
        this.snackbar.show = true;
        this.snackbar.snackbarColor = 'red';
        this.isLoading = false;

        setTimeout(() => {
          this.clearSnackbar();
        }, 2000);
      }
    },
    submitOrder() {
      this.$refs.form.validate();

      if (this.isFormValid) {
        this.isLoading = true;
        this.sendOrderNotification(this.cartItems);
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
