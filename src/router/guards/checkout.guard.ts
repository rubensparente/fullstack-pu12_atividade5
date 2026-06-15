import type { Router } from 'vue-router'
import type { ICartItem } from '@/model/cart.model'

export function checkoutGuard(router: Router) {
  router.beforeEach((to, from) => {
    // Verificar se é rota de checkout
    if (to.path === '/checkout' || to.name === 'checkout') {
      const userStr = localStorage.getItem('user')
      
      // Verificar autenticação
      if (!userStr) {
        alert('Você precisa estar logado para finalizar a compra!')
        // Salvar a rota que o usuário tentou acessar
        sessionStorage.setItem('redirectAfterLogin', to.fullPath)
        return '/login'
      }
      
      const user = JSON.parse(userStr)
      
      // Verificar se é cliente
      if (user.role !== 'CUSTOMER') {
        alert('Apenas clientes podem realizar compras!')
        return '/'
      }
      
      // Verificar se o carrinho não está vazio
      const cartStr = localStorage.getItem('cart')
      if (!cartStr) {
        alert('Seu carrinho está vazio! Adicione produtos antes de finalizar a compra.')
        return '/products'
      }
      
      try {
        const cart: ICartItem[] = JSON.parse(cartStr)
        if (!cart.length) {
          alert('Seu carrinho está vazio! Adicione produtos antes de finalizar a compra.')
          return '/products'
        }
      } catch (error) {
        console.error('Erro ao ler carrinho:', error)
        return '/products'
      }
    }
    
    return true
  })
}