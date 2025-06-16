<template>
  <div>
    <ClientHeader/>
    <RouterView />
    <ClientFooter/>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { watch } from 'vue'
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

onMounted(() => {
  const scripts = [
    'https://code.jquery.com/jquery-3.6.0.min.js',
    'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js',
    '../src/assets/Client/aos/aos.js',
  ]

  scripts.forEach(src => {
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement('script')
      script.src = src
      script.async = false // Đảm bảo thứ tự load đúng
      document.body.appendChild(script)
    }
  })
})

//import aos
import {loadAOS} from '@/assets/Client/js/animation.js'
const route = useRoute();
//link aos
import '@/assets/Client/aos/aos.css'
//aos 
onMounted(() => {
  setTimeout(() => {
    loadAOS()
  }, 300)
})
watch(() => route.fullPath, () => {
  setTimeout(() => {
    loadAOS()
  }, 300)
})

</script>
