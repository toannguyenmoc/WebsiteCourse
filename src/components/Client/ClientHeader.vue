<template>
  <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light scrolled sleep awake"
    id="ftco-navbar">
    <div class="container">
      <RouterLink class="navbar-brand" to="/"><span>Study</span>Lab</RouterLink>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
        aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="oi oi-menu"></span> Menu
      </button>

      <div class="collapse navbar-collapse" id="ftco-nav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Trang chủ</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link">Về chúng tôi</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/course" class="nav-link">Khóa học</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/instructor" class="nav-link">Giáo viên</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/blog" class="nav-link">Blog</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/contact" class="nav-link">Liên hệ</RouterLink>
          </li>
        </ul>
        <div class="" v-if="isLoggedIn">
          <div class="dropdown">
            <div class="dropdown-toggle d-flex align-items-center bg-white border-0" type="button" data-toggle="dropdown">
            <div class="media align-items-center">
              <span class="avatar avatar-sm rounded-circle">
                <img alt="" src="">
              </span>
              <div class="media-body ml-2 d-none d-lg-block mt-2">
                <span class="mb-0 text-sm text-dark " style="max-width: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inline-block;">{{ userName }}</span>
              </div>
            </div>
          </div>
          
          <ul class="dropdown-menu">
            <li>
              <RouterLink to="/information" class="dropdown-item">
                <i class="fas fa-user"></i>
                Trang cá nhân
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/change-password" class="dropdown-item">
                <i class="fas fa-key"></i>
                Đổi mật khẩu
              </RouterLink>
            </li>
            <hr>
            <li>
              <a class="dropdown-item" @click.prevent="handleLogout">
                <i class="fa fa-sign-out"></i>
                Đăng xuất
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <RouterLink to="/login">
          <ButtonCustom :variant="pink">Đăng nhập</ButtonCustom>
        </RouterLink>
      </div>
    </div>
    </div>
  </nav>
</template>
<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, onMounted, watchEffect } from 'vue'
import ButtonCustom from '../Common/ButtonCustom.vue'

import { useAuth } from '@/utils/authStore'

const { isLoggedIn, userName, logout } = useAuth()
const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/login')
}


</script>
<style scoped>
CircleImageCustom>span {
  display: none;
}
</style>