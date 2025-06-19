<template>
    <div>
        <div class="row mt--7">
            <div class="col">
                <div class="card shadow">
                    <div class="card-header border-0">
                        <div class="row align-items-center">
                            <div class="col">
                                <h3 class="mb-0">Danh Sách</h3>
                            </div>
                            <!-- <div class="col text-right">
                                <RouterLink to="/admin/teacher/create" class="btn btn-sm btn-primary">Thêm mới</RouterLink>
                            </div> -->
                        </div>
                    </div>
                    <div class="table">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên Học Viên</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Giới Tính</th>
                                    <th scope="col">Ngày Đăng Ký</th>
                                    <th scope="col">Chi tiết</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(item, index) in teachers" :key="item.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.fullname }}</td>
                                    <td>{{ item.email }}</td>
                                    <td>{{ item.gender ? 'Nam' : 'Nữ'}}</td>
                                    <td>{{ formatDate(item.registerDate) }}</td>
                                    <td>
                                       <RouterLink to="/admin/teacher/detail"><i class="ml-4 ni ni-curved-next"></i></RouterLink>
                                    </td>
                                    
                                </tr>

                            </tbody>

                        </table>
                    </div>
                     <div class="card-footer py-4">
                        <PaginationAdminCustom :currentPage="currentPage" :totalPages="totalPages" :pageSize="pageSize"
                            @update:currentPage="goToPage" @update:pageSize="handlePageSizeChange" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import apiClient from "@/services/axiosMiddleware.js";
import { showConfirm, showSuccess} from '@/assets/Admin/js/alert';
import PaginationAdminCustom from '@/components/Common/PaginationAdminCustom.vue';


const API = "/teacher";
const searchQuery = ref("")

const teachers = ref([])
const currentPage = ref(0);
const totalPages = ref();
const pageSize = ref(5);


const getUsersList = async (page, size) => {
    try {
        const response = await apiClient.get(API, {
            params: {
                page,
                size
            }
        });

        console.log("data :" + JSON.stringify(response.data.data))
        teachers.value = response.data.data
        currentPage.value = response.data.currentPage
        totalPages.value = response.data.totalPages
    } catch (error) {
        console.error("Lỗi!", error);
    }
};

const goToPage = (page) => {
    if (page < 0 || page >= totalPages.value) return;
    getUsersList(page, pageSize.value)
}

const handlePageSizeChange = (newPageSize) => {
    pageSize.value = newPageSize
    getUsersList(0, newPageSize)
}

function formatDate(date) {
    const d = new Date(date)
    return d.toLocaleDateString('vi-VN')
}

onMounted(getUsersList);

</script>

<style lang="scss" scoped></style>