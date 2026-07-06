<template>
  <div class="comment-section">
    <h4 class="comment-heading">Comentarios</h4>
    <div v-if="comments.length === 0" class="no-comments">
      Sin comentarios aún. ¡Sé el primero!
    </div>
    <div v-for="comment in comments" :key="comment.id" class="comment">
      <span class="comment-avatar">{{ (comment.usuario || "?").charAt(0).toUpperCase() }}</span>
      <div class="comment-body">
        <strong>@{{ comment.usuario || "anónimo" }}</strong>
        <p>{{ comment.texto }}</p>
      </div>
    </div>
    <form @submit.prevent="handleAddComment" class="comment-form">
      <input v-model="texto" placeholder="Escribe un comentario..." required />
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { get, post } from "../../../shared/http/http-client.js"
import { useAuthStore } from "../../../auth/application/auth.store.js"

const props = defineProps({
  postId: { type: String, required: true },
})

const texto = ref("")
const comments = ref([])
const authStore = useAuthStore()

onMounted(async () => {
  await fetchComments()
})

async function fetchComments() {
  const all = await get(`/comentarios`)
  const filtered = all.filter(
    (c) => c.publicacionId?._id === props.postId || c.publicacionId === props.postId
  )
  comments.value = filtered.map((c) => ({
    id: c._id,
    usuario: c.usuarioId?.usuario || "anónimo",
    texto: c.texto,
  }))
}

async function handleAddComment() {
  if (!texto.value.trim()) return
  await post(`/comentarios`, {
    usuarioId: authStore.user?.id,
    publicacionId: props.postId,
    texto: texto.value,
  })
  texto.value = ""
  await fetchComments()
}
</script>

<style scoped>
.comment-section {
  border-top: 1px solid #f0f2f5;
  padding-top: 12px;
  margin-top: 8px;
}
.comment-heading {
  font-size: 14px;
  color: #888;
  margin-bottom: 12px;
  font-weight: 600;
}
.no-comments {
  font-size: 13px;
  color: #aaa;
  margin-bottom: 12px;
}
.comment {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}
.comment-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #e4e6eb;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}
.comment-body {
  flex: 1;
}
.comment-body strong {
  font-size: 13px;
  color: #1a1a2e;
  display: block;
}
.comment-body p {
  font-size: 14px;
  color: #444;
}
.comment-form {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
.comment-form input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #e4e6eb;
  border-radius: 20px;
  font-size: 14px;
  background: #f7f8fa;
  transition: all 0.2s;
}
.comment-form input:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
.comment-form button {
  padding: 10px 18px;
  border: none;
  border-radius: 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}
.comment-form button:hover {
  opacity: 0.9;
}
</style>
