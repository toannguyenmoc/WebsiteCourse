<template>
        <div>
        <div class="row mt--7">
            <div class="col">
                <div class="card shadow">
                    <div class="card-header border-0">
                        <div class="row align-items-center">
                            <div class="col">
                                <h3 class="mb-0">Danh mục Chiết Khấu</h3>
                            </div>
                            <div class="col text-right">
                                <RouterLink to="/admin/commission/create" class="btn btn-sm btn-primary">Thêm mới</RouterLink>
                            </div>
                        </div>
                    </div>
                   
                    <div class="table">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Hiệu lực</th>
                                    <th scope="col">Phần Trăm</th>
                                  
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(item, index) in commissions" :key="item.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.effectiveDate }}</td>
                                    <td>{{ item.percentage }}%</td>
                                  
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
import { useCommissions} from '@/composables/useCommissions'
import PaginationAdminCustom from '@/components/Common/PaginationAdminCustom.vue';


const router = useRouter()

const {
  commissions,
  loading,
  error,
  fetchCommissions,
  removeCommission,
  currentPage,
  totalPages,
  pageSize
} = useCommissions()


const goToPage = (page) => {
  if (page < 0 || page >= totalPages.value) return
  fetchCommissions(page, pageSize.value)
}

const handlePageSizeChange = (newPageSize) => {
  pageSize.value = newPageSize
  fetchCommissions(0, newPageSize)
}
const  formatDate = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString('vi-VN')
}
</script>

<style lang="scss" scoped>

</style>