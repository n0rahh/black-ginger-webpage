<template>
  <v-container class="py-12">
    <v-row>
      <v-col cols="12" class="text-center">
        <h1>Black Ginger Sushi menu</h1>
      </v-col>
    </v-row>
    <v-container class="mt-6 d-flex justify-center menu">
      <v-row>
        <v-col cols="12">
          <v-expansion-panels>
            <MenuItem
              v-for="(item, index) in sushiItems"
              :key="index"
              :item="item"
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
import bigMysteryBox from '@/assets/img/menu/big-mystery-box.jpg';
import dragonRoll from '@/assets/img/menu/dragon-roll.jpg';
import mangoGrill from '@/assets/img/menu/mango-grill.jpg';
import mustHave from '@/assets/img/menu/must-have.jpg';
import philadelphiaRoll from '@/assets/img/menu/philadelphia-roll.jpg';
import sakuraRoll from '@/assets/img/menu/sakura-roll.jpg';
import salmonNigiri from '@/assets/img/menu/salmon-nigiri.jpg';
import salmonTataki from '@/assets/img/menu/salmon-tataki.jpg';
import unagiNigiri from '@/assets/img/menu/unagi-nigiri.jpg';
import yakuzaRoll from '@/assets/img/menu/yakuza-roll.jpg';

export default {
  name: 'Home',
  components: {
    MenuItem,
  },
  data() {
    return {
      sushiItems: [
        {
          id: 1,
          title: 'Futo Philadelphia',
          description: 'Salmon, cream cheese, cucumber',
          price: 13,
          image: futoPhiladelphia,
          isGlutenFree: false,
          pcs: 10,
        },
        {
          id: 2,
          title: 'Piece of Tempura',
          description: 'Shrimp tempura, avocado, leek tempura',
          price: 15,
          image: pieceOfTempura,
          isGlutenFree: false,
          pcs: 10,
        },
        {
          id: 3,
          title: 'Big Scallop',
          description:
            'Shrimp tempura, crab meat imitation. On the top mixed chop scallops with tobiko + mayo + wasabi. Topped wasabi sos',
          price: 16,
          image: bigScallop,
          isGlutenFree: false,
          pcs: 10,
        },
        {
          id: 4,
          title: 'Cucumber maki',
          description: 'Cucumber, rice, nori',
          price: 2,
          image: cucumberMaki,
          isGlutenFree: true,
          pcs: 8,
        },
        {
          id: 5,
          title: 'Salmon maki ',
          description: 'Salmon, rice, nori',
          price: 3,
          image: salmonMaki,
          isGlutenFree: true,
          pcs: 8,
        },
        {
          id: 6,
          title: 'Tobiko nigiri',
          description: 'Raw salmon eggs with rice',
          price: 5,
          image: tobikoNigiri,
          isGlutenFree: true,
          pcs: 2,
        },
        {
          id: 7,
          title: 'Hight roll',
          description:
            'Crab meat imitation, avocado, cucumber, cream cheese. On the top smoked salmon. Topped sweet mayo',
          price: 13,
          image: hightRoll,
          isGlutenFree: true,
          pcs: 10,
        },
        {
          id: 8,
          title: 'Avocado Philadelphia Roll',
          description:
            'Salmon + cream cheese + cucumber. Avocado and sesame on the top',
          price: 14,
          image: avocadoPhiladelphia,
          isGlutenFree: false,
          pcs: 10,
        },
        {
          id: 9,
          title: 'Futomaki',
          description: 'Salmon, avocado, cucumber',
          price: 12,
          image: futomaki,
          isGlutenFree: true,
          pcs: 10,
        },
        {
          id: 10,
          title: 'Must Have',
          description:
            'Soy paper, salmon, shrimp tempura, cream cheese, cucumbers. Topped tobiko',
          price: 17,
          image: mustHave,
          isGlutenFree: false,
          pcs: 10,
        },
        {
          id: 11,
          title: 'Dragon Roll',
          description:
            'Raw salmon, cucumber, cream cheese . On the top: raw salmon, sesame, tobiko',
          price: 16,
          image: dragonRoll,
          isGlutenFree: false,
          pcs: 10,
        },
        {
          id: 12,
          title: 'Big Mystery Box',
          description:
            '3 big rolls, 2 hosomaki, 2 gunkans for the Chef’s choice. Attention! Tell about your allergies and preferences',
          price: 55,
          image: bigMysteryBox,
          isGlutenFree: false,
          pcs: 48,
        },
        {
          id: 13,
          title: 'Mango Grill',
          description:
            'Grilled Salmon, cream cheese, cucumber, avocado. On the top Mango topped unagi sos',
          price: 16,
          image: mangoGrill,
          isGlutenFree: false,
          pcs: 10,
        },
        {
          id: 14,
          title: 'Salmon Nigiri',
          description: 'Raw Salmon , rice',
          price: 5,
          image: salmonNigiri,
          isGlutenFree: true,
          pcs: 2,
        },
        {
          id: 15,
          title: 'Philadelphia Roll',
          description: 'Raw salmon , cream cheese, cucumber',
          price: 14,
          image: philadelphiaRoll,
          isGlutenFree: false,
          pcs: 10,
        },
        {
          id: 16,
          title: 'Yakuza Roll',
          description:
            'Shrimp tempura, cream cheese, avocado. On the top torched salmon with unagi sos',
          price: 16,
          image: yakuzaRoll,
          isGlutenFree: false,
          pcs: 10,
        },
        {
          id: 17,
          title: 'Unagi nigiri',
          description: 'Bbq unagi, rice. Topped unagi sos',
          price: 6,
          image: unagiNigiri,
          isGlutenFree: false,
          pcs: 2,
        },
        {
          id: 18,
          title: 'Sakura Roll',
          description:
            'Soy paper, bbq eel, cream cheese, cucumber, oshinko. Topped unagi sos',
          price: 17,
          image: sakuraRoll,
          isGlutenFree: false,
          pcs: 10,
        },
        {
          id: 19,
          title: 'Salmon tataki',
          description:
            'Raw salmon cooked just a 3 sec for every side topped spicy chili pepper powder, green onions and ponzu sos',
          price: 17,
          image: salmonTataki,
          isGlutenFree: false,
          pcs: '8-12',
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
