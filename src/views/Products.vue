<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6 sm:mb-8">
      Todos os Produtos
    </h1>
    
    <div v-if="products.length === 0" class="text-center py-12">
      <i class="pi pi-spin pi-spinner text-4xl text-gray-400"></i>
      <p class="mt-4 text-gray-500">Carregando produtos...</p>
    </div>
    
    <section class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @onClick="addToCart"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Product, type Image } from '@/model/product.model'
import ProductCard from '@/components/card/ProductCard.vue'
import { useCart } from '@/composables/useCart'

export default defineComponent({
  name: 'Products',
  components: { ProductCard },
  setup() {
    const { addItem, loadCartFromLocalStorage } = useCart()
    return { addItem, loadCartFromLocalStorage }
  },
  data() {
    return {
      products: [] as Product[],
    }
  },
  methods: {
    addToCart(product: Product) {
      this.addItem(product)
    },
    loadProducts() {
      const defaultImages: Image[] = [
        { url: 'https://picsum.photos/id/1/200', isMain: true },
        { url: 'https://picsum.photos/id/2/200', isMain: false }
      ]
      
      this.products = [
        new Product('1', 'Guitarra Stratocaster', '22 trastes, corpo em alder, captadores single-coil', 200, 0.05, defaultImages),
        new Product('2', 'Guitarra Les Paul', '22 trastes, corpo em mogno, captadores humbucker', 250, 0.10, defaultImages),
        new Product('3', 'Baixo Jazz Bass', '20 trastes, corpo em amieiro, captadores single-coil', 300, 0.15, defaultImages),
        new Product('4', 'Bateria Eletrônica', 'Kit completo com 5 pads, módulo com 500 sons', 1500, 0.20, defaultImages),
        new Product('5', 'Teclado Digital', '88 teclas sensitivas, 700 timbres, 200 ritmos', 800, 0.10, defaultImages),
        new Product('6', 'Microfone Condensador', 'Padrão cardioide, resposta de frequência 20Hz-20kHz', 350, 0.05, defaultImages),
      ]
    }
  },
  mounted() {
    this.loadProducts()
    this.loadCartFromLocalStorage()
  }
})
</script>