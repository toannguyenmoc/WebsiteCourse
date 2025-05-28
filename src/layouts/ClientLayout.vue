<template>
  <div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'

import '@/assets/css/animate.css'
import '@/assets/css/owl.carousel.min.css'
import '@/assets/css/owl.theme.default.min.css'
import '@/assets/css/magnific-popup.css'
import '@/assets/css/bootstrap-datepicker.css'
import '@/assets/css/jquery.timepicker.css'
import '@/assets/css/flaticon.css'
import '@/assets/css/style.css'

// Thêm link ngoài như Google Fonts, Font Awesome
onMounted(() => {
  const links = [
    {
      href: 'https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900',
      rel: 'stylesheet'
    },
    {
      href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
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
