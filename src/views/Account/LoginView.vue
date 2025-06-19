<template>

    <body class="bg-default">
        <div class="main-content">
            <!-- Navbar -->

            <!-- Header -->
            <div class="header bg-gradient-primary py-6 py-lg-7 pb-5">
                <div class="container">
                    <div class="header-body text-center mb-7">
                        <div class="row justify-content-center">
                            <div class="col-lg-5 col-md-6">
                                <h1 class="text-white">Chào mừng!</h1>
                                <p class="text-lead text-light">Xa nơi dữ liệu trôi chảy và các dòng mã lặng lẽ hoạt
                                    động, phía sau những
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
                <div class="row justify-content-center">
                    <div class="col-lg-5 col-md-7">
                        <div class="card  shadow border-0">
                            <div class="card-header bg-transparent pb-5">
                                <div class="text-muted text-center mt-2 mb-3"><small>Đăng nhập với</small></div>
                                <div class="btn-wrapper text-center">
                                    <RouterLink to="#" class="btn btn-neutral btn-icon">
                                        <span class="btn-inner--icon"><img :src="githubIcon" /></span>
                                        <span class="btn-inner--text">Github</span>
                                    </RouterLink>
                                    <RouterLink to="#" class="btn btn-neutral btn-icon">
                                        <span class="btn-inner--icon"><img :src="googleIcon"></span>
                                        <span class="btn-inner--text">Google</span>
                                    </RouterLink>
                                </div>
                            </div>
                            <div class="card-body px-lg-5 py-lg-5">
                                <div class="text-center text-muted mb-4">

                                </div>
                                <form role="form" @submit.prevent="login">
                                    <label class="text-sm">Email</label>
                                    <div class="form-group mb-3">
                                        <div class="input-group input-group-alternative">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text bg-white"><i
                                                        class="ni ni-email-83"></i></span>
                                            </div>
                                            <input class="form-control" v-model="form.email" placeholder="Email"
                                                type="email">

                                        </div>
                                        <small class="text-danger" v-if="$v.email.$error">
                                            <span v-if="$v.email.required.$invalid">Email không được bỏ
                                                trống</span>
                                            <span v-else-if="$v.email.email.$invalid">Email không đúng định
                                                dạng.</span>
                                        </small>
                                    </div>
                                    <label class="text-sm">Password</label>
                                    <div class="form-group">
                                        <div class="input-group input-group-alternative">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text bg-white"><i
                                                        class="ni ni-lock-circle-open"></i></span>
                                            </div>
                                            <input class="form-control" v-model="form.password" placeholder="Mật khẩu"
                                                type="password">
                                        </div>
                                        <small class="text-danger" v-if="$v.password.$error">
                                            <span v-if="$v.password.required.$invalid">Password không được bỏ
                                                trống</span>
                                            <span v-else-if="$v.password.minLength.$invalid">Password ít nhất 6 ký
                                                tự.</span>
                                        </small>
                                    </div>
                                    <div class="custom-control custom-control-alternative custom-checkbox">
                                        <input class="custom-control-input" id="customCheckLogin" type="checkbox">
                                        <label class="custom-control-label" for="customCheckLogin">
                                            <span class="text-muted">Ghi nhớ</span>
                                        </label>
                                    </div>
                                    <div class="text-center">
                                        <button class="btn btn-primary" type="submit">Đăng Nhập</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-6">
                                <RouterLink to="/forgot-password" class="text-light"><small>Quên mật khẩu</small>
                                </RouterLink>
                            </div>
                            <div class="col-6 text-right">
                                <RouterLink to="/register" class="text-light"><small>Đăng ký</small></RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </body>
</template>
<script setup>
import githubIcon from '@/assets/Admin/img/icons/common/github.svg'
import googleIcon from '@/assets/Admin/img/icons/common/google.svg'
import useVuelidate from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import CryptoJS from 'crypto-js';
import { jwtDecode } from "jwt-decode";
import { Role, TOKEN } from "@/utils/constants.js";
import api from "@/services/axiosMiddleware.js";
import { showSuccess, showError } from '@/assets/Admin/js/alert'

const API = "/auth/login";
// const code = "859703373367639792F=="
const router = useRouter();

const form = ref({
    email: "",
    password: "",
});

const showPassword = ref(false);

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const rules = {
    email: { required, email },
    password: { required, minLength: minLength(6) }
};

const $v = useVuelidate(rules, form);

const login = async () => {
    const isValid = await $v.value.$validate();

    if (!isValid) {
        showError("Vui lòng kiểm tra lại thông tin!");
        return;
    }

    try {
        console.log("Dữ liệu gửi đi:", JSON.stringify(form.value));
        const payload = {
            email: form.value.email,
            password: form.value.password
        }
        console.log(payload);

        const response = await api.post(API, payload)

        if (response?.data?.length > 0) {
            // console.log("TOKEN" + response.data)
            sessionStorage.setItem(TOKEN, response.data);

            const decoded = jwtDecode(response?.data);
            const role = decoded.role[0].authority;
            // console.log("role:", JSON.stringify(decoded.role[0].authority, null, 2))

            if (role === 'Admin') {
                await router.push("/admin");
            } else {
                await router.push("/");
            }
            window.location.reload();
        } else {
            console.log(response.data);
        }

    } catch (error) {
        console.error("Lỗi: ", error.response.status);
        showError("Lỗi đăng nhập")
    }
};

// function encryptData(plainText, base64Key) {
//     var key = CryptoJS.enc.Base64.parse(base64Key);
//     var iv = CryptoJS.lib.WordArray.random(16);
//     var encrypted = CryptoJS.AES.encrypt(plainText, key, {
//         iv: iv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7
//     });
//     var encryptedData = iv.concat(encrypted.ciphertext);

//     return CryptoJS.enc.Base64.stringify(encryptedData);
// }



</script>
<style lang="scss" scoped></style>