<template>
  <v-row>
    <v-col
      cols="12"
      class="d-flex"
      :class="{
        'justify-space-between align-center': !$vuetify.display.xs,
        'flex-column': $vuetify.display.xs,
      }"
    >
      <div class="d-flex flex-column">
        <div class="d-flex align-center justify-space-between">
          <span class="text-h6">Summary:</span>
          <span class="text-h5 ml-4">{{ totalPrice }} $</span>
        </div>
        <span v-if="deliveryCost" class="text-h6 text-end">
          + {{ deliveryCost }} $ delivery
        </span>
      </div>
      <v-btn
        color="tertiary"
        @click="buttonHandler"
        :class="{
          'mt-4': $vuetify.display.xs,
        }"
      >
        <span v-if="!isLoading">{{ buttonText }}</span>
        <v-progress-circular v-else indeterminate color="white" size="24" />
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'BottomNav',
  props: {
    totalPrice: {
      type: Number,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
    deliveryCost: {
      type: Number,
      required: true,
    },
  },
  computed: {
    buttonText() {
      return this.step === 1 ? 'Next' : 'Submit order';
    },
  },
  methods: {
    buttonHandler() {
      if (this.step === 1) {
        this.$emit('next');
      } else {
        this.$emit('submitOrder');
      }
    },
  },
};
</script>
