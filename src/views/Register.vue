<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
    <Toast />
    <Card class="w-full max-w-md">
      <template #title>
        <div class="text-center">
          <i class="pi pi-user-plus text-3xl text-green-500 mb-2"></i>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Criar Conta</h2>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Nome -->
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Nome Completo
            </label>
            <InputText
              v-model="v$.name.$model"
              type="text"
              class="w-full"
              :class="{ 'p-invalid': v$.name.$error && submitted }"
              placeholder="Seu nome"
            />
            <small v-if="v$.name.$error && submitted" class="text-red-500 text-xs mt-1 block">
              <template v-for="error in v$.name.$errors" :key="error.$uid">
                {{ error.$message }}
              </template>
            </small>
          </div>

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
              toggleMask
              class="w-full"
              :class="{ 'p-invalid': v$.password.$error && submitted }"
              placeholder="Mínimo 6 caracteres"
              :feedback="true"
            />
            <small v-if="v$.password.$error && submitted" class="text-red-500 text-xs mt-1 block">
              <template v-for="error in v$.password.$errors" :key="error.$uid">
                {{ error.$message }}
              </template>
            </small>
          </div>

          <!-- Confirmar Senha -->
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Confirmar Senha
            </label>
            <Password
              v-model="v$.confirmPassword.$model"
              toggleMask
              class="w-full"
              :class="{ 'p-invalid': v$.confirmPassword.$error && submitted }"
              placeholder="Confirme sua senha"
              :feedback="false"
            />
            <small v-if="v$.confirmPassword.$error && submitted" class="text-red-500 text-xs mt-1 block">
              <template v-for="error in v$.confirmPassword.$errors" :key="error.$uid">
                {{ error.$message }}
              </template>
            </small>
          </div>

          <!-- Botão Submit -->
          <Button
            type="submit"
            label="Registrar"
            icon="pi pi-user-plus"
            class="w-full"
            :loading="authStore.isLoading"
            :disabled="authStore.isLoading"
          />

          <!-- Link para login -->
          <div class="text-center text-sm mt-4">
            <p class="text-gray-600 dark:text-gray-400">
              Já tem uma conta?
              <a @click="$router.push('/login')" class="text-blue-500 cursor-pointer hover:underline">
                Faça login
              </a>
            </p>
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

// Validador customizado para confirmar senha
const sameAsPassword = (passwordField: string) => {
  return helpers.withParams(
    { type: 'sameAsPassword', message: 'As senhas não coincidem' },
    (value: string, parentForm: any) => {
      return value === parentForm[passwordField]
    }
  )
}

export default defineComponent({
  name: 'Register',
  components: { Card, InputText, Password, Button, Toast },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      submitted: false
    }
  },
  validations() {
    return {
      name: {
        required: helpers.withMessage('Nome é obrigatório', required)
      },
      email: {
        required: helpers.withMessage('Email é obrigatório', required),
        email: helpers.withMessage('Digite um email válido', email)
      },
      password: {
        required: helpers.withMessage('Senha é obrigatória', required),
        minLength: helpers.withMessage('Senha deve ter no mínimo 6 caracteres', minLength(6))
      },
      confirmPassword: {
        sameAsPassword: sameAsPassword('password')
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
        await this.authStore.register(this.name, this.email, this.password)
        
        this.toast.add({
          severity: 'success',
          summary: 'Cadastro realizado!',
          detail: `Bem-vindo, ${this.authStore.userName}! Faça login para continuar.`,
          life: 3000
        })
        
        // Redirecionar para login após registro
        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)
      } catch (error: any) {
        this.toast.add({
          severity: 'error',
          summary: 'Erro no cadastro',
          detail: this.authStore.error || 'Não foi possível criar a conta',
          life: 4000
        })
      }
    }
  },
  mounted() {
    this.authStore.clearError()
  }
})
</script>