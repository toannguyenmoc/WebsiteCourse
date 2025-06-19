<template>
    <div>
        <div class="row mt--7">
            <div class="col">
                <div class="card shadow">
                    <div class="card-header border-0">
                        <div class="row align-items-center">
                            <div class="col">
                                <h3 class="mb-0">Danh Sách Học Viên</h3>
                            </div>
                            <!-- <div class="col text-right">
                                <a href="/admin/student/create" class="btn btn-sm btn-primary">Thêm mới</a>
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
                                    <th scope="col">Hoạt động</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(student, index) in students" :key="student.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ student.fullname }}</td>
                                    <td>{{ student.email }}</td>
                                    <td>{{ student.gender ? 'Nam' : 'Nữ' }}</td>
                                    <td>{{ formatDate(student.registeredDate) }}</td>
                                    <td>
                                        <CheckboxCustom v-model:model-value="student.active" @click="changeStatus(student.id)" />
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
import { onMounted, ref, computed, watch } from 'vue';
import apiClient from "@/services/axiosMiddleware.js";
import CheckboxCustom from '@/components/Common/CheckboxCustom.vue';
import PaginationAdminCustom from '@/components/Common/PaginationAdminCustom.vue';
import { showConfirm, showSuccess, showError } from '@/assets/Admin/js/alert';

const API = "/student";
const API_UPDATE = "/student/change-status"
const searchQuery = ref("")

const students = ref([])
const currentPage = ref(0);
const totalPages = ref();
const pageSize = ref(5);


const changeStatus = async (id) => {
    const confirmed = showConfirm("Bạn có chắc muốn thay đổi trạng thái?");
    if (!confirmed) {
        return;
    }
    try {
        // const student = await apiClient.get(`${API_UPDATE}/${id}`)
        // console.log("student:" + JSON.stringify(student.data));
        const result = await apiClient.put(`${API_UPDATE}/${id}`, id);
        console.log("result:"+ JSON.stringify(result.data));
        showSuccess("Cập nhật trạng thái thành công!");
        getUsersList();
    } catch (error) {
        console.error("Lỗi!", error);
        showError("Cập nhật trạng thái thất bại!");
    }
};



const getUsersList = async (page, size) => {
    try {
        const response = await apiClient.get(API, {
            params: {
                page,
                size
            }
        });

        students.value = response.data.data
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

//Search by key word
const filteredUser = computed(() => {
    return users.value.filter(user =>
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});


</script>

<style scoped></style>