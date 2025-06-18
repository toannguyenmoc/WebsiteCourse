<template>
    <div>
        <div class="row mt--7">
            <div class="col">
                <div class="card shadow">
                    <div class="card-header border-0">
                        <div class="row align-items-center justify-content-between">
                            <div class="col">
                                <h3 class="mb-0">Thống Kê</h3>
                            </div>
                            <div class="col-auto text-right">
                                <form class="navbar-search navbar-search-light form-inline ml-auto">
                                    <div class="form-group mb-0">
                                        <div class="input-group input-group-alternative">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="fas fa-search"></i></span>
                                            </div>
                                            <input class="form-control bg-transparent" placeholder="Tìm kiếm ..."
                                                type="text" v-model="keyword" @input="handleSearch" />

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="table">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên Khóa Học</th>
                                    <th scope="col">Số lượng học viên</th>
                                    <th scope="col">Doanh thu</th>
                                    <th scope="col">Tên giảng viên</th>
                                    <th scope="col">Đánh giá</th>
                                    <th scope="col">Ngày tạo</th>
                                    <th scope="col">Tổng bình luận</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(item, index) in statisticalCourses" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.courseName }}</td>
                                    <td>{{ item.totalStudent }}</td>
                                    <td>{{ item.totalRevenue }}</td>
                                    <td>{{ item.teacherName }}</td>
                                    <td>{{ item.rating }}</td>
                                    <td>{{ item.postedDate }}</td>
                                    <td>{{ item.totalComment }}</td>
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
import { ref } from 'vue';
import PaginationAdminCustom from '@/components/Common/PaginationAdminCustom.vue';
import { useStatisticalCourses } from '@/composables/useStatistical';

const {
    statisticalCourses,
    loading,
    error,
    fetchStatisticalCourses,
    keyword,
    currentPage,
    totalPages,
    pageSize
} = useStatisticalCourses()

const goToPage = (page) => {
    if (page < 0 || page >= totalPages.value) return
    fetchStatisticalCourses(page, pageSize.value, keyword.value)
}

const handlePageSizeChange = (newPageSize) => {
    pageSize.value = newPageSize
    fetchStatisticalCourses(0, newPageSize, keyword.value)
}

const searchTimeout = ref(null);

const handleSearch = () => {
  clearTimeout(searchTimeout.value);

  // Gọi lại API sau 500ms
  searchTimeout.value = setTimeout(() => {
    fetchStatisticalCourses(0, pageSize.value, keyword.value);
    currentPage.value = 0; // Reset về trang đầu khi tìm kiếm mới
  }, 500);
};

</script>

<style lang="scss" scoped></style>