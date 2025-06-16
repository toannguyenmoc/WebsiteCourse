<template>
    <div>
        <div class="row mt--7">
            <div class="col">
                <div class="card shadow">
                    <div class="card-header border-0">
                        <div class="row align-items-center">
                            <div class="col">
                                <h3 class="mb-0">Danh Sách Khoá Học</h3>
                            </div>
                            <div class="col text-right">
                                <a href="/admin/course/create" class="btn btn-sm btn-primary">Thêm mới</a>
                            </div>
                        </div>
                    </div>
                    <div class="table">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên Khoá Học</th>
                                    <th scope="col">Giá Tiền</th>
                                    <th scope="col">Ngày tạo</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col" style="width: 20px;">Hoạt động</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(course, index) in courses" :key="course.id">
                                    <td>{{ index + 1 }}</td>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <a href="#" class="avatar rounded-circle mr-3">
                                                <img :src="course.image" alt="Logo Course" />
                                            </a>
                                            <div class="media-body">
                                                <span class="mb-0 text-sm">{{ course.title }}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td>
                                        {{ course.price.toLocaleString() }} USD
                                    </td>
                                    <td>
                                        {{ course.createdDate }}
                                    </td>
                                    <td>
                                        <span class="badge badge-dot mr-4">
                                            <i :class="course.status === true ? 'bg-success' : 'bg-danger'"></i>
                                            <span class="h6">{{ course.status ? 'Hoạt động' : 'Ngừng Hoạt động'
                                                }}</span>
                                        </span>
                                    </td>
                                    <td class="text-right">
                                        <DropdownActionCustom
                                            :item="course" 
                                            @edit="handleEdit"
                                            @delete="handleDelete"
                                        />
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                    <div class="card-footer py-4">
                        <div class="d-flex justify-content-between">
                        <div class="d-flex justify-content-center align-items-center pr-4 mb-2">
                            <label class="mb-0">Hiển thị:</label>
                            <select class="form-control form-control-sm ml-2 w-auto" v-model.number="pageSize" @change="handlePageSizeChange">
                                <option :value="1">1</option>
                                <option :value="2">2</option>
                                <option :value="5">5</option>
                                <option :value="10">10</option>
                            </select>
                            <span class="ml-2">khoá học/trang</span>
                        </div>
                        <div>
                            <nav aria-label="...">
                                <ul class="pagination justify-content-end mb-0">
                                    <li class="page-item" :class="{ disabled: currentPage === 0 }">
                                        <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">
                                            <i class="fas fa-angle-left"></i>
                                        </a>
                                    </li>

                                    <li class="page-item" v-for="page in totalPages" :key="page"
                                        :class="{ active: currentPage === page - 1 }">
                                        <a class="page-link" href="#" @click.prevent="goToPage(page - 1)">
                                            {{ page }}
                                        </a>
                                    </li>

                                    <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
                                        <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">
                                            <i class="fas fa-angle-right"></i>
                                        </a>
                                    </li>
                                </ul>

                            </nav>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import LogoBootstrap from '@/assets/Admin/images/theme/bootstrap.jpg'
import DropdownActionCustom from '@/components/Common/DropdownActionCustom.vue';
import { showSuccess } from '@/assets/Admin/js/alert';
const router = useRouter();
const courses = [
    {
        id: 1,
        name: 'Design System',
        price: 2500,
        createdAt: '25/05/2025',
        status: 'pending',
        image: LogoBootstrap
    },
    {
        id: 2,
        name: 'Frontend Vue 3',
        price: 3000,
        createdAt: '26/05/2025',
        status: 'active',
        image: LogoBootstrap
    },
    {
        id: 3,
        name: 'Frontend Vue 3',
        price: 3000,
        createdAt: '26/05/2025',
        status: 'pending',
        image: LogoBootstrap
    }
]

//function chuyên trang
const handleEdit = (course) => {
  //Chuyển trang để sửa
  router.push(`/admin/course/update/${course.id}`)
}

//function xóa
const handleDelete = (course) =>{
    if(course){
        //Thực hiện xóa ở đây

        

        //Thông báo xóa thành công
        showSuccess("Xóa thành công!");
    }
}


</script>

<style>
</style>