<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-8">
      Dashboard Admin
    </h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <template #content>
          <div class="text-center">
            <i class="pi pi-box text-4xl text-blue-500 mb-2"></i>
            <h3 class="text-lg font-semibold">Total de Produtos</h3>
            <p class="text-3xl font-bold text-blue-600">{{ totalProducts }}</p>
          </div>
        </template>
      </Card>
      
      <Card>
        <template #content>
          <div class="text-center">
            <i class="pi pi-shopping-cart text-4xl text-green-500 mb-2"></i>
            <h3 class="text-lg font-semibold">Vendas do Mês</h3>
            <p class="text-3xl font-bold text-green-600">R$ 0,00</p>
          </div>
        </template>
      </Card>
      
      <Card>
        <template #content>
          <div class="text-center">
            <i class="pi pi-users text-4xl text-purple-500 mb-2"></i>
            <h3 class="text-lg font-semibold">Usuários</h3>
            <p class="text-3xl font-bold text-purple-600">2</p>
          </div>
        </template>
      </Card>
    </div>
    
    <Card>
      <template #title>
        <h2 class="text-xl font-bold">Bem-vindo ao Painel Administrativo</h2>
      </template>
      <template #content>
        <p class="text-gray-600 dark:text-gray-400">
          Aqui você pode gerenciar produtos, visualizar relatórios e controlar o sistema.
        </p>
        <div class="mt-4 flex flex-col sm:flex-row gap-4">
          <Button 
            label="Gerenciar Produtos" 
            icon="pi pi-box" 
            @click="$router.push('/admin/products')" 
            class="w-full sm:w-auto"
          />
          <Button 
            label="Ver Relatórios" 
            icon="pi pi-chart-line" 
            @click="$router.push('/admin/reports')" 
            severity="secondary"
            class="w-full sm:w-auto"
          />
          <Button 
            label="Voltar para Loja" 
            icon="pi pi-shopping-cart" 
            @click="$router.push('/')" 
            severity="info"
            class="w-full sm:w-auto"
            outlined
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { ProductRest } from '@/services/rest/product.rest'

export default defineComponent({
  components: { Card, Button },
  data() {
    return {
      totalProducts: 0,
      productRest: new ProductRest()
    }
  },
  mounted() {
    this.loadTotalProducts()
  },
  methods: {
    async loadTotalProducts() {
      try {
        const response = await this.productRest.getAll({ page: 1, limit: 100 })
        this.totalProducts = response.data.data.length
      } catch (error) {
        this.totalProducts = 6 // Valor padrão
      }
    }
  }
})
</script>