import { Product } from './product.model'

export interface ICartItem {
  product: Product
  quantity: number
}

export class Cart {
  list: ICartItem[] = []
  totalPrice: number = 0

  addItem(product: Product, quantity: number = 1): void {
    const existingItem = this.list.find(item => item.product.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this.list.push({ product, quantity })
    }
    
    this.updateTotalPrice()
  }

  removeItem(product: Product): void {
    const index = this.list.findIndex(item => item.product.id === product.id)
    if (index !== -1) {
      this.list.splice(index, 1)
      this.updateTotalPrice()
    }
  }

  decrementItem(product: Product): void {
    const existingItem = this.list.find(item => item.product.id === product.id)
    
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity--
      } else {
        this.removeItem(product)
      }
      this.updateTotalPrice()
    }
  }

  incrementItem(product: Product): void {
    const existingItem = this.list.find(item => item.product.id === product.id)
    if (existingItem) {
      existingItem.quantity++
      this.updateTotalPrice()
    }
  }

  getTotalPrice(): number {
    return this.list.reduce((total, item) => {
      return total + (item.product.getPrice() * item.quantity)
    }, 0)
  }

  getItemCount(): number {
    return this.list.reduce((total, item) => total + item.quantity, 0)
  }

  private updateTotalPrice(): void {
    this.totalPrice = this.getTotalPrice()
  }
}