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
                           
                        </div>
                    </div>
                    <div class="table">
                        <table class="table align-items-center table-flush">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Tên Khoá Học</th>
                                    <th scope="col">Ngày thanh toán</th>
                                    <th scope="col">Chiết khấu</th>
                                    <th scope="col">Giá tiền</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(payment, index) in payments" :key="payment.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ payment.accountFullname }}</td>
                                    <td>{{ payment.courseName }}</td>
                                     <td>{{ formatDate(payment.registrationDate)}}</td>
                                    <td>{{ payment.discount}}%</td>
                                    <td>{{ payment.totalAmount }}</td>
                                  
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

import PaginationAdminCustom from '@/components/Common/PaginationAdminCustom.vue';
import { usePayments } from '@/composables/usePayments';
const router = useRouter();

const{
payments,
fetchPayments,
pageSize,
totalPages,
currentPage,
totalItems

}=usePayments();

const goToPage = (page) => {
  if (page < 0 || page >= totalPages.value) return
  fetchPayments(page, pageSize.value)
}

const handlePageSizeChange = (newPageSize) => {
  pageSize.value = newPageSize
  fetchPayments(0, newPageSize)
}








//function chuyên trang


//function xóa


function formatDate(date) {
    const d = new Date(date)
    return d.toLocaleDateString('vi-VN')
}
</script>

<style scoped></style>