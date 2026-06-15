import type { Router } from 'vue-router'

export function authenticatedGuard(router: Router) {
  router.beforeEach((to, from) => {
    const userStr = localStorage.getItem('user')
    
    // Verificar se a rota requer autenticação
    if (to.meta && to.meta.auth === true) {
      if (!userStr) {
        // Usuário não está autenticado, redirecionar para login
        return '/login'
      }
    } 
    // Se a rota é de login/register e usuário já está logado
    else if ((to.path === '/login' || to.path === '/register') && userStr) {
      const user = JSON.parse(userStr)
      // Redirecionar baseado no role
      return user.role === 'ADMIN' ? '/admin' : '/'
    }
    
    // Permitir navegação
    return true
  })
}