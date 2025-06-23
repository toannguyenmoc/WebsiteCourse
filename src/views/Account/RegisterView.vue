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
              <div class="card-body px-lg-5 pb-lg-5">
                <div class="text-center text-muted mb-1">

                </div>
                <form role="form" @submit.prevent="register">
                  <div>
                    <label class="text-sm">Họ tên</label>
                    <div class="form-group mb-0">
                      <div class="input-group input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text bg-white"><i class="ni ni-hat-3"></i></span>
                        </div>
                        <input class="form-control" v-model="form.fullname" placeholder="Họ tên" type="text">
                      </div>
                    </div>
  
                    <small class="text-danger" v-if="$v.fullname.$error">
                      <span v-if="$v.fullname.required.$invalid">Họ tên không được bỏ
                        trống</span>
                      <span v-else-if="$v.fullname.minLength.$invalid">Họ tên ít nhất 6 ký
                        tự.</span>
                    </small>

                  </div>
                  <div>
                    <label class="text-sm mt-3">Email</label>
                    <div class="form-group mb-0">
                      <div class="input-group input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text bg-white"><i class="ni ni-email-83"></i></span>
                        </div>
                        <input class="form-control" v-model="form.email" placeholder="Email" type="email">
                      </div>
                    </div>
                    <small class="text-danger" v-if="$v.email.$error">
                      <span v-if="$v.email.required.$invalid">Email không được bỏ
                        trống</span>
                      <span v-else-if="$v.email.email.$invalid">Email không đúng định
                        dạng.</span>
                    </small>

                  </div>
                  <div>
                    <label class="text-sm mt-3">Password</label>
                    <div class="form-group mb-0">
                      <div class="input-group mb-0 input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text bg-white"><i class="ni ni-lock-circle-open"></i></span>
                        </div>
                        <input class="form-control" v-model="form.password" placeholder="Mật khẩu" type="password">
                      </div>
                    </div>
                    <small class="text-danger" v-if="$v.password.$error">
                      <span v-if="$v.password.required.$invalid">Password không được bỏ
                        trống</span>
                      <span v-else-if="$v.password.minLength.$invalid">Password ít nhất 6 ký
                        tự.</span>
                    </small>

                  </div>
                  <label class="text-sm mt-3">Chọn vai trò</label>
                  <div class="form-group mb-0">
                    <div class="input-group input-group-alternative">
                      <select name="" id="" v-model="form.role" class="form-control" required>
                        <option value="-1" disabled >Chọn vai trò</option>
                        <option value=3 >Học viên</option>
                        <option value=2 >Giáo viên</option>
                      </select>
                    </div>
                  </div>
                  <div class="text-muted font-italic"><small>Mức độ bảo mật của mật khẩu: <span
                        class="text-success font-weight-700">cao</span></small></div>
                  <div class="row my-4">
                    <div class="col-12">
                      <div class="custom-control custom-control-alternative custom-checkbox">
                        <input class="custom-control-input" id="customCheckRegister" type="checkbox" v-model="agree">
                        <label class="custom-control-label" for="customCheckRegister">
                          <span class="text-muted">Tôi đông ý với <a href="#!">chính sách sử dụng</a></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="text-center">
                    <button type="submit" class="btn btn-primary mt-4" :disabled="!agree">Tạo tài khoản</button>
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

<script setup>
import githubIcon from '@/assets/Admin/img/icons/common/github.svg'
import googleIcon from '@/assets/Admin/img/icons/common/google.svg'
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { showSuccess, showError } from '@/assets/Admin/js/alert';
import api from "@/services/axiosMiddleware.js";
import useVuelidate from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'


const API = "/auth/register";
const router = useRouter();
const agree = ref(false);
const form = ref({
  fullname: "",
  email: "",
  password: "",
  role: 3,
  active: true
});

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
  fullname: { required, minLength: minLength(6) },

};

const $v = useVuelidate(rules, form);

const register = async () => {
  const isValid = await $v.value.$validate();

  if (!isValid) {
    showError("Vui lòng kiểm tra lại thông tin!");
    return;
  }
  try {
    console.log("Dữ liệu gửi đi:", JSON.stringify(form.value));
    const payload = {
      email: form.value.email,
      password: form.value.password,
      fullname: form.value.fullname,
      role: form.value.role,
      active: true
    }
    console.log(payload);

    await api.post(API, payload);
    // showSuccess("Đăng ký thành công!");
    router.push("/login");
  } catch (error) {
    console.error("Lỗi:", error);
    showError("Email đã tồn tại!");
  }
};
</script>

<style scoped>
.form-group, input-group {
  margin-bottom: 0;
}
</style>
