<template>
  <div>
    <div class="mb-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">Gerenciar Produtos</h1>
      <Button label="Novo Produto" icon="pi pi-plus" @click="openNewProduct" />
    </div>
    
    <Card>
      <DataTable :value="products" responsiveLayout="scroll">
        <Column field="name" header="Nome" sortable></Column>
        <Column field="description" header="Descrição"></Column>
        <Column field="price" header="Preço" sortable>
          <template #body="{ data }">
            R$ {{ data.price.toFixed(2) }}
          </template>
        </Column>
        <Column header="Ações">
          <template #body="{ data }">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-text" @click="editProduct(data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" @click="deleteProduct(data)" />
          </template>
        </Column>
      </DataTable>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { ProductRest } from '@/services/rest/product.rest'
import { Product } from '@/model/product.model'

export default defineComponent({
  components: { DataTable, Column, Card, Button },
  data() {
    return {
      products: [] as Product[],
      productRest: new ProductRest()
    }
  },
  methods: {
    loadProducts() {
      this.productRest.getAll({ page: 1, limit: 100 }).then((res) => {
        this.products = res.data.data.map((product: any) => {
          return new Product(
            product.id,
            product.name,
            product.description,
            product.price,
            0,
            product.images
          )
        })
      })
    },
    openNewProduct() {
      alert('Funcionalidade de criar novo produto')
    },
    editProduct(product: Product) {
      alert(`Editar produto: ${product.name}`)
    },
    deleteProduct(product: Product) {
      if (confirm(`Deseja excluir o produto ${product.name}?`)) {
        // Implementar lógica de exclusão
        alert('Produto excluído')
      }
    }
  },
  mounted() {
    this.loadProducts()
  }
})
</script>