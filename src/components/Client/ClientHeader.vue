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
        <div class="mt-2"  v-if="isLoggedIn">
          <div class="dropdown">
            <p class="dropdown-toggle d-flex align-items-center bg-white border-0" type="button"
              data-toggle="dropdown">
              <div class="media align-items-center">
              <span class="avatar avatar-sm rounded-circle">
                <img alt="" src="./assets/img/theme/team-4-800x800.jpg">
              </span>
              <div class="media-body ml-2 d-none d-lg-block">
                <span class="mb-0 text-sm  font-weight-bold">{{ userName }}</span>
              </div>
            </div>
          </p>
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
                <a class="dropdown-item" @click.prevent="logout">
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
import { ref, onMounted } from 'vue'
import ButtonCustom from '../Common/ButtonCustom.vue'
import { TOKEN } from '@/utils/constants.js'


const router = useRouter()
const isLoggedIn = ref(false)
const userName = ref("Kim Ngân")


onMounted(() => {
  if(sessionStorage.getItem(TOKEN)?.length > 0){
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false
  }

  console.log("logined:" + isLoggedIn.value)
});

const logout = () => {
  sessionStorage.removeItem(TOKEN)
  isLoggedIn.value = false
  router.push('/login')
};

</script>
<style scoped>
CircleImageCustom>span{
  display: none;
}
</style>