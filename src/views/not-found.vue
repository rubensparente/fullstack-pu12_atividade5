<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh]">
    <i class="pi pi-exclamation-triangle text-8xl text-yellow-500 mb-6"></i>
    <h1 class="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
    <h2 class="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-6">
      Página não encontrada
    </h2>
    <p class="text-gray-500 dark:text-gray-500 mb-8 text-center max-w-md">
      A página que você está procurando pode ter sido removida, teve seu nome alterado ou está temporariamente indisponível.
    </p>
    <div class="flex gap-4">
      <Button label="Voltar para Home" icon="pi pi-home" @click="goToHome" />
      <Button label="Ver Produtos" icon="pi pi-search" @click="goToProducts" severity="secondary" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from 'primevue/button'

export default defineComponent({
  name: 'NotFound',
  components: { Button },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    goToProducts() {
      this.$router.push('/products')
    }
  }
})
</script>