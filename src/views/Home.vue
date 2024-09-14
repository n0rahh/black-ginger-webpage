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
import futoPhiladelphia from '@/assets/img/menu/futo-philadelphia.jpg';
import avocadoPhiladelphia from '@/assets/img/menu/avocado-philadelphia.jpg';
import bigScallop from '@/assets/img/menu/big-scallop.jpg';
import cucumberMaki from '@/assets/img/menu/cucumber-maki.jpg';
import futomaki from '@/assets/img/menu/futomaki.jpg';
import hightRoll from '@/assets/img/menu/hight-roll.jpg';
import pieceOfTempura from '@/assets/img/menu/piece-of-tempura.jpg';
import salmonMaki from '@/assets/img/menu/salmon-maki.jpg';
import tobikoNigiri from '@/assets/img/menu/tobiko-nigiri.jpg';

export default {
  name: 'Home',
  components: {
    MenuItem,
  },
  data() {
    return {
      sushiItems: [
        {
          title: 'Futo Philadelphia ',
          description: 'Salmon ,cream cheese, cucumber',
          price: 13,
          image: futoPhiladelphia,
        },
        {
          title: 'Piece of Tempura',
          description: 'Shrimp tempura,avocado , leek tempura',
          price: 15,
          image: pieceOfTempura,
        },
        {
          title: 'Big Scallop',
          description:
            'Shrimp tempura, crab meat imitation. On the top mixed chop scallops with tobiko + mayo + wasabi. Topped wasabi sos',
          price: 16,
          image: bigScallop,
        },
        {
          title: 'Cucumber maki',
          description: 'Cucumber, rice, nori. Gluten free',
          price: 2,
          image: cucumberMaki,
        },
        {
          title: 'Salmon maki ',
          description: 'Salmon, rice, nori. Gluten free. Contains fish',
          price: 3,
          image: salmonMaki,
        },
        {
          title: 'Tobiko nigiri',
          description: 'Raw salmon eggs with rice. Gluten free. 2 pcs',
          price: 5,
          image: tobikoNigiri,
        },
        {
          title: 'Hight roll',
          description:
            'Crab meat imitation, avocado, cucumber, cream cheese. On the top smoked salmon. Topped sweet mayo. Gluten free',
          price: 13,
          image: hightRoll,
        },
        {
          title: 'Avocado Philadelphia Roll',
          description:
            'Salmon + cream cheese + cucumber. Avocado and sesame on the top',
          price: 14,
          image: avocadoPhiladelphia,
        },
        {
          title: 'Futomaki',
          description: 'Salmon, avocado, cucumber. Gluten free',
          price: 12,
          image: futomaki,
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
