<template>
  <div>
    <vs-button @click="logout()"> Logout </vs-button>
  </div>
</template>
<script>
export default {
  methods: {
    async logout() {
      this.$auth.logout()
    },
  },
}
</script>