<template>
  <div v-if="product" class="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
    <Button 
      label="Voltar" 
      icon="pi pi-arrow-left" 
      text 
      @click="$router.push('/products')" 
      class="mb-4 sm:mb-6"
    />
    
    <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
      <!-- Imagem do produto -->
      <div class="lg:w-1/2">
        <img 
          :src="mainImage" 
          class="w-full rounded-lg shadow-lg object-cover"
          :class="{'h-64 sm:h-96 lg:h-auto': true}"
          :alt="product.title"
        />
      </div>
      
      <!-- Informações do produto -->
      <div class="lg:w-1/2">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
          {{ product.title }}
        </h1>
        
        <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
          {{ product.description }}
        </p>
        
        <div class="mb-4 sm:mb-6">
          <span class="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400">
            R$ {{ product.getPrice().toFixed(2) }}
          </span>
          <span v-if="product.discount > 0" class="ml-2 text-sm text-gray-500 line-through">
            R$ {{ product.price.toFixed(2) }}
          </span>
          <span v-if="product.discount > 0" class="ml-2 text-sm text-red-500">
            {{ (product.discount * 100).toFixed(0) }}% OFF
          </span>
        </div>
        
        <div class="flex flex-col xs:flex-row gap-3">
          <Button 
            label="Adicionar ao Carrinho" 
            icon="pi pi-shopping-cart" 
            @click="addToCart" 
            class="w-full xs:w-auto"
            severity="success"
          />
          <Button 
            label="Comprar Agora" 
            icon="pi pi-bolt" 
            @click="buyNow" 
            class="w-full xs:w-auto"
            severity="primary"
          />
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="text-center py-12 px-4">
    <i class="pi pi-exclamation-triangle text-5xl sm:text-6xl text-gray-400 mb-4"></i>
    <h2 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">
      Produto não encontrado
    </h2>
    <Button label="Voltar para Produtos" @click="$router.push('/products')" class="mt-4" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Product, type Image } from '@/model/product.model'
import Button from 'primevue/button'
import { useCart } from '@/composables/useCart'

export default defineComponent({
  name: 'ProductDetail',
  components: { Button },
  setup() {
    const { addItem } = useCart()
    return { addItem }
  },
  data() {
    return {
      product: null as Product | null,
    }
  },
  computed: {
    mainImage(): string {
      return this.product?.getMainImage() || 'https://picsum.photos/400'
    }
  },
  methods: {
    addToCart() {
      if (this.product) {
        this.addItem(this.product)
        alert(`${this.product.title} adicionado ao carrinho!`)
      }
    },
    buyNow() {
      if (this.product) {
        this.addItem(this.product)
        this.$router.push('/checkout')
      }
    },
    loadProduct() {
      const productId = this.$route.params.id as string
      const defaultImages: Image[] = [
        { url: 'https://picsum.photos/id/1/400', isMain: true }
      ]
      
      const products = [
        new Product('1', 'Guitarra Stratocaster', '22 trastes, corpo em alder, captadores single-coil', 200, 0.05, defaultImages),
        new Product('2', 'Guitarra Les Paul', '22 trastes, corpo em mogno, captadores humbucker', 250, 0.10, defaultImages),
        new Product('3', 'Baixo Jazz Bass', '20 trastes, corpo em amieiro, captadores single-coil', 300, 0.15, defaultImages),
        new Product('4', 'Bateria Eletrônica', 'Kit completo com 5 pads, módulo com 500 sons', 1500, 0.20, defaultImages),
        new Product('5', 'Teclado Digital', '88 teclas sensitivas, 700 timbres, 200 ritmos', 800, 0.10, defaultImages),
        new Product('6', 'Microfone Condensador', 'Padrão cardioide, resposta de frequência 20Hz-20kHz', 350, 0.05, defaultImages),
      ]
      
      this.product = products.find(p => p.id === productId) || null
    }
  },
  mounted() {
    this.loadProduct()
  }
})
</script>