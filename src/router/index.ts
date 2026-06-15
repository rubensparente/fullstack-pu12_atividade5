import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import CustomerLayout from '@/layouts/CustomerLayout.vue'
import Home from '@/views/Home.vue'
import Products from '@/views/Products.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import ProductAdmin from '@/views/admin/products.vue'
import NotFound from '@/views/not-found.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Checkout from '@/views/Checkout.vue'
import SalesReports from '@/views/admin/SalesReports.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { auth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { auth: false },
    },
    {
      path: '/',
      component: CustomerLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: { breadcrumb: 'Home' }
        },
        {
          path: 'products',
          name: 'products',
          component: Products,
          meta: { breadcrumb: 'Produtos' }
        },
        {
          path: 'products/:id',
          name: 'product-detail',
          component: ProductDetail,
          meta: { 
            auth: false,
            breadcrumb: 'Detalhes do Produto' 
          }
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: Checkout,
          meta: { 
            auth: true,
            requiresAuth: true,
            breadcrumb: 'Checkout' 
          }
        }
      ],
    },
    {
      path: '/admin',
      meta: { auth: true, requiresAdmin: true },
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: Dashboard,
          meta: { breadcrumb: 'Dashboard' }
        },
        {
          path: 'products',
          name: 'admin-products',
          component: ProductAdmin,
          meta: { breadcrumb: 'Gerenciar Produtos' }
        },
        {
          path: 'reports',
          name: 'admin-reports',
          component: SalesReports,
          meta: { breadcrumb: 'Relatórios de Vendas' }
        }
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
})

// Guard de navegação usando a AuthStore
router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  
  // Carregar autenticação do localStorage se necessário
  if (!authStore.isAuthenticated) {
    authStore.loadAuthFromStorage()
  }
  
  // Rota administrativa
  if (to.meta && to.meta.requiresAdmin) {
    if (!authStore.isAuthenticated) {
      return '/login'
    }
    if (!authStore.isAdmin) {
      alert('Acesso negado. Área restrita para administradores.')
      return '/'
    }
  }
  
  // Rota que requer autenticação (ex: checkout)
  if (to.meta && to.meta.requiresAuth === true) {
    if (!authStore.isAuthenticated) {
      return `/login?redirect=${to.fullPath}`
    }
  }
  
  // Se já estiver logado tentando acessar login/register
  if ((to.path === '/login' || to.path === '/register') && authStore.isAuthenticated) {
    return authStore.isAdmin ? '/admin' : '/'
  }
  
  return true
})

export default router