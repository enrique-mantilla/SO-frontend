<template>
  <AuthPage v-if="!authStore.isAuthenticated" />
  <HomePage v-else />
</template>

<script setup>
import { useAuthStore } from "./auth/application/auth.store.js"
import AuthPage from "./auth/presentation/components/AuthPage.vue"
import HomePage from "./posts/presentation/components/HomePage.vue"

const authStore = useAuthStore()
</script>
