import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { setPrimeVue } from './modules/primevue.modules'
import 'primeicons/primeicons.css'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

setPrimeVue(app) // O ToastService já está sendo registrado aqui
app.use(pinia)
app.use(router)

app.mount('#app')