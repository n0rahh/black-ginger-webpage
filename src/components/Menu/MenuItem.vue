<template>
  <v-expansion-panel rounded="lg">
    <v-expansion-panel-title>
      <template v-slot>
        <v-row no-gutters>
          <v-col class="d-flex justify-start" cols="6">
            <span class="text-h5">{{ title }}</span>
          </v-col>
          <v-col class="d-flex justify-end" cols="5">
            <v-fade-transition leave-absolute>
              <span class="text-h6 font-weight-bold">{{ price }} $</span>
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
        <v-col sm="6" cols="12" class="d-flex align-center">
          <p class="text-h6">
            {{ description }}
          </p>
        </v-col>
        <v-col sm="5" cols="12" offset-sm="1" class="d-flex justify-end">
          <v-img
            :src="image"
            class="mb-4"
            rounded="lg"
            width="100px"
            cover="1"
          />
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
