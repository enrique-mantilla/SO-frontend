<template>
  <form @submit.prevent="handleRegister" class="auth-form">
    <div class="field">
      <label>Nombre completo</label>
      <input v-model="nombre" placeholder="Juan Pérez" required />
    </div>
    <div class="field">
      <label>Nombre de usuario</label>
      <input v-model="usuario" placeholder="juanperez" required />
    </div>
    <div class="field">
      <label>Email</label>
      <input v-model="email" type="email" placeholder="tu@email.com" required />
    </div>
    <div class="field">
      <label>Contraseña</label>
      <input v-model="contrasena" type="password" placeholder="••••••••" required />
    </div>
    <div class="field">
      <label>Biografía</label>
      <input v-model="bio" placeholder="Cuéntanos de ti..." />
    </div>
    <button type="submit" class="btn-primary">Crear cuenta</button>
  </form>
</template>

<script setup>
import { ref } from "vue"

const emit = defineEmits(["register"])
const nombre = ref("")
const usuario = ref("")
const email = ref("")
const contrasena = ref("")
const bio = ref("")

function handleRegister() {
  emit("register", {
    nombre: nombre.value,
    usuario: usuario.value,
    email: email.value,
    contrasena: contrasena.value,
    bio: bio.value,
  })
}
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field label {
  font-size: 13px;
  font-weight: 600;
  color: #444;
}
.field input {
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.2s;
}
.field input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
.btn-primary {
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-primary:hover {
  opacity: 0.9;
}
</style>
