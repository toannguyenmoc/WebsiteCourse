<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div class="container-fluid">
            <!-- Brand -->
            <div class="mt-2">
                <RouterLink to="/admin/dashboard" class="pt-0">
                    <img :src="Logo" class="navbar-brand-img" alt="..." width="180px;">
                </RouterLink>
            </div>
            <!-- Collapse -->
            <div class="collapse navbar-collapse mt--4" id="sidenav-collapse-main">
                <!-- Navigation -->
                <ul class="navbar-nav">
                    <li class="nav-item  active ">
                        <RouterLink to="/admin/dashboard" class="nav-link active " >
                            <i class="ni ni-tv-2 text-primary"></i> Dashboard
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/admin/course/list" class="nav-link " >
                            <i class="ni ni-paper-diploma"></i> Quản lý khóa học
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/admin/course-type/list" class="nav-link " >
                            <i class="ni ni-book-bookmark"></i> Quản lý loại khóa học
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/admin/lesson/list" class="nav-link " >
                            <i class="ni ni-books"></i> Quản lý tiết học
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/admin/teacher/list" class="nav-link " >
                            <i class="ni ni-badge"></i> Quản lý giáo viên
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/admin/student/list" class="nav-link " >
                            <i class="ni ni-hat-3"></i> Quản lý học sinh
                        </RouterLink>
                    </li>
                </ul>
                <!-- Divider -->
                <hr class="my-3">
                <!-- Heading -->
                <h6 class="navbar-heading text-muted">Tài chính</h6>
                <!-- Navigation -->
                <ul class="navbar-nav mb-md-3">
                    <li class="nav-item">
                        <RouterLink to="#" class="nav-link">
                            <i class="ni ni-chart-bar-32"></i> Thống kê
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/admin/payment/list" class="nav-link">
                            <i class="ni ni-credit-card"></i> Thanh toán
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/admin/commission/list" class="nav-link">
                            <i class="ni ni-money-coins"></i> Chiết khấu
                        </RouterLink>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item active active-pro">
                        <RouterLink to="#" class="nav-link">
                            <i class="ni ni-settings-gear-65"></i> Cài đặt
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import Logo from '@/assets/logoIT.png'
</script>

<style scoped>
.navbar-brand-img{
    max-height: 4.5rem !important;
}
</style>