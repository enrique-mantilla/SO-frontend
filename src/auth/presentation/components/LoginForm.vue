<template>
  <form @submit.prevent="handleLogin" class="auth-form">
    <div class="field">
      <label>Email</label>
      <input v-model="email" type="email" placeholder="tu@email.com" required />
    </div>
    <div class="field">
      <label>Contraseña</label>
      <input v-model="contrasena" type="password" placeholder="••••••••" required />
    </div>
    <button type="submit" class="btn-primary">Iniciar sesión</button>
  </form>
</template>

<script setup>
import { ref } from "vue"

const emit = defineEmits(["login"])
const email = ref("")
const contrasena = ref("")

function handleLogin() {
  emit("login", { email: email.value, contrasena: contrasena.value })
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
