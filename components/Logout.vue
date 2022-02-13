<template>
  <div>
    <vs-button @click="logout()"> Logout </vs-button>
  </div>
</template>
<script>
export default {
  methods: {
    async logout() {
      console.log(`Logout`)
      this.$auth.logout()
    },
  },
}
</script>