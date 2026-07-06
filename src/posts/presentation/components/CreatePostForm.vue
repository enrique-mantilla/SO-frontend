<template>
  <form @submit.prevent="handleCreate" class="create-post">
    <div class="create-header">
      <span class="avatar">{{ authStore.user?.usuario?.charAt(0).toUpperCase() }}</span>
      <span class="create-label">Crear publicación</span>
    </div>
    <input v-model="titulo" placeholder="Título" required />
    <textarea v-model="contenido" placeholder="¿Qué estás pensando?" required></textarea>
    <div class="create-footer">
      <input v-model="etiquetasInput" placeholder="Etiquetas (ej: vue, css)" class="tags-input" />
      <button type="submit">Publicar</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue"
import { useAuthStore } from "../../../auth/application/auth.store.js"

const emit = defineEmits(["created"])
const authStore = useAuthStore()
const titulo = ref("")
const contenido = ref("")
const etiquetasInput = ref("")

function handleCreate() {
  if (!titulo.value || !contenido.value) return
  emit("created", {
    usuarioId: authStore.user?.id,
    titulo: titulo.value,
    contenido: contenido.value,
    etiquetas: etiquetasInput.value ? etiquetasInput.value.split(",").map((e) => e.trim()) : [],
  })
  titulo.value = ""
  contenido.value = ""
  etiquetasInput.value = ""
}
</script>

<style scoped>
.create-post {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
}
.create-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}
.create-label {
  font-weight: 600;
  color: #333;
}
input, textarea {
  padding: 12px 14px;
  border: 1px solid #e4e6eb;
  border-radius: 8px;
  font-size: 15px;
  background: #f7f8fa;
  transition: all 0.2s;
  width: 100%;
}
input:focus, textarea:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
textarea {
  min-height: 100px;
  resize: vertical;
}
.create-footer {
  display: flex;
  gap: 12px;
  align-items: center;
}
.tags-input {
  flex: 1;
}
.create-footer button {
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  white-space: nowrap;
}
.create-footer button:hover {
  opacity: 0.9;
}
</style>
