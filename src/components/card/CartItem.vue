<template>
  <Card :style="{ width: '100%', minWidth: '200px', maxWidth: '420px' }">
    <template #content>
      <div class="flex flex-row gap-2 items-center">
        <img :src="getProductImage()" class="w-20 h-20 object-cover rounded" />
        <div class="flex-1 px-4">
          <h3 class="font-semibold text-gray-800 dark:text-white">{{ item.product.title }}</h3>
          <p class="text-gray-600 dark:text-gray-400">R$ {{ item.product.getPrice().toFixed(2) }}</p>
        </div>
        <div class="flex items-center gap-2">
          <Button icon="pi pi-minus" size="small" rounded text @click="onDecrementItem(item.product)" />
          <span class="w-8 text-center">{{ item.quantity }}</span>
          <Button icon="pi pi-plus" size="small" rounded text @click="onIncrementItem(item.product)" />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex flex-row-reverse">
        <Button label="Remover" icon="pi pi-trash" severity="danger" text @click="onRemoveItem(item.product)" />
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { type ICartItem } from '@/model/cart.model'
import type { Product } from '@/model/product.model'
import Card from 'primevue/card'
import Button from 'primevue/button'

export default defineComponent({
  components: { Card, Button },
  props: {
    item: {
      type: Object as PropType<ICartItem>,
      required: true,
    },
  },
  emits: ['removeItem', 'decrementItem', 'incrementItem'],
  methods: {
    onDecrementItem(product: Product) {
      this.$emit('decrementItem', product)
    },
    onIncrementItem(product: Product) {
      this.$emit('incrementItem', product)
    },
    onRemoveItem(product: Product) {
      this.$emit('removeItem', product)
    },
    getProductImage(): string {
      return this.item.product.getMainImage()
    }
  },
})
</script>