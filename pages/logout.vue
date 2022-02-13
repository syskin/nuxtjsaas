<template>
  <Logout />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LogoutPage',
  middleware: 'auth',
})
</script>
