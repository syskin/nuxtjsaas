<!-- Please remove this file from your project -->
<template>
  <div
    class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"
  >
    <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
      <h2 class="text-2xl leading-7 font-semibold">
        Welcome to your Nuxt Application
      </h2>
      <div class="center con-switch">
        <vs-button
          v-show="!isAuthenticated"
          :active="active == 0"
          @click=";(active = !active), launchAuth0()"
        >
          Login
        </vs-button>
        <vs-button v-show="isAuthenticated" @click="getMe()">
          Get Me
        </vs-button>
        <no-ssr>
          <Stripe v-show="isAuthenticated && !isSubscribed" />
          <vs-button v-show="isSubscribed" @click="unsuscribe()">
            Unsuscribe
          </vs-button>
        </no-ssr>
        <nuxt-link v-show="isAuthenticated" to="/logout">Logout page</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NuxtTutorial',
  data() {
    return {
      active: 0,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'isSubscribed']),
  },
  methods: {
    launchAuth0() {
      this.$auth.loginWith('auth0')
    },
    async getMe() {
      await this.$usersRepository.getMe()
    },
    async unsuscribe() {
      const response = await this.$usersRepository.unsuscribe()
      this.$auth.setUser({ ...this.$auth.user, ...response.user })
    },
  },
}
</script>
