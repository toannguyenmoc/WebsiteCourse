<template>
    <div>
        <div class="row mt--7">
            <div class="col">
                <div class="card shadow">
                    <div class="card-header border-0">
                        <div class="row align-items-center">
                            <div class="col">
                                <h3 class="mb-0">Danh Sách Loại Khoá Học</h3>
                            </div>
                            <div class="col text-right">
                                <a href="/admin/course-type/create" class="btn btn-sm btn-primary">Thêm mới</a>
                            </div>
                        </div>
                    </div>
                    <div class="table">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên loại khóa học</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col" style="width: 40px;">Hoạt động</th>

                                </tr>
                            </thead>

                             <tbody>
                                <tr v-for="(courseType, index) in courseTypes" :key="courseType.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ courseType.name }}</td>
                                   
                                    
                                    <td>
                                        <span class="badge badge-dot mr-4">
                                            <i :class="courseType.status === true ? 'bg-success' : 'bg-danger'"></i>
                                            <span class="h6">{{ courseType.status === true ? 'Hoạt Động' : 'Ngừng Hoạt Động' }}</span>
                                        </span>
                                    </td>
                                    <td class="text-right">
                                        <DropdownActionCustom
                                            :item="courseType"
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
import { RouterLink, useRouter } from 'vue-router';
import LogoBootstrap from '@/assets/Admin/images/theme/bootstrap.jpg'
import DropdownActionCustom from '@/components/Common/DropdownActionCustom.vue';
import { useCourseTypes } from '@/composables/useCourseTypes'
import PaginationAdminCustom from '@/components/Common/PaginationAdminCustom.vue';

const router = useRouter()

const {
  courseTypes,
  loading,
  error,
  fetchCourseTypes,
  removeCourseType,
  currentPage,
  totalPages,
  pageSize
} = useCourseTypes()


const goToPage = (page) => {
  if (page < 0 || page >= totalPages.value) return
  fetchCourseTypes(page, pageSize.value)
}

const handlePageSizeChange = (newPageSize) => {
  pageSize.value = newPageSize
  fetchCourseTypes(0, newPageSize)
}

//function chuyên trang
const handleEdit = (courseType) => {
  //Chuyển trang để sửa
  router.push(`/admin/course-type/update/${courseType.id}`)
}

//function xóa
const handleDelete = (courseType) =>{
    if(courseType){
        removeCourseType(courseType.id)
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