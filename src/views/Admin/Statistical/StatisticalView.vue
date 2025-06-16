<template>
    <div>
        <div class="row mt--7">
            <div class="col">
                <div class="card shadow">
                    <div class="card-header border-0">
                        <div class="row align-items-center">
                            <div class="col">
                                <h3 class="mb-0">Thống Kê</h3>
                            </div>
                            <div class="col text-right">
                                <!-- <RouterLink to="/admin/teacher/create" class="btn btn-sm btn-primary">Thêm mới</RouterLink> -->
                            </div>
                        </div>
                    </div>
                    <div class="table">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Loại Khóa Học</th>
                                    <th scope="col">Số lượng học viên</th>
                                    <th scope="col">Doanh thu</th>
                                      <th scope="col">Chiết khấu</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(item, index) in statisticals" :key="item.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.totlalStudent }}</td>
                                    <td>{{ item.sum }}</td>
                                    <td>{{ item.percent }}</td>
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
import { ref } from 'vue';
const statisticals = ref([
    {
        id: 1,
        name: 'Frontend',
        totlalStudent: 200,
        sum: 200000,
        percent:20000,
    },
    {
        id: 1,
        name: 'Frontend',
        totlalStudent: 200,
        sum: 200000,
        percent:20000,
    },
    {
        id: 1,
        name: 'Frontend',
        totlalStudent: 200,
        sum: 200000,
        percent:20000,
    },
    
])
const  formatDate = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString('vi-VN')
}
</script>

<style lang="scss" scoped></style>