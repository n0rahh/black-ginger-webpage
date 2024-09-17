<template>
  <v-container class="cart-container">
    <v-card class="pa-8" rounded="xl">
      <v-card-title class="mb-6">
        <h2 class="text-h4">Cart</h2>
      </v-card-title>
      <v-card-text v-if="!cartItems.length">
        <p class="text-h6">Your cart is empty</p>
      </v-card-text>
      <v-card-text>
        <OrderSummary v-if="step === 1" :cartItems="cartItems" />
        <CustomerDetails
          v-if="step === 2"
          :cartItems="cartItems"
          @updateCustomerDetails="updateCustomerDetails"
        />
        <div v-if="cartItems.length">
          <v-row>
            <v-col cols="12">
              <v-divider opacity="1" />
            </v-col>
          </v-row>
          <BottomNav
            :totalPrice="totalPrice"
            :isLoading="isLoading"
            :step="step"
            @submitOrder="submitOrder"
            @next="step++"
          />
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
import BottomNav from '@/components/Cart/BottomNav.vue';
import OrderSummary from '@/components/Cart/OrderSummary.vue';
import CustomerDetails from '@/components/Cart/CustomerDetails.vue';

export default {
  name: 'Cart',
  components: {
    BottomNav,
    OrderSummary,
    CustomerDetails,
  },
  data() {
    return {
      cartStore: useCartStore(),
      step: 1,
      snackbar: {
        show: false,
        snackbarText: '',
        snackbarColor: 'green',
      },
      customer: {},
      isLoading: false,
      isFormValid: false,
    };
  },
  methods: {
    updateCustomerDetails(customerDetails) {
      this.customer = customerDetails;
    },
    clearSnackbar() {
      this.snackbar.show = false;
      this.snackbar.snackbarText = '';
    },
    async sendOrderNotification(orderDetails) {
      const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      const deliveryText = this.customer.deliveryOption
        ? `*Delivery:* ${this.customer.deliveryOption ? 'Yes' : 'No'}\n` +
          `*Delivery address:* ${this.customer.address}\n` +
          `*Delivery cost:* ${this.customer.deliveryCost}$\n\n`
        : '';

      const orderItems = orderDetails
        .map((item) => `• ${item.title}: ${item.quantity} x ${item.price}$`)
        .join('\n');
      const totalPrice = this.totalPrice;
      const message =
        `*New order received:*\n\n` +
        `*Name:* ${this.customer.name}\n` +
        `*Instagram:* ${this.customer.instagramUsername}\n\n` +
        deliveryText +
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
      // this.$refs.form.validate();

      // if (this.isFormValid) {
      this.isLoading = true;
      this.sendOrderNotification(this.cartItems);
      // }
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
@import '@/styles/colors';

.cart-container {
  max-width: 1000px;
}
</style>
