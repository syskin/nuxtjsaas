<template>
  <div>
    {{ loggedInUser }}
    <vs-button @click="redirect()"> Buy this plan </vs-button>
  </div>
</template>
<script>
import { loadStripe } from '@stripe/stripe-js'
import { mapGetters } from 'vuex'
export default {
  name: 'StripeComponent',
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  methods: {
    async redirect() {
      const stripe = await loadStripe(this.$config.stripe_pk)
      stripe.redirectToCheckout({
        customerEmail: this.loggedInUser.email,
        clientReferenceId: this.loggedInUser.sub,
        locale: this.loggedInUser.locale,
        mode: 'subscription',
        lineItems: [
          {
            price: 'price_1KSfQgCLysgesJ5AW6lkyT3P',
            quantity: 1,
          },
        ],
      })
    },
  },
}
</script>