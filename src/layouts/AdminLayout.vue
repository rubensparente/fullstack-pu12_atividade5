<template>
  <div class="flex min-h-screen bg-gray-100">
    <aside class="w-64 bg-gray-900 text-white">
      <div class="p-4 border-b border-gray-700">
        <h2 class="text-xl font-bold">Admin Dashboard</h2>
      </div>
      <nav class="p-4">
        <ul class="space-y-2">
          <li v-for="item in menuItems" :key="item.path">
            <button
              @click="$router.push(item.path)"
              class="w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              :class="{ 'bg-gray-700': $route.path === item.path }"
            >
              {{ item.label }}
            </button>
          </li>
        </ul>
      </nav>
    </aside>
    
    <div class="flex-1 flex flex-col">
      <div class="bg-white shadow-sm p-4">
        <Breadcrumb :home="home" :model="breadcrumbItems" />
      </div>
      
      <div class="flex-1 p-6">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Breadcrumb from 'primevue/breadcrumb'

export default defineComponent({
  components: { Breadcrumb },
  data() {
    return {
      home: {
        icon: 'pi pi-home',
        command: () => this.$router.push('/admin')
      },
      menuItems: [
        { label: 'Dashboard', path: '/admin' },
        { label: 'Gerenciar Produtos', path: '/admin/products' },
        { label: 'Relatórios', path: '/admin/reports' }
      ]
    }
  },
  computed: {
    breadcrumbItems() {
      const items = []
      const matched = this.$route.matched
      
      for (let i = 0; i < matched.length; i++) {
        const route = matched[i]
        if (route.meta.breadcrumb) {
          items.push({
            label: route.meta.breadcrumb as string,
            command: () => {
              if (route.path) this.$router.push(route.path)
            }
          })
        }
      }
      
      return items
    }
  }
})
</script>