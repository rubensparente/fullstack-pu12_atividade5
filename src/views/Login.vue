<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
    <Toast />
    <Card class="w-full max-w-md">
      <template #title>
        <div class="text-center">
          <i class="pi pi-lock text-3xl text-blue-500 mb-2"></i>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Login</h2>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Email
            </label>
            <InputText
              v-model="v$.email.$model"
              type="email"
              class="w-full"
              :class="{ 'p-invalid': v$.email.$error && submitted }"
              placeholder="seu@email.com"
            />
            <small v-if="v$.email.$error && submitted" class="text-red-500 text-xs mt-1 block">
              <template v-for="error in v$.email.$errors" :key="error.$uid">
                {{ error.$message }}
              </template>
            </small>
          </div>

          <!-- Senha -->
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Senha
            </label>
            <Password
              v-model="v$.password.$model"
              :feedback="false"
              toggleMask
              class="w-full"
              :class="{ 'p-invalid': v$.password.$error && submitted }"
              placeholder="Digite sua senha"
            />
            <small v-if="v$.password.$error && submitted" class="text-red-500 text-xs mt-1 block">
              <template v-for="error in v$.password.$errors" :key="error.$uid">
                {{ error.$message }}
              </template>
            </small>
          </div>

          <!-- Botão Submit -->
          <Button
            type="submit"
            label="Entrar"
            icon="pi pi-sign-in"
            class="w-full"
            :loading="authStore.isLoading"
            :disabled="authStore.isLoading"
          />

          <!-- Link para registro -->
          <div class="text-center text-sm mt-4">
            <p class="text-gray-600 dark:text-gray-400">
              Não tem uma conta?
              <a @click="$router.push('/register')" class="text-blue-500 cursor-pointer hover:underline">
                Registre-se
              </a>
            </p>
          </div>

          <!-- Contas de teste -->
          <div class="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p class="text-xs font-semibold mb-2 text-center">Contas de teste:</p>
            <div class="space-y-1 text-xs">
              <p class="flex justify-between">
                <span>👑 Admin:</span>
                <span class="font-mono">admin@teste.com / 123456</span>
              </p>
              <p class="flex justify-between">
                <span>👤 Cliente:</span>
                <span class="font-mono">cliente@teste.com / 123456</span>
              </p>
            </div>
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from 'primevue/usetoast'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Toast from 'primevue/toast'

export default defineComponent({
  name: 'Login',
  components: { Card, InputText, Password, Button, Toast },
  data() {
    return {
      email: '',
      password: '',
      submitted: false
    }
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage('Email é obrigatório', required),
        email: helpers.withMessage('Digite um email válido', email)
      },
      password: {
        required: helpers.withMessage('Senha é obrigatória', required),
        minLength: helpers.withMessage('Senha deve ter no mínimo 6 caracteres', minLength(6))
      }
    }
  },
  setup() {
    const authStore = useAuthStore()
    const toast = useToast()
    const v$ = useVuelidate()
    
    return { authStore, toast, v$ }
  },
  methods: {
    async handleSubmit() {
      this.submitted = true
      
      // Validar formulário
      const isValid = await this.v$.$validate()
      
      if (!isValid) {
        this.toast.add({
          severity: 'error',
          summary: 'Erro de validação',
          detail: 'Preencha todos os campos corretamente',
          life: 3000
        })
        return
      }
      
      try {
        await this.authStore.login(this.email, this.password)
        
        this.toast.add({
          severity: 'success',
          summary: 'Login realizado!',
          detail: `Bem-vindo, ${this.authStore.userName}`,
          life: 3000
        })
        
        // Redirecionar baseado no role
        if (this.authStore.isAdmin) {
          this.$router.push('/admin')
        } else {
          const redirect = this.$route.query.redirect as string
          if (redirect) {
            this.$router.push(redirect)
          } else {
            this.$router.push('/')
          }
        }
      } catch (error: any) {
        this.toast.add({
          severity: 'error',
          summary: 'Erro no login',
          detail: this.authStore.error || 'Credenciais inválidas',
          life: 4000
        })
      }
    }
  },
  mounted() {
    this.authStore.clearError()
    if (this.authStore.isAuthenticated) {
      if (this.authStore.isAdmin) {
        this.$router.push('/admin')
      } else {
        this.$router.push('/')
      }
    }
  }
})
</script>