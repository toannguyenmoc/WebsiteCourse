<template>
    <div>
        <div class="row mt--7">
            <div class="col">
                <div class="card shadow">
                    <div class="card-header border-0">
                        <div class="row align-items-center">
                            <div class="col">
                                <h3 class="mb-0">Danh Sách Bài Học</h3>
                            </div>
                            <div class="col text-right">
                                <a href="/admin/lesson/create" class="btn btn-sm btn-primary">Thêm mới</a>
                            </div>
                        </div>
                    </div>
                    <div class="table">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên Bài Học</th>
                                    <th scope="col">Khoá Học</th>
                                    <th scope="col">Bài Học Số</th>
                                    <th scope="col">Ngày Đăng</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col" style="width: 20px;">Hoạt động</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(lesson, index) in lessons" :key="lesson.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ lesson.name }}</td>
                                    <td>{{ lesson.courseName }}</td>
                                    <td>Bài {{ lesson.lessonNumber }}</td>
                                    <td>{{ formatDate(lesson.createdAt) }}</td>
                                    <td>
                                        <span class="badge badge-dot mr-4">
                                            <i :class="lesson.status === 'active' ? 'bg-success' : 'bg-danger'"></i>
                                            <span class="h6">{{ lesson.status === 'active' ? 'Hoạt Động' : 'Ngừng Hoạt Động' }}</span>
                                        </span>
                                    </td>
                                    <td class="text-right">
                                        <DropdownActionCustom
                                            :item="lesson"
                                            @edit="handleEdit"
                                            @delete="handleDelete" />
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
import { ref } from 'vue'
import DropdownActionCustom from '@/components/Common/DropdownActionCustom.vue';
import { showSuccess } from '@/assets/Admin/js/alert';
import { useRouter } from 'vue-router';
const router = useRouter();
const lessons = ref([
    {
        id: 1,
        name: 'Giới thiệu Vue 3',
        courseName: 'Lập trình Vue',
        lessonNumber: 1,
        createdAt: '2025-05-10',
        status: 'active'
    },
    {
        id: 2,
        name: 'Cài đặt môi trường',
        courseName: 'Lập trình Vue',
        lessonNumber: 2,
        createdAt: '2025-05-12',
        status: 'inactive'
    },

])


//function chuyên trang
const handleEdit = (lesson) => {
  //Chuyển trang để sửa
  router.push(`/admin/lesson/update/${lesson.id}`)
}

//function xóa
const handleDelete = (lesson) =>{
    if(lesson){
        //Thực hiện xóa ở đây

        

        //Thông báo xóa thành công
        showSuccess("Xóa thành công!");
    }
}

function formatDate(date) {
    const d = new Date(date)
    return d.toLocaleDateString('vi-VN')
}
</script>

<style scoped></style>