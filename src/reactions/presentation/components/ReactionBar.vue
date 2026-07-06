<template>
  <div class="reaction-bar">
    <button
      v-for="r in reactionTypes"
      :key="r.tipo"
      :class="{ active: isActive(r.tipo) }"
      @click="handleReaction(r.tipo)"
    >
      <span class="reaction-emoji">{{ r.emoji }}</span>
      <span class="reaction-label">{{ r.label }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { get, post, del } from "../../../shared/http/http-client.js"
import { useAuthStore } from "../../../auth/application/auth.store.js"

const props = defineProps({
  postId: { type: String, required: true },
})

const reactionTypes = [
  { tipo: "like", emoji: "👍", label: "Me gusta" },
  { tipo: "me_encanta", emoji: "❤️", label: "Me encanta" },
  { tipo: "me_divierte", emoji: "😄", label: "Me divierte" },
  { tipo: "me_asombra", emoji: "😮", label: "Me asombra" },
  { tipo: "me_enoja", emoji: "😠", label: "Me enoja" },
]

const reactions = ref([])
const authStore = useAuthStore()

onMounted(async () => {
  await fetchReactions()
})

async function fetchReactions() {
  const all = await get(`/reacciones`)
  reactions.value = all.filter(
    (r) => r.publicacionId?._id === props.postId || r.publicacionId === props.postId
  )
}

function isActive(tipo) {
  const userId = authStore.user?.id
  return reactions.value.some(
    (r) =>
      r.tipo === tipo &&
      ((r.usuarioId?._id?.toString() || r.usuarioId) === userId)
  )
}

async function handleReaction(tipo) {
  const userId = authStore.user?.id
  const existing = reactions.value.find(
    (r) =>
      r.tipo === tipo &&
      ((r.usuarioId?._id?.toString() || r.usuarioId) === userId)
  )

  if (existing) {
    await del(`/reacciones/${existing._id}`)
    reactions.value = reactions.value.filter((r) => r._id !== existing._id)
  } else {
    await post(`/reacciones`, {
      usuarioId: userId,
      publicacionId: props.postId,
      tipo,
    })
    await fetchReactions()
  }
}
</script>

<style scoped>
.reaction-bar {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
.reaction-bar button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid #e4e6eb;
  border-radius: 20px;
  background: #f7f8fa;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  color: #666;
}
.reaction-bar button:hover {
  background: #eef0f5;
  border-color: #ccc;
}
.reaction-bar button.active {
  background: #eef3ff;
  border-color: #667eea;
  color: #667eea;
}
.reaction-emoji {
  font-size: 16px;
}
.reaction-label {
  font-weight: 500;
}
</style>
