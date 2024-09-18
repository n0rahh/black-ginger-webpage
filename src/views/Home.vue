<template>
  <v-container class="py-12">
    <v-row>
      <v-col cols="12" class="text-center">
        <h1>Black Ginger Sushi menu</h1>
      </v-col>
    </v-row>
    <v-container class="mt-6 menu">
      <v-row>
        <v-col cols="12" class="py-0 d-flex justify-end">
          <v-select
            v-model="selectedType"
            label="Filter by"
            item-title="text"
            item-value="value"
            :items="types"
            variant="outlined"
            max-width="300"
            @update:modelValue="filterByType"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-expansion-panels>
            <MenuItem
              v-for="(item, index) in filteredSushiItems"
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
import { toRaw } from 'vue';
import { MenuItemType } from '@/utils/enum';
import { sushiItems, types } from '@/helpers/static/menu';
import MenuItem from '@/components/Menu/MenuItem.vue';

export default {
  name: 'Home',
  components: {
    MenuItem,
  },
  data() {
    return {
      sushiItems,
      types,
      selectedType: {
        text: 'All',
        value: MenuItemType.ALL,
      },
      filteredSushiItems: [],
    };
  },
  created() {
    this.filteredSushiItems = this.sushiItems;
  },
  methods: {
    filterByType(event) {
      const rawSushiItems = toRaw(this.sushiItems);

      if (event === MenuItemType.ALL) {
        this.filteredSushiItems = rawSushiItems;
      } else {
        this.filteredSushiItems = rawSushiItems.filter(
          (item) => item.itemType === event,
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  max-width: 900px;
}
</style>
