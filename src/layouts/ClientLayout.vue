<template>
  <div>
    <ClientHeader/>
    <RouterView />
    <ClientFooter/>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import '@/assets/Client/css/animate.css'
import '@/assets/Client/css/owl.carousel.min.css'
import '@/assets/Client/css/owl.theme.default.min.css'
import '@/assets/Client/css/magnific-popup.css'
import '@/assets/Client/css/bootstrap-datepicker.css'
import '@/assets/Client/css/jquery.timepicker.css'
import '@/assets/Client/css/flaticon.css'
import '@/assets/Client/css/style.css'
import ClientHeader from '@/components/Client/ClientHeader.vue'
import ClientFooter from '@/components/Client/ClientFooter.vue'

// Thêm link ngoài như Google Fonts, Font Awesome
onMounted(() => {
  const links = [
    {
      href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap&subset=vietnamese",
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
