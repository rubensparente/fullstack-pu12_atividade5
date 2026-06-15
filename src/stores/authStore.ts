import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'CUSTOMER'
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const isAdmin = computed(() => user.value?.role === 'ADMIN')
  const userName = computed(() => user.value?.name || '')
  const userEmail = computed(() => user.value?.email || '')

  // Actions
  const login = async (email: string, password: string) => {
    isLoading.value = true
    error.value = null
    
    // Simular delay de API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simular validação de credenciais
        if (email === 'admin@teste.com' && password === '123456') {
          user.value = {
            id: '1',
            email: email,
            name: 'Administrador',
            role: 'ADMIN'
          }
          token.value = 'fake-jwt-token-admin'
          localStorage.setItem('auth', JSON.stringify({
            user: user.value,
            token: token.value
          }))
          isLoading.value = false
          resolve()
        } else if (email === 'cliente@teste.com' && password === '123456') {
          user.value = {
            id: '2',
            email: email,
            name: 'Cliente Teste',
            role: 'CUSTOMER'
          }
          token.value = 'fake-jwt-token-customer'
          localStorage.setItem('auth', JSON.stringify({
            user: user.value,
            token: token.value
          }))
          isLoading.value = false
          resolve()
        } else {
          error.value = 'Credenciais inválidas'
          isLoading.value = false
          reject(new Error('Credenciais inválidas'))
        }
      }, 1500) // Simular delay de rede
    })
  }

  const register = async (name: string, email: string, password: string) => {
    isLoading.value = true
    error.value = null
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Verificar se email já existe
        if (email === 'admin@teste.com' || email === 'cliente@teste.com') {
          error.value = 'Email já cadastrado'
          isLoading.value = false
          reject(new Error('Email já cadastrado'))
          return
        }
        
        // Criar novo usuário
        user.value = {
          id: Date.now().toString(),
          email: email,
          name: name,
          role: 'CUSTOMER'
        }
        token.value = 'fake-jwt-token-new-user'
        localStorage.setItem('auth', JSON.stringify({
          user: user.value,
          token: token.value
        }))
        isLoading.value = false
        resolve()
      }, 1500)
    })
  }

  const logout = () => {
    user.value = null
    token.value = null
    error.value = null
    localStorage.removeItem('auth')
  }

  const loadAuthFromStorage = () => {
    const stored = localStorage.getItem('auth')
    if (stored) {
      try {
        const { user: storedUser, token: storedToken } = JSON.parse(stored)
        user.value = storedUser
        token.value = storedToken
      } catch (e) {
        console.error('Erro ao carregar autenticação:', e)
      }
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    user,
    token,
    isLoading,
    error,
    // Getters
    isAuthenticated,
    isAdmin,
    userName,
    userEmail,
    // Actions
    login,
    register,
    logout,
    loadAuthFromStorage,
    clearError
  }
})