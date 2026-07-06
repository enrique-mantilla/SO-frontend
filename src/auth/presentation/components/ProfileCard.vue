<template>
  <div v-if="user">
    <h2>{{ user.nombre }}</h2>
    <p>@{{ user.usuario }}</p>
    <p>{{ user.email }}</p>
    <p>{{ user.bio }}</p>
  </div>
</template>

<script setup>
defineProps({
  user: { type: Object, required: true },
})
</script>
