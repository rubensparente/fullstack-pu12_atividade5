<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-8">
      Histórico de Compras
    </h1>
    
    <Card>
      <template #content>
        <div class="text-center py-8">
          <i class="pi pi-clock text-6xl text-gray-400 mb-4"></i>
          <p class="text-gray-500">Nenhuma compra realizada ainda</p>
          <Button label="Ver Produtos" @click="$router.push('/products')" class="mt-4" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'

export default defineComponent({
  components: { Card, Button }
})
</script>