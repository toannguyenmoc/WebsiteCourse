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
                            <div class="col text-right">
                                <a href="/admin/student/create" class="btn btn-sm btn-primary">Thêm mới</a>
                            </div>
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
                                <tr v-for="(student, index) in users" :key="student.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ student.fullname }}</td>
                                    <td>{{ student.email }}</td>
                                    <td>{{ student.gender ? 'Nam' : 'Nữ' }}</td>
                                    <td>{{ formatDate(student.registeredDate) }}</td>
                                    <td>
                                        <CheckboxCustom v-model:model-value="student.active"/>
                                    </td>
                                    
                                </tr>

                            </tbody>

                        </table>
                    </div>
                    <div class="card-footer py-4">
                        <nav aria-label="...">
                            <ul class="pagination justify-content-end mb-0">
                                <li class="page-item disabled">
                                    <a class="page-link" href="#" tabindex="-1">
                                        <i class="fas fa-angle-left"></i>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                </li>
                                <li class="page-item active">
                                    <a class="page-link" href="#">1</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        <i class="fas fa-angle-right"></i>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref , computed} from 'vue';
import apiClient from "@/services/axiosMiddleware.js";
import CheckboxCustom from '@/components/Common/CheckboxCustom.vue'

const users = ref([])
const API = "/account";
const searchQuery = ref("")

const students = ref([
    {
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'vana@gmail.com',
        gender: 'Nam',
        registerDate: '2025-05-10',
        status: 'active'
    },
    {
        id: 2,
        name: 'Trần Thị B',
        email: 'thib@gmail.com',
        gender: 'Nữ',
        registerDate: '2025-05-12',
        status: 'inactive'
    },
])


const getUsersList = async () => {
  try {
    const response = await apiClient.get(API);
    users.value = response.data.reverse();
  } catch (error) {
    console.error("Lỗi!", error);
  }
};

function formatDate(date) {
    const d = new Date(date)
    return d.toLocaleDateString('vi-VN')
}

const handleDelete = async (id) => {
  Swal.fire({
    title: "Bạn có chắc muốn xóa?",
    text: "Hành động này không thể hoàn tác!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy"
  }).then( async (result) => {
    if (result.isConfirmed) {
      try {
        await apiClient(API+ `/${id}`, {
          method: "DELETE",
        });
        await Swal.fire("Đã xóa!", "Dữ liệu đã được xóa thành công.", "success");
        await getUsersList();
      } catch (error) {
        console.error("Lỗi!", error);
        await Swal.fire("Lỗi!", "Có lỗi xảy ra khi xóa.", "error");
      }
    }
  });
};

onMounted(getUsersList);

//Search by key word
const filteredUser = computed(() => {
    return users.value.filter(user =>
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});


</script>

<style scoped></style>