<template>
  <body class="bg-default">
    <div class="main-content">
      <!-- Navbar -->

      <!-- Header -->
      <div class="header bg-gradient-primary py-7 py-lg-7 pb-5">
        <div class="container">
          <div class="header-body text-center mb-7">
            <div class="row justify-content-center">
              <div class="col-lg-5 col-md-6">
                <h1 class="text-white">Chào mừng!</h1>
                <p class="text-lead text-light">Xa nơi dữ liệu trôi chảy và các dòng mã lặng lẽ hoạt động, phía sau
                  những
                  bức tường firewall vững chắc, tồn tại một thế giới của các lập trình viên
                  đam mê.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="separator separator-bottom separator-skew zindex-100">
          <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </div>
      <!-- Page content -->
      <div class="container mt--8 pb-5">
        <!-- Table -->
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-8">
            <div class="card  shadow border-0">
              <div class="card-header bg-transparent pb-5">
                <div class="text-muted text-center mt-2 mb-4"><small>Đăng ký với</small></div>
                <div class="text-center">
                  <RouterLink href="#" class="btn btn-neutral btn-icon mr-4">
                    <span class="btn-inner--icon"><img :src="githubIcon" /></span>
                    <span class="btn-inner--text">Github</span>
                  </RouterLink>
                  <RouterLink href="#" class="btn btn-neutral btn-icon">
                    <span class="btn-inner--icon"><img :src="googleIcon" /></span>
                    <span class="btn-inner--text">Google</span>
                  </RouterLink>
                </div>
              </div>
              <div class="card-body px-lg-5 py-lg-5">
                <div class="text-center text-muted mb-4">

                </div>
                <form role="form">
                  <div class="form-group">
                    <div class="input-group input-group-alternative mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text bg-white"><i class="ni ni-hat-3"></i></span>
                      </div>
                      <input class="form-control" placeholder="Họ tên" type="text">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group input-group-alternative mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text bg-white"><i class="ni ni-email-83"></i></span>
                      </div>
                      <input class="form-control" placeholder="Email" type="email">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group input-group-alternative">
                      <div class="input-group-prepend">
                        <span class="input-group-text bg-white"><i class="ni ni-lock-circle-open"></i></span>
                      </div>
                      <input class="form-control" placeholder="Mật khẩu" type="password">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group input-group-alternative">
                      <select name="" id="" class="form-control" required>
                        <option value="">Chọn vai trò</option>
                        <option value="teacher">Học viên</option>
                        <option value="student">Giáo viên</option>
                      </select>
                    </div>
                  </div>
                  <div class="text-muted font-italic"><small>Mức độ bảo mật của mật khẩu: <span
                        class="text-success font-weight-700">cao</span></small></div>
                  <div class="row my-4">
                    <div class="col-12">
                      <div class="custom-control custom-control-alternative custom-checkbox">
                        <input class="custom-control-input" id="customCheckRegister" type="checkbox">
                        <label class="custom-control-label" for="customCheckRegister">
                          <span class="text-muted">Tôi đông ý với <a href="#!">chính sách sử dụng</a></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="text-center">
                    <button type="button" class="btn btn-primary mt-4">Tạo tài khoản</button>
                  </div>
                </form>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6">

              </div>
              <div class="col-6 text-right">
                <RouterLink to="/login" class="text-light"><small>Đăng nhập</small></RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer -->



  </body>
</template>

<script>
import whiteLogo from '@/assets/Admin/img/brand/white.png'
import blueLogo from '@/assets/Admin/img/brand/blue.png'
import githubIcon from '@/assets/Admin/img/icons/common/github.svg'
import googleIcon from '@/assets/Admin/img/icons/common/google.svg'

export default {
  name: 'LoginView',
  data() {
    return {
      whiteLogo,
      githubIcon,
      googleIcon,
      blueLogo
    }
  }

}
import ButtonCustom from '@/components/Common/ButtonCustom.vue'

function handleClick() {
  console.log('Button clicked!')
}
</script>

<style lang="scss" scoped></style>
