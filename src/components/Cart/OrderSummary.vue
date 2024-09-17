<template>
  <v-row>
    <v-col cols="12">
      <div v-for="item in cartItems" :key="item.id" class="mb-4 list-item">
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
</template>

<script>
import { useCartStore } from '@/store/cart';

export default {
  name: 'CartItems',
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const cartStore = useCartStore();

    const incrementQuantity = (item) => {
      cartStore.incrementQuantity(item);
    };

    const decrementQuantity = (item) => {
      cartStore.decrementQuantity(item);
    };

    return {
      incrementQuantity,
      decrementQuantity,
    };
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
