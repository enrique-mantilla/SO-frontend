<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <h1>CoolBox live</h1>
        <p>Comparte lo que piensas</p>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <div class="auth-tabs">
        <button :class="{ active: isLogin }" @click="isLogin = true">Iniciar sesión</button>
        <button :class="{ active: !isLogin }" @click="isLogin = false">Registrarse</button>
      </div>
      <LoginForm v-if="isLogin" @login="handleLogin" />
      <RegisterForm v-else @register="handleRegister" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useAuthStore } from "../../application/auth.store.js"
import LoginForm from "./LoginForm.vue"
import RegisterForm from "./RegisterForm.vue"

const isLogin = ref(true)
const error = ref("")
const authStore = useAuthStore()

async function handleLogin({ email, contrasena }) {
  try {
    error.value = ""
    await authStore.login(email, contrasena)
  } catch (e) {
    error.value = "Email o contraseña incorrectos"
  }
}

async function handleRegister(data) {
  try {
    error.value = ""
    await authStore.register(data)
  } catch (e) {
    error.value = "Error al registrarse"
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.auth-card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}
.auth-header {
  text-align: center;
  margin-bottom: 24px;
}
.auth-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
}
.auth-header p {
  color: #666;
  margin-top: 4px;
}
.error {
  background: #fee2e2;
  color: #dc2626;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
}
.auth-tabs {
  display: flex;
  background: #f0f2f5;
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 24px;
}
.auth-tabs button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background: transparent;
  font-size: 14px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}
.auth-tabs button.active {
  background: white;
  color: #1a1a2e;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
