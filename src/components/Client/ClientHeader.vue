<template >
    <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
   <div class="container">
     <a class="navbar-brand" href="#"><span>Study</span>Lab</a>
     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
       <span class="oi oi-menu"></span> Menu
   </button>

   <div class="collapse navbar-collapse" id="ftco-nav">
       <ul class="navbar-nav ml-auto">
         <li class="nav-item active"><RouterLink to="/" class="nav-link ">Trang chủ</RouterLink></li>
         <li class="nav-item"><RouterLink to="about" class="nav-link">Về chúng tôi</RouterLink></li>
         <li class="nav-item"><RouterLink to="#" class="nav-link">Khóa học</RouterLink></li>
         <li class="nav-item"><RouterLink to="#" class="nav-link">Giáo viên</RouterLink></li>
         <li class="nav-item"><RouterLink to="blog" class="nav-link">Blog</RouterLink></li>
         <li class="nav-item"><RouterLink to="#" class="nav-link">Liên hệ</RouterLink></li>
     </ul>
 </div>
</div>
</nav>
</template>
<script setup>
import { RouterLink } from 'vue-router';
</script>
<style scoped>

</style>