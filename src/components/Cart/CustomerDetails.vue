<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex flex-column">
        <v-form ref="form">
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
            required
          />
          <div v-if="customer.deliveryOption" class="d-flex flex-column mb-2">
            <div class="d-flex align-center">
              <v-text-field
                v-model="customer.address"
                label="Your address and city"
                variant="outlined"
                max-width="300"
                :rules="customer.deliveryOption ? addressRules : []"
                :required="customer.deliveryOption"
                class="mt-4"
              />
              <v-tooltip
                text="Enter your home address and city without your unit number"
              >
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" color="tertiary" class="ml-2">
                    mdi-information
                  </v-icon>
                </template>
              </v-tooltip>
            </div>
            <span v-if="!estimatedDeliveryCost" class="mt-2">
              {{ addressMessage }}
            </span>
            <span v-else class="mt-2">
              Estimated delivery cost:
              {{ estimatedDeliveryCost }}
            </span>
            <v-btn
              color="tertiary"
              size="small"
              @click="calculateDeliveryCost"
              :disabled="!customer.address"
              max-width="250"
              class="mt-2"
            >
              Calculate delivery cost
            </v-btn>
          </div>
          <v-checkbox
            v-model="customer.deliveryOption"
            label="Deliver to my address"
            class="py-0"
          />
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CustomerDetails',
  data() {
    return {
      customer: {
        name: '',
        instagramUsername: '',
        address: '',
        deliveryOption: false,
        deliveryCost: 0,
      },
      estimatedDeliveryCost: 0,
      nameRules: [(v) => !!v || 'Name is required'],
      instagramRules: [(v) => !!v || 'Instagram username is required'],
      addressRules: [(v) => !!v || 'Address is required'],
      addressMessage: 'Enter your address and city',
      deliveryIsNotAvailable: false,
    };
  },
  watch: {
    customer: {
      handler() {
        this.$emit('updateCustomerDetails', this.customer);
      },
      deep: true,
    },
  },
  methods: {
    async validateForm() {
      if (!this.$refs.form) {
        return false;
      }

      const isValid = await this.$refs.form.validate();

      if (this.customer.deliveryOption && this.deliveryIsNotAvailable) {
        return 'no-delivery';
      }

      if (
        this.customer.deliveryOption &&
        this.customer.address &&
        !this.customer.deliveryCost
      ) {
        this.addressMessage = 'Please calculate delivery cost';
        return 'no-cost';
      }

      return isValid?.valid;
    },
    getDeliveryCost(distance) {
      let deliveryCost;
      switch (true) {
        case distance <= 10:
          deliveryCost = 5;
          break;
        case distance <= 15:
          deliveryCost = 8;
          break;
        case distance <= 20:
          deliveryCost = 10;
          break;
        case distance <= 30:
          deliveryCost = 15;
          break;
        case distance > 30:
          deliveryCost = 0;
          this.addressMessage = 'Delivery is not available for this address';
          this.deliveryIsNotAvailable = true;
          return;
        default:
          deliveryCost = 0;
      }

      this.customer.deliveryCost = deliveryCost;
      this.estimatedDeliveryCost = `${deliveryCost}$`;
    },
    async calculateDeliveryCost() {
      const origin = import.meta.env.VITE_ORIGIN_ADDRESS;
      const destination = this.customer.address;
      let distance = 0;

      await this.$http
        .get('/calculateDistance', {
          params: {
            origin,
            destination,
          },
        })
        .then((response) => {
          if (
            response.data?.rows[0]?.elements[0]?.status === 'NOT_FOUND' ||
            response.data?.status !== 'OK'
          ) {
            this.addressMessage = 'Invalid address';
            return;
          }
          distance =
            response.data?.rows[0]?.elements[0]?.distance?.value / 1000;
          this.getDeliveryCost(distance);
        });
    },
  },
};
</script>
