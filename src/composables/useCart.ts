import { reactive } from 'vue'
import { Cart, type ICartItem } from '@/model/cart.model'
import { Product, type Image } from '@/model/product.model'

const cartState = reactive({
  cart: new Cart()
})

export function useCart() {
  const addItem = (product: Product, quantity: number = 1) => {
    cartState.cart.addItem(product, quantity)
    saveCartToLocalStorage()
  }

  const removeItem = (product: Product) => {
    cartState.cart.removeItem(product)
    saveCartToLocalStorage()
  }

  const decrementItem = (product: Product) => {
    cartState.cart.decrementItem(product)
    saveCartToLocalStorage()
  }

  const incrementItem = (product: Product) => {
    cartState.cart.incrementItem(product)
    saveCartToLocalStorage()
  }

  const clearCart = () => {
    cartState.cart.list = []
    cartState.cart.totalPrice = 0
    saveCartToLocalStorage()
  }

  const getCartList = () => cartState.cart.list
  const getTotalPrice = () => cartState.cart.getTotalPrice()
  const getItemCount = () => cartState.cart.getItemCount()

  const saveCartToLocalStorage = () => {
    // Salvar apenas dados serializáveis
    const serializableCart = cartState.cart.list.map(item => ({
      product: {
        id: item.product.id,
        title: item.product.title,
        description: item.product.description,
        price: item.product.price,
        discount: item.product.discount,
        images: item.product.images.map(img => ({
          url: img.url,
          isMain: img.isMain
        }))
      },
      quantity: item.quantity
    }))
    localStorage.setItem('cart', JSON.stringify(serializableCart))
  }

  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart)
        // Recriar os produtos como instâncias da classe Product (não readonly)
        const restoredCart: ICartItem[] = cartData.map((item: any) => {
          // Recriar as imagens como array mutável
          const images: Image[] = (item.product.images || []).map((img: any) => ({
            url: img.url,
            isMain: img.isMain
          }))
          
          // Criar uma nova instância de Product (não readonly)
          const product = new Product(
            item.product.id,
            item.product.title,
            item.product.description,
            item.product.price,
            item.product.discount || 0,
            images
          )
          
          return {
            product: product,
            quantity: item.quantity
          }
        })
        
        cartState.cart.list = restoredCart
        cartState.cart.totalPrice = cartState.cart.getTotalPrice()
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error)
      }
    }
  }

  return {
    cart: cartState.cart,
    addItem,
    removeItem,
    decrementItem,
    incrementItem,
    clearCart,
    getCartList,
    getTotalPrice,
    getItemCount,
    loadCartFromLocalStorage
  }
}