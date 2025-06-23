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
                                                type="email">
                                            <div class="input-group-append">
                                                <button class="btn btn-primary" type="button" @click="sendOTP">Gửi
                                                    OTP</button>
                                            </div>
                                        </div>
                                        <!--  <span v-if="countdown > 0" class="text-muted">Gửi lại sau {{ countdown }}s</span>  -->
                                        <div class="small">
                                            <label class="" for="">Mã OTP sẽ hết hạn sau 60s</label>
                                        </div>
                                    </div>

                                    <!-- Nhập Mã OTP -->
                                    <div class="form-group">
                                        <label>Nhập Mã OTP</label>
                                        <div class="d-flex justify-content-between">
                                            <input v-for="n in 6" :key="n" maxlength="1" type="text"
                                                class="form-control text-center mx-1" style="max-width: 40px;">
                                        </div>
                                    </div>

                                    <!-- Xác nhận -->
                                    <div class="text-center mt-4">
                                        <button class="btn btn-primary" type="button" @click="confirmOTP">Xác
                                            nhận</button>
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

</script>
<style lang="scss" scoped></style>
