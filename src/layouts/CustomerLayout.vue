<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Toast />
    <header class="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-10">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white cursor-pointer" @click="goToHome">
            🛒 Meu E-commerce
          </h1>

          <div class="flex items-center gap-4">
            <!-- Botão Admin -->
            <Button 
              v-if="authStore.isAdmin" 
              label="Área Admin" 
              icon="pi pi-cog" 
              severity="warning" 
              @click="$router.push('/admin')"
            />

            <!-- Carrinho -->
            <div class="relative">
              <Button
                icon="pi pi-shopping-cart"
                severity="secondary"
                rounded
                @click="$router.push('/checkout')"
              />
              <span
                v-if="getItemCount() > 0"
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ getItemCount() }}
              </span>
            </div>

            <!-- Dark Mode -->
            <Button
              :icon="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'"
              :severity="isDarkMode ? 'warning' : 'secondary'"
              rounded
              @click="toggleDarkMode"
            />

            <!-- User Menu -->
            <div v-if="authStore.isAuthenticated" class="relative">
              <Button 
                :label="authStore.userName" 
                icon="pi pi-user" 
                severity="secondary" 
                rounded
                @click="toggleUserMenu"
              />
              <div 
                v-if="showUserMenu" 
                class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-20"
              >
                <div class="py-2">
                  <div class="px-4 py-2 border-b">
                    <p class="text-sm font-semibold">{{ authStore.userName }}</p>
                    <p class="text-xs text-gray-500">{{ authStore.userEmail }}</p>
                  </div>
                  <button 
                    @click="handleLogout"
                    class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <i class="pi pi-sign-out mr-2"></i> Sair
                  </button>
                </div>
              </div>
            </div>
            
            <Button 
              v-else 
              label="Login" 
              @click="$router.push('/login')" 
              text 
            />
          </div>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useAuthStore } from '@/stores/authStore'
import { useCart } from '@/composables/useCart'
import { useToast } from 'primevue/usetoast'

export default defineComponent({
  components: { Button, Toast },
  setup() {
    const authStore = useAuthStore()
    const { getItemCount, loadCartFromLocalStorage } = useCart()
    const toast = useToast()
    
    return { authStore, getItemCount, loadCartFromLocalStorage, toast }
  },
  data() {
    return {
      isDarkMode: false,
      showUserMenu: false
    }
  },
  mounted() {
    const savedDarkMode = localStorage.getItem('darkMode')
    this.isDarkMode = savedDarkMode === 'true'
    this.applyDarkMode()
    this.loadCartFromLocalStorage()
    
    document.addEventListener('click', this.closeUserMenu)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeUserMenu)
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      this.applyDarkMode()
      localStorage.setItem('darkMode', String(this.isDarkMode))
    },
    applyDarkMode() {
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    toggleUserMenu(event: Event) {
      event.stopPropagation()
      this.showUserMenu = !this.showUserMenu
    },
    closeUserMenu() {
      this.showUserMenu = false
    },
    handleLogout() {
      this.authStore.logout()
      this.toast.add({
        severity: 'success',
        summary: 'Logout realizado',
        detail: 'Você saiu do sistema',
        life: 3000
      })
      this.$router.push('/login')
    }
  }
})
</script>