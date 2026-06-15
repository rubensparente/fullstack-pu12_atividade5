import { Product, type Image } from '@/model/product.model'

interface ApiResponse<T> {
  data: T
  message?: string
  status?: number
}

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export class ProductRest {
  private baseUrl: string = 'https://api.example.com' // Substitua pela URL real da sua API

  async getAll(params?: { page: number; limit: number }): Promise<ApiResponse<PaginatedResponse<any>>> {
    // Simulação de dados para desenvolvimento
    const mockProducts = this.getMockProducts()
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            data: mockProducts,
            total: mockProducts.length,
            page: params?.page || 1,
            limit: params?.limit || 10
          }
        })
      }, 500)
    })
  }

  async getById(id: string): Promise<ApiResponse<any>> {
    const mockProducts = this.getMockProducts()
    const product = mockProducts.find(p => p.id === id)
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (product) {
          resolve({ data: product })
        } else {
          reject({ message: 'Produto não encontrado' })
        }
      }, 300)
    })
  }

  async create(product: any): Promise<ApiResponse<any>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          data: { ...product, id: Date.now().toString() },
          message: 'Produto criado com sucesso'
        })
      }, 500)
    })
  }

  async update(id: string, product: any): Promise<ApiResponse<any>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          data: { ...product, id },
          message: 'Produto atualizado com sucesso'
        })
      }, 500)
    })
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          data: null,
          message: 'Produto excluído com sucesso'
        })
      }, 500)
    })
  }

  private getMockProducts(): any[] {
    const defaultImages: Image[] = [
      { url: 'https://picsum.photos/id/1/200', isMain: true },
      { url: 'https://picsum.photos/id/2/200', isMain: false }
    ]

    return [
      {
        id: '1',
        name: 'Guitarra Stratocaster',
        title: 'Guitarra Stratocaster',
        description: '22 trastes, corpo em alder, captadores single-coil',
        price: 200,
        discount: 0.05,
        images: defaultImages
      },
      {
        id: '2',
        name: 'Guitarra Les Paul',
        title: 'Guitarra Les Paul',
        description: '22 trastes, corpo em mogno, captadores humbucker',
        price: 250,
        discount: 0.10,
        images: defaultImages
      },
      {
        id: '3',
        name: 'Baixo Jazz Bass',
        title: 'Baixo Jazz Bass',
        description: '20 trastes, corpo em amieiro, captadores single-coil',
        price: 300,
        discount: 0.15,
        images: defaultImages
      },
      {
        id: '4',
        name: 'Bateria Eletrônica',
        title: 'Bateria Eletrônica',
        description: 'Kit completo com 5 pads, módulo com 500 sons',
        price: 1500,
        discount: 0.20,
        images: defaultImages
      },
      {
        id: '5',
        name: 'Teclado Digital',
        title: 'Teclado Digital',
        description: '88 teclas sensitivas, 700 timbres, 200 ritmos',
        price: 800,
        discount: 0.10,
        images: defaultImages
      },
      {
        id: '6',
        name: 'Microfone Condensador',
        title: 'Microfone Condensador',
        description: 'Padrão cardioide, resposta de frequência 20Hz-20kHz',
        price: 350,
        discount: 0.05,
        images: defaultImages
      }
    ]
  }
}