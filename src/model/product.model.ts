export interface Image {
  url: string
  isMain: boolean
}

export class Product {
  id: string
  title: string
  name: string
  description: string
  price: number
  discount: number
  images: Image[]
  quantity?: number

  constructor(
    id: string, 
    title: string, 
    description: string, 
    price: number, 
    discount: number = 0, 
    images: Image[] = []
  ) {
    this.id = id
    this.title = title
    this.name = title
    this.description = description
    this.price = price
    this.discount = discount
    this.images = images
  }

  getPrice(): number {
    return this.price * (1 - this.discount)
  }

  getMainImage(): string {
    const mainImage = this.images.find(img => img.isMain)
    return mainImage?.url || 'https://picsum.photos/200'
  }
}