<template>
  <div class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6 sm:mb-8">
      Finalizar Compra
    </h1>
    
    <Card>
      <template #content>
        <div v-if="cartItems.length > 0">
          <div class="space-y-4">
            <div v-for="item in cartItems" :key="item.product.id" class="border-b pb-4 last:border-b-0">
              <!-- Layout responsivo: coluna em mobile, linha em desktop -->
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div class="flex-1">
                  <div class="flex flex-col xs:flex-row gap-4">
                    <img 
                      :src="getProductImage(item.product)" 
                      class="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded mx-auto xs:mx-0"
                      :alt="item.product.title"
                    />
                    <div class="flex-1 text-center xs:text-left">
                      <h3 class="font-semibold text-base sm:text-lg">{{ item.product.title }}</h3>
                      <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1 line-clamp-2">{{ item.product.description }}</p>
                      
                      <!-- Controles de quantidade responsivos -->
                      <div class="flex items-center justify-center xs:justify-start gap-2 mt-3">
                        <Button 
                          icon="pi pi-minus" 
                          size="small" 
                          rounded 
                          text 
                          @click="handleDecrementItem(item.product)"
                          :disabled="item.quantity <= 1"
                          class="w-8 h-8"
                        />
                        <span class="w-10 text-center font-semibold text-base">{{ item.quantity }}</span>
                        <Button 
                          icon="pi pi-plus" 
                          size="small" 
                          rounded 
                          text 
                          @click="handleIncrementItem(item.product)"
                          class="w-8 h-8"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="text-center sm:text-right">
                  <p class="font-bold text-lg sm:text-xl text-green-600">
                    R$ {{ formatPrice(item.product.getPrice() * item.quantity) }}
                  </p>
                  <p class="text-xs sm:text-sm text-gray-500">
                    (R$ {{ formatPrice(item.product.getPrice()) }} cada)
                  </p>
                  <Button 
                    label="Remover" 
                    icon="pi pi-trash" 
                    severity="danger" 
                    text 
                    size="small" 
                    @click="handleRemoveItem(item.product)" 
                    class="mt-2"
                  />
                </div>
              </div>
            </div>
            
            <!-- Resumo do pedido responsivo -->
            <div class="border-t pt-4 mt-6">
              <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div class="text-center sm:text-left">
                  <p class="text-gray-600">Total de itens: {{ cartItems.length }}</p>
                </div>
                <div class="text-center sm:text-right">
                  <p class="text-gray-600 text-sm">Total do pedido</p>
                  <p class="text-2xl sm:text-3xl font-bold text-green-600">
                    R$ {{ formatPrice(getTotalPrice()) }}
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Botões de ação responsivos -->
            <div class="flex flex-col sm:flex-row justify-end gap-3 mt-8">
              <Button 
                label="Limpar Carrinho" 
                icon="pi pi-trash" 
                @click="handleClearCart" 
                severity="danger"
                outlined
                class="w-full sm:w-auto order-3 sm:order-1"
              />
              <Button 
                label="Voltar às Compras" 
                icon="pi pi-arrow-left" 
                @click="$router.push('/products')" 
                severity="secondary"
                class="w-full sm:w-auto order-2"
              />
              <Button 
                label="Confirmar Compra" 
                icon="pi pi-check" 
                @click="confirmPurchase" 
                severity="success"
                class="w-full sm:w-auto order-1 sm:order-3"
              />
            </div>
          </div>
        </div>
        
        <!-- Carrinho vazio responsivo -->
        <div v-else class="text-center py-12 sm:py-16">
          <i class="pi pi-shopping-cart text-5xl sm:text-6xl text-gray-400 mb-4"></i>
          <p class="text-gray-500 text-base sm:text-lg">Seu carrinho está vazio</p>
          <p class="text-gray-400 text-sm sm:text-base mt-2">Que tal adicionar alguns produtos?</p>
          <Button 
            label="Ver Produtos" 
            @click="$router.push('/products')" 
            class="mt-6 w-full sm:w-auto"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useCart } from '@/composables/useCart'
import Card from 'primevue/card'
import Button from 'primevue/button'
import type { Product } from '@/model/product.model'

export default defineComponent({
  name: 'Checkout',
  components: { Card, Button },
  setup() {
    const { 
      cart, 
      removeItem, 
      decrementItem, 
      incrementItem, 
      getTotalPrice,
      clearCart,
      loadCartFromLocalStorage 
    } = useCart()
    
    const cartItems = computed(() => cart.list)
    
    const handleRemoveItem = (product: Product) => {
      removeItem(product)
    }
    
    const handleDecrementItem = (product: Product) => {
      decrementItem(product)
    }
    
    const handleIncrementItem = (product: Product) => {
      incrementItem(product)
    }
    
    const handleClearCart = () => {
      if (confirm('Tem certeza que deseja limpar todo o carrinho?')) {
        clearCart()
      }
    }
    
    const formatPrice = (price: number) => {
      return price.toFixed(2).replace('.', ',')
    }
    
    const getProductImage = (product: Product) => {
      return product.getMainImage()
    }
    
    const confirmPurchase = () => {
      if (cartItems.value.length === 0) {
        alert('Seu carrinho está vazio!')
        return
      }
      
      const total = getTotalPrice()
      const confirmed = confirm(`Total da compra: R$ ${formatPrice(total)}\n\nDeseja confirmar a compra?`)
      
      if (confirmed) {
        alert('Compra confirmada com sucesso! Obrigado por comprar conosco!')
        clearCart()
        window.location.href = '/'
      }
    }
    
    onMounted(() => {
      loadCartFromLocalStorage()
    })
    
    return { 
      cartItems,
      handleRemoveItem,
      handleDecrementItem,
      handleIncrementItem,
      handleClearCart,
      getTotalPrice,
      formatPrice,
      getProductImage,
      confirmPurchase
    }
  }
})
</script>