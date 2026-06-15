import type { Router } from 'vue-router'

export function authorizedGuard(router: Router) {
  router.beforeEach((to, from) => {
    const userStr = localStorage.getItem('user')
    
    // Se a rota requer role específica
    if (to.meta && to.meta.role) {
      const requiredRoles = to.meta.role as string[]
      
      if (!userStr) {
        // Usuário não está logado
        return '/login'
      }
      
      const user = JSON.parse(userStr)
      
      if (requiredRoles.includes(user.role)) {
        // Usuário tem permissão
        return true
      } else {
        // Usuário não tem permissão
        alert('Você não tem permissão para acessar esta página.')
        return '/'
      }
    }
    
    // Verificar se é rota admin
    if (to.path.startsWith('/admin')) {
      if (!userStr) {
        return '/login'
      }
      
      const user = JSON.parse(userStr)
      if (user.role !== 'ADMIN') {
        alert('Acesso negado. Área restrita para administradores.')
        return '/'
      }
    }
    
    // Permitir navegação
    return true
  })
}