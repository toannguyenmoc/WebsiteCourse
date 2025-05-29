<template>
    <div>
        <RouterView />
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import '@/assets/Admin/js/plugins/nucleo/css/nucleo.css'
import '@/assets/Admin/js/plugins/@fortawesome/fontawesome-free/css/all.min.css'
import '@/assets/Admin/css/argon-dashboard.css'

onMounted(() => {
  const links = [
    {
      href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700',
      rel: 'stylesheet'
    }
  ]

  links.forEach(({ href, rel }) => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link')
      link.rel = rel
      link.href = href
      document.head.appendChild(link)
    }
  })
})
</script>

<style lang="scss" scoped>

</style>