<template>
  <v-container class="py-16">
    <v-row>
      <v-col cols="12" class="text-center">
        <h1>Black Ginger Sushi menu</h1>
      </v-col>
    </v-row>
    <v-container class="mt-10 d-flex justify-center menu">
      <v-row>
        <v-col cols="12">
          <v-expansion-panels>
            <MenuItem
              v-for="(item, index) in sushiItems"
              :key="index"
              :title="item.title"
              :description="item.description"
              :price="item.price"
              :image="item.image"
            />
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import MenuItem from '@/components/Menu/MenuItem.vue';
import imagePhila from '@/assets/img/phila.jpg';
import imageCal from '@/assets/img/california.jpg';
import imageTuna from '@/assets/img/tuna.jpg';

export default {
  name: 'Home',
  components: {
    MenuItem,
  },
  data() {
    return {
      sushiItems: [
        {
          title: 'Philadelphia Roll',
          description:
            'Salmon, avocado, cucumber, cream cheese, tobiko, and spicy mayo.',
          price: 12.99,
          image: imagePhila,
        },
        {
          title: 'California Roll',
          description: 'Crab, avocado, cucumber, and tobiko.',
          price: 10.99,
          image: imageCal,
        },
        {
          title: 'Spicy Tuna Roll',
          description: 'Tuna, cucumber, and spicy mayo.',
          price: 11.99,
          image: imageTuna,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.menu {
  max-width: 900px;
}
</style>
