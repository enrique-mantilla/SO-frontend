import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { get, post, patch } from "../../shared/http/http-client.js"
import { assembleUser } from "../infrastructure/auth.assembler.js"

function loadUser() {
  try {
    return JSON.parse(sessionStorage.getItem("auth_user"))
  } catch {
    return null
  }
}

function saveUser(user) {
  if (user) {
    sessionStorage.setItem("auth_user", JSON.stringify(user))
  } else {
    sessionStorage.removeItem("auth_user")
  }
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref(loadUser())
  const isAuthenticated = computed(() => !!user.value)

  async function login(email, contrasena) {
    const users = await get(`/usuarios`)
    const found = users.find((u) => u.email === email && u.contrasena === contrasena)
    if (!found) throw new Error("Credenciales inválidas")
    const assembled = assembleUser(found)
    user.value = assembled
    saveUser(assembled)
  }

  async function register(data) {
    const created = await post(`/usuarios`, data)
    const assembled = assembleUser(created)
    user.value = assembled
    saveUser(assembled)
  }

  function setUser(userData) {
    user.value = userData
    saveUser(userData)
  }

  function clearUser() {
    user.value = null
    saveUser(null)
  }

  return { user, isAuthenticated, login, register, setUser, clearUser }
})
