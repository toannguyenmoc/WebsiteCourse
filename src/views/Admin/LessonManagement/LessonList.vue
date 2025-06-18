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
                                    <td>{{ lesson.title }}</td>
                                    <td>{{ lesson.courseName }}</td>
                                    <td>Bài {{ lesson.lesson }}</td>
                                    <td>{{ lesson.postedDate }}</td>
                                    <td>
                                        <span class="badge badge-dot mr-4">
                                            <i :class="lesson.status === true ? 'bg-success' : 'bg-danger'"></i>
                                            <span class="h6">{{ lesson.status === true ? 'Hoạt Động' : 'Ngừng Hoạt Động' }}</span>
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
                        
                         <PaginationAdminCustom
                            :currentPage="currentPage"
                            :totalPages="totalPages"
                            :pageSize="pageSize"
                            @update:currentPage="goToPage"
                            @update:pageSize="handlePageSizeChange"
                        />
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
import { ref } from 'vue'
import DropdownActionCustom from '@/components/Common/DropdownActionCustom.vue';
import { showSuccess,showError } from '@/assets/Admin/js/alert';
import { useRouter } from 'vue-router';
import { useLessons } from '@/composables/useLessons';
import PaginationAdminCustom from '@/components/Common/PaginationAdminCustom.vue';
const router = useRouter();

const{
lessons,
fetchLessons,
pageSize,
totalPages,
currentPage,
totalItems,
removeLesson

}=useLessons();

const goToPage = (page) => {
  if (page < 0 || page >= totalPages.value) return
  fetchLessons(page, pageSize.value)
}

const handlePageSizeChange = (newPageSize) => {
  pageSize.value = newPageSize
  fetchLessons(0, newPageSize)
}








//function chuyên trang
const handleEdit = (lesson) => {
  //Chuyển trang để sửa
  router.push(`/admin/lesson/update/${lesson.id}`)
}

//function xóa
const handleDelete = (lesson) =>{
    if(lesson){
        removeLesson(lesson.id)

        

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