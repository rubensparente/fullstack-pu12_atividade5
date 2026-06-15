<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  mounted() {
    // Verificar dark mode ao iniciar
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode === 'true') {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
    } else if (savedDarkMode === 'false') {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
    } else {
      // Verificar preferência do sistema
      const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (darkModePreference) {
        document.documentElement.classList.add('dark')
        document.body.classList.add('dark')
      }
    }
  }
})
</script>

<style>
/* Estilos globais */
html, body {
  margin: 0;
  padding: 0;
  transition: background-color 0.2s ease, color 0.2s ease;
}

body {
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}
</style>