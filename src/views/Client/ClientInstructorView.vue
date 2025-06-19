<template>
    <ClientBanner pageTitle="Giáo viên"/>
    <section class="ftco-section bg-light">
        <div class="container">
            <div class="row">
                <div v-for="item in teachers" :key="item"
                    class="col-md-6 col-lg-3 d-flex align-items-stretch">
                    <CardProfileCustom data-aos="fade-up" :image="avatar" :name="item.fullname" position="teacher"
                        description="Hơn 10 năm kinh nghiệm trong ngành lập trình" :link="google" :twitter="twitter"
                        :facebook="facebook" :instagram="instagram" />
                </div>
            </div>
           <div class="text-center">
                        <PaginationCustom :total-page="totalPages" v-model:current-page="currentPage" />
            </div>
        </div>
    </section>
</template>

<script setup>
import PaginationCustom from '@/components/Common/PaginationCustom.vue';
import CardProfileCustom from '@/components/Common/CardProfileCustom.vue';
import ClientBanner from '@/components/Client/ClientBanner.vue';
import avatar from '@/assets/Client/images/teacher-1.jpg';
import { onMounted, ref, watch } from 'vue';
import apiClient from "@/services/axiosMiddleware.js";
import { showConfirm, showSuccess, showError } from '@/assets/Admin/js/alert';

const API = "/teacher";
const searchQuery = ref("");

const teachers = ref([]);
const currentPage = ref(0);
const totalPages = ref(0);
const pageSize = ref(8);

// Mạng xã hội - giả định dùng link mẫu
const twitter = "https://twitter.com";
const facebook = "https://facebook.com";
const linkProfile = "https://google.com";
const instagram = "https://instagram.com";

// Hàm lấy danh sách giáo viên có phân trang
const getUsersList = async (page, size) => {
    try {
        const response = await apiClient.get(API, {
            params: {
                page,
                size
            }
        });

        if (response?.data?.data) {
            teachers.value = response.data.data;
            currentPage.value = response.data.currentPage;
            totalPages.value = response.data.totalPages;
        }
    } catch (error) {
        console.error("Lỗi khi lấy danh sách giáo viên!", error);
        showError("Không thể tải danh sách giáo viên.");
    }
};

// Chuyển trang
watch(currentPage, (newPage) => {
    getUsersList(newPage, pageSize.value);
});

// Định dạng ngày
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('vi-VN');
}

// Gọi API lần đầu khi component mount
onMounted(() => getUsersList(currentPage.value, pageSize.value));
</script>


<style lang="scss" scoped></style>