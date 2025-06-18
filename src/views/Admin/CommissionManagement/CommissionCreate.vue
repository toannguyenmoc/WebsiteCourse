<template>
    <div>
        <div class="mt--7">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <div class="card bg-light shadow">
                        <div class="card-header bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Thêm Mới Chiết Khấu</h3>
                                </div>
                                <div class="col-4 text-right">

                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="handleSubmit">
                                <div class="pl-lg-12">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="effectiveDate">Hiệu Lực</label>
                                                <input  v-model="form.effectiveDate" type="date" id="effectiveDate"
                                                    class="form-control form-control-alternative"
                                                    placeholder="Chọn ngày hiệu lực">
                                            </div>

                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="percent">Phần trăm</label>
                                                <input v-model="form.percentage" type="text" id="lesson-name"
                                                    class="form-control form-control-alternative"
                                                    placeholder="Phần trăm">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <div class="d-flex justify-content-between">
                                    <RouterLink to="/admin/commission/list" class="btn btn-secondary">Quay lại
                                    </RouterLink>
                                    <button class="btn btn-primary">Thêm mới</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { showSuccess, showError } from '@/assets/Admin/js/alert'
import { onMounted, reactive, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCommissions } from '@/composables/useCommissions'
import PaginationAdminCustom from '@/components/Common/PaginationAdminCustom.vue';
//function thêm 

const router = useRouter()
const { addCommission } = useCommissions()

const form = reactive({
    effectiveDate: '',
    percentage: ''


})

const handleSubmit = async () => {

    if (
        form.percentage === -1
    ) {
        showError("Vui lòng điền đầy đủ thông tin.")
        return
    }

    const payload = {
        effectiveDate: formatDate(form.effectiveDate),
        percentage: form.percentage,

    }
    try {
        await addCommission(payload)
        await showSuccess("Thêm thành công!")
        router.push('/admin/commission/list')
    } catch (err) {
        showError("Thêm thất bại!")
        console.error("Lỗi khi thêm tiết học:", err?.response?.data || err.message || err)
    }


}
const  formatDate = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString('vi-VN')
}
const formatDate1 = reactive(


)


</script>

<style lang="scss" scoped></style>