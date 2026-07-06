<template>
  <div v-if="post">
    <h1>{{ post.titulo }}</h1>
    <p>{{ post.contenido }}</p>
    <span v-for="tag in post.etiquetas" :key="tag">#{{ tag }}</span>
    <slot name="comments" />
    <slot name="reactions" />
  </div>
</template>

<script setup>
defineProps({
  post: { type: Object, required: true },
})
</script>
