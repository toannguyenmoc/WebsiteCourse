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
                                    <th scope="col">Tên Khóa Học</th>
                                    <th scope="col">Số lượng tiết học</th>
                                    <th scope="col">Số lượng học viên</th>
                                    <th scope="col">Doanh Thu</th>
                                    <th scope="col">Chi tiết</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(item, index) in teachers" :key="item.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.email }}</td>
                                    <td>{{ item.gender }}</td>
                                    <td>{{ formatDate(item.registerDate) }}</td>
                                    <td>
                                       <RouterLink to="/admin/teacher/detail"><i class="ml-4 ni ni-curved-next"></i></RouterLink>
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
import CheckboxCustom from '@/components/Common/CheckboxCustom.vue'
import { ref } from 'vue';
import { showConfirm, showSuccess} from '@/assets/Admin/js/alert';
const teachers = ref([
    {
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'vana@gmail.com',
        gender: 'Nam',
        registerDate: '2025-05-10',
        status: true
    },
    {
        id: 2,
        name: 'Trần Thị B',
        email: 'thib@gmail.com',
        gender: 'Nữ',
        registerDate: '2025-05-12',
        status: true
    },
])
const  formatDate = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString('vi-VN')
}
</script>

<style lang="scss" scoped></style>