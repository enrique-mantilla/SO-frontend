<template>
  <div class="home">
    <header class="topbar">
      <div class="topbar-inner">
        <h1 class="logo">RedSocial</h1>
        <div class="user-badge">
          <span class="avatar">{{ authStore.user?.usuario?.charAt(0).toUpperCase() }}</span>
          <span>@{{ authStore.user?.usuario }}</span>
        </div>
      </div>
    </header>
    <main class="feed">
      <div v-if="message" :class="['toast', message.type]">{{ message.text }}</div>
      <CreatePostForm @created="handlePostCreated" />
      <p v-if="loading" class="loading">Cargando...</p>
      <FeedView v-else :posts="postStore.posts" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useAuthStore } from "../../../auth/application/auth.store.js"
import { usePostStore } from "../../application/post.store.js"
import CreatePostForm from "./CreatePostForm.vue"
import FeedView from "./FeedView.vue"

const authStore = useAuthStore()
const postStore = usePostStore()
const loading = ref(true)
const message = ref(null)

onMounted(async () => {
  await postStore.fetchFeed()
  loading.value = false
})

async function handlePostCreated(body) {
  try {
    message.value = null
    await postStore.createPost(body)
    message.value = { type: "success", text: "Publicación creada" }
  } catch {
    message.value = { type: "error", text: "Error al publicar" }
  }
  setTimeout(() => (message.value = null), 3000)
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #f0f2f5;
}
.topbar {
  position: sticky;
  top: 0;
  background: white;
  border-bottom: 1px solid #e4e6eb;
  z-index: 100;
}
.topbar-inner {
  max-width: 680px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
}
.logo {
  font-size: 22px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.user-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #444;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}
.feed {
  max-width: 680px;
  margin: 0 auto;
  padding: 16px;
}
.loading {
  text-align: center;
  color: #888;
  padding: 40px;
}
.toast {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  z-index: 200;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.toast.success {
  background: #d1fae5;
  color: #065f46;
}
.toast.error {
  background: #fee2e2;
  color: #dc2626;
}
</style>
