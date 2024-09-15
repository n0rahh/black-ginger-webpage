<template>
  <v-expansion-panel rounded="lg">
    <v-expansion-panel-title>
      <template v-slot>
        <v-row no-gutters>
          <v-col class="d-flex justify-start align-center" cols="5">
            <span
              :class="{
                'text-subtitle-1': $vuetify.display.xs,
                'text-h5': !$vuetify.display.xs,
              }"
            >
              {{ item.title }}
            </span>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <span v-if="item.isGlutenFree" class="ml-6 text-green">
              {{ glutenFreeTextHandler }}
            </span>
          </v-col>
          <v-col class="d-flex justify-end align-center" cols="3">
            <v-fade-transition leave-absolute>
              <span class="text-h6 font-weight-bold">{{ item.price }} $</span>
            </v-fade-transition>
          </v-col>
        </v-row>
      </template>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-row
        no-gutters
        :class="{
          'd-flex flex-column-reverse': $vuetify.display.xs,
        }"
      >
        <v-col sm="6" cols="12" class="d-flex flex-column justify-center">
          <p class="text-h6">
            {{ item.description }}
          </p>
          <p class="text-h6 mt-8">{{ item.pcs }} pcs</p>
        </v-col>
        <v-col sm="5" cols="12" offset-sm="1" class="d-flex justify-end">
          <v-img
            :src="item.image"
            class="my-4"
            rounded="lg"
            width="100px"
            cover
            max-height="300px"
          />
        </v-col>
        <v-col cols="12" class="text-center">
          <v-btn @click="addToCart(item)" block color="tertiary">
            ADD TO CART
          </v-btn>
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script>
import { useCartStore } from '@/store/cart';

export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    glutenFreeTextHandler() {
      return this.$vuetify.display.xs ? 'GF' : 'Gluten free';
    },
  },
  methods: {
    addToCart(item) {
      const cartStore = useCartStore();
      cartStore.addToCart(item);
    },
  },
};
</script>
