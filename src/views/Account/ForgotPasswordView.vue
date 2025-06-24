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
                                    <RouterLink href="#" class="btn btn-neutral btn-icon">
                                        <span class="btn-inner--icon"><img :src="githubIcon" /></span>
                                        <span class="btn-inner--text">Github</span>
                                    </RouterLink>
                                    <RouterLink href="#" class="btn btn-neutral btn-icon">
                                        <span class="btn-inner--icon"><img :src="googleIcon"></span>
                                        <span class="btn-inner--text">Google</span>
                                    </RouterLink>
                                </div>
                            </div>
                            <div class="card-body px-lg-5 pb-lg-5">
                                <div class="text-center text-muted mb-4">

                                </div>
                                <form role="form">
                                    <!-- Email -->
                                    <div class="form-group mb-3">
                                        <label for="email" class="text-sm">Email</label>
                                        <div class="input-group input-group-alternative">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text bg-white"><i
                                                        class="ni ni-email-83"></i></span>
                                            </div>
                                            <input class="form-control" id="email" placeholder="Nhập email của bạn"
                                                type="email" v-model="email">
                                            <div class="input-group-append">
                                                <button class="btn btn-primary" type="button" @click="sendOTP"
                                                    :disabled="countdown > 0">
                                                    Gửi OTP
                                                </button>
                                            </div>
                                        </div>
                                        <div class="small" v-if="countdown > 0">
                                            <label class="text-danger">Mã OTP sẽ hết hạn sau {{ countdown }}s</label>
                                        </div>
                                    </div>

                                    <!-- Nhập Mã OTP -->
                                    <div class="form-group">
                                        <label>Nhập Mã OTP</label>
                                        <div class="d-flex justify-content-between">
                                            <input v-for="(digit, index) in otp" :key="index" ref="otpInputs"
                                                maxlength="1" type="text" inputmode="numeric" pattern="[0-9]*"
                                                class="form-control text-center mx-1" style="max-width: 40px;"
                                                v-model="otp[index]" @input="handleInput($event, index)"
                                                @keydown.backspace="handleBackspace($event, index)" />
                                        </div>
                                    </div>

                                    <!-- Đổi mật khẩu nếu OTP đúng -->
                                    
                                        <div class="form-group mt-4 position-relative">
                                            <label for="new-password">Mật khẩu mới</label>
                                            <input :type="showPassword ? 'text' : 'password'" class="form-control"
                                                id="new-password" v-model="newPassword"
                                                placeholder="Nhập mật khẩu mới" />
                                            <span class="position-absolute" @click="togglePassword"
                                                style="top: 38px; right: 15px; cursor: pointer">
                                                <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'" class="text-dark"></i>
                                            </span>
                                        </div>
                                    

                                    <div class="text-center">
                                        <button class="btn btn-primary mt-3" type="button" @click="resetPassword">Đổi
                                            mật khẩu</button>

                                    </div>
                                </form>

                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-6">

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
import axios from 'axios'
import { useRouter, RouterLink } from 'vue-router';
import { showSuccess, showError } from '@/assets/Admin/js/alert';
import { ref, nextTick, onMounted } from 'vue'

const otp = ref(Array(6).fill(''))
const otpInputs = ref([])
const showPassword = ref(false)
const email = ref('')
const countdown = ref(0)
const otpVerified = ref(false)
const newPassword = ref('')
let timer = null

const router = useRouter();

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
const handleInput = (event, index) => {
    const value = event.target.value
    if (!/^[0-9]$/.test(value)) {
        otp.value[index] = ''
        return
    }

    // Chuyển sang ô tiếp theo
    if (value && index < 5) {
        nextTick(() => {
            otpInputs.value[index + 1]?.focus()
        })
    }
}

const handleBackspace = (event, index) => {
    if (!otp.value[index] && index > 0) {
        nextTick(() => {
            otpInputs.value[index - 1]?.focus()
        })
    }
}

onMounted(() => {
    otpInputs.value = Array.from(document.querySelectorAll('input[maxlength="1"]'))
})



// Gửi OTP
const sendOTP = async () => {
    try {
        await axios.post('http://localhost:8080/api/auth/send-otp', { email: email.value })
        countdown.value = 60
        startCountdown()
    } catch (err) {
        console.log("Lỗi:" + err)
    }
}

const startCountdown = () => {
    if (timer) clearInterval(timer)
    timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) clearInterval(timer)
    }, 1000)
}

// Xác nhận OTP
const confirmOTP = async () => {
    const otpCode = otp.value.join('')
    try {
        const res = await axios.post('http://localhost:8080/api/auth/verify-otp', {
            email: email.value,
            otp: otpCode
        })
        if (res.status === 200) {
            otpVerified.value = true
        }
    } catch (err) {
        console.log('Mã OTP không đúng hoặc đã hết hạn!' + err)
    }
}

// Reset mật khẩu
const resetPassword = async () => {
    try {
        confirmOTP()

        if (otpVerified) {
            await axios.post('http://localhost:8080/api/auth/reset-password', {
                email: email.value,
                newPassword: newPassword.value
            })
            showSuccess("Đổi password thành công!")
            router.push("/login");

        } else {
            showError("Mã OTP không đúng! hoặc hết hạn")
        }



    } catch (err) {
        console.log("Lỗi:" + err)
    }
};

</script>
<style lang="scss" scoped></style>
