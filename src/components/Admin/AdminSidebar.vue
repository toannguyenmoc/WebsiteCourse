<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div class="container-fluid">
            <!-- Brand -->
            <router-link to="#" class="navbar-brand pt-0">
                <img src="../assets/Admin/img/brand/blue.png" class="navbar-brand-img" alt="...">
            </router-link>
            <!-- Collapse -->
            <div class="collapse navbar-collapse" id="sidenav-collapse-main">
                <!-- Navigation -->
                <ul class="navbar-nav">
                    <li class="nav-item  active ">
                        <router-link to="#" class="nav-link  active " href="./index.html">
                            <i class="ni ni-tv-2 text-primary"></i> Dashboard
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="#" class="nav-link " href="./examples/icons.html">
                            <i class="ni ni-paper-diploma"></i> Quản lý khóa học
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="#" class="nav-link " href="./examples/tables.html">
                            <i class="ni ni-book-bookmark"></i> Quản lý loại khóa học
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="#" class="nav-link " href="./examples/profile.html">
                            <i class="ni ni-books"></i> Quản lý tiết học
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="#" class="nav-link " href="./examples/tables.html">
                            <i class="ni ni-badge"></i> Quản lý giáo viên
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="#" class="nav-link " href="./examples/maps.html">
                            <i class="ni ni-hat-3"></i> Quản lý học sinh
                        </router-link>
                    </li>
                </ul>
                <!-- Divider -->
                <hr class="my-3">
                <!-- Heading -->
                <h6 class="navbar-heading text-muted">Tài chính</h6>
                <!-- Navigation -->
                <ul class="navbar-nav mb-md-3">
                    <li class="nav-item">
                        <router-link to="#" class="nav-link">
                            <i class="ni ni-chart-bar-32"></i> Thống kê
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="#" class="nav-link">
                            <i class="ni ni-credit-card"></i> Thanh toán
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="#" class="nav-link">
                            <i class="ni ni-money-coins"></i> Chiết khấu
                        </router-link>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item active active-pro">
                        <a class="nav-link" href="./examples/upgrade.html">
                            <i class="ni ni-settings-gear-65"></i> Cài đặt
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>