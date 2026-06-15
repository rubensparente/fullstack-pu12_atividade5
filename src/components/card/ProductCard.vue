<template>
  <Card class="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
    <template #header>
      <img 
        :src="mainImage" 
        class="w-full object-cover h-40 sm:h-48 rounded-t-lg cursor-pointer"
        @click="goToDetail"
      />
    </template>
    <template #title>
      <h1 class="text-base sm:text-lg font-semibold line-clamp-1">{{ product?.title }}</h1>
    </template>
    <template #content>
      <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{{ product?.description }}</p>
      <div class="mt-2">
        <p class="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400">
          R$ {{ product?.getPrice().toFixed(2) }}
        </p>
        <p v-if="product?.discount" class="text-xs text-gray-500 line-through">
          R$ {{ product?.price.toFixed(2) }}
        </p>
      </div>
    </template>
    <template #footer>
      <div class="flex flex-col xs:flex-row gap-2 mt-auto">
        <Button 
          @click="addItem(product!)" 
          class="w-full text-sm"
          size="small"
        >
          Adicionar
        </Button>
        <Button 
          @click="goToDetail" 
          class="w-full text-sm"
          severity="secondary"
          size="small"
          outlined
        >
          Detalhes
        </Button>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { Product } from '@/model/product.model'
import { defineComponent, type PropType } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'

export default defineComponent({
  components: { Card, Button },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    },
  },
  emits: ['onClick'],
  methods: {
    addItem(product: Product) {
      this.$emit('onClick', product)
    },
    goToDetail() {
      this.$router.push(`/products/${this.product?.id}`)
    }
  },
  computed: {
    mainImage(): string {
      return this.product?.getMainImage() ?? 'https://picsum.photos/200'
    },
  },
})
</script>