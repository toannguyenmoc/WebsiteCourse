<template>
    <div class="custom-bg text-dark">
        <div class="d-flex align-items-center justify-content-center min-vh-100 px-2">
            <div class="text-center">
                <h1 class="display-1 fw-bold text-dark">404</h1>
                <p class="fs-2 fw-medium mt-4 text-dark">Oops! Trang không tồn tại</p>
                <p class="mt-4 mb-5 text-dark">Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
                <RouterLink to="/" class="btn btn-primary fw-semibold rounded-pill px-4 py-2">
                    Trang chủ
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<script>
import { RouterLink } from 'vue-router';


</script>
<style scoped>
.custom-bg {
    /* background: linear-gradient(to right, #196de1, #7f4792) !important; */
    background-color: white;
}

.custom-btn:hover {
    background-color: #f3e8ff !important;
    transition: background-color 0.3s ease-in-out;
}

@media (prefers-color-scheme: dark) {
    .custom-bg {
        /* background: linear-gradient(to right, #196de1, #7f4792); */
        background-color: white;
        color: black !important;
    }

    .custom-btn {
        background-color: #374151 !important;
        color: white !important;
    }

    .custom-btn:hover {
        background-color: #4b5563 !important;
    }
}
</style>