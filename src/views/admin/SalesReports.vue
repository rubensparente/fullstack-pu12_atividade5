<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Relatórios de Vendas</h1>
    <Card>
      <template #content>
        <div class="text-center py-8">
          <i class="pi pi-chart-line text-6xl text-gray-400 mb-4"></i>
          <p class="text-gray-500">Relatórios em desenvolvimento</p>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from 'primevue/card'

export default defineComponent({
  components: { Card }
})
</script>