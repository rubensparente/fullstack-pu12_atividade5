import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Menubar from 'primevue/menubar'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Breadcrumb from 'primevue/breadcrumb'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

export function setPrimeVue(app: App): void {
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.dark',
      }
    }
  })
  
  // Registra ToastService apenas uma vez
  app.use(ToastService)
  
  // Registra componentes
  app.component('Button', Button)
  app.component('Card', Card)
  app.component('InputText', InputText)
  app.component('Password', Password)
  app.component('Menubar', Menubar)
  app.component('DataTable', DataTable)
  app.component('Column', Column)
  app.component('Breadcrumb', Breadcrumb)
  app.component('Toast', Toast)
}