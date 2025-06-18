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
                                                <input v-model="form.effectiveDate" type="date" id="effectiveDate"
                                                    class="form-control form-control-alternative"
                                                    placeholder="Chọn ngày hiệu lực" @blur="$v.effectiveDate.$touch()">
                                                <div v-if="$v.effectiveDate.$dirty && $v.effectiveDate.$error"
                                                    class="text-danger">
                                                    <div>
                                                        {{ $v.effectiveDate.required.$invalid
                                                            ? $v.effectiveDate.required.$message
                                                            : ($v.effectiveDate.greaterThanToday.$invalid
                                                        ? $v.effectiveDate.greaterThanToday.$message
                                                        : '')
                                                        }}
                                                    </div>
                                                </div>
                                            </div>




                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="percent">Phần trăm</label>
                                                <input v-model.number="form.percentage" type="number" id="percentage"
                                                    class="form-control form-control-alternative"
                                                    placeholder="Phần trăm">
                                                <!-- Lỗi -->
                                                <small class="text-danger"
                                                    v-if="$v.percentage.$dirty && $v.percentage.$error">
                                                    {{ $v.percentage.$errors[0].$message }}
                                                </small>
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
import useVuelidate from '@vuelidate/core'
import { required, numeric, helpers, minValue, maxValue } from '@vuelidate/validators'
import { RouterLink } from 'vue-router'
import { showSuccess, showError } from '@/assets/Admin/js/alert'
import { onMounted, reactive, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCommissions } from '@/composables/useCommissions'//function thêm 
const form = reactive({
    effectiveDate: '',
    percentage: ''


})
const router = useRouter()
const { addCommission } = useCommissions()


const rules = computed(() => ({
    effectiveDate: {
        required: helpers.withMessage("Vui lòng chọn ngày hiệu lực", required), greaterThanToday
    },
    percentage: {
        required: helpers.withMessage("Phần trăm không được để trống", required),
        numeric: helpers.withMessage("Phần trăm phải là số", numeric),
        minValue: helpers.withMessage("Phần trăm phải lớn hơn 0", minValue(1)),
        maxValue: helpers.withMessage("Phần trăm tối đa là 100", maxValue(100))
    }
}));
const greaterThanToday = helpers.withMessage(
    "Ngày hiệu lực phải lớn hơn hôm nay",
    (value) => {
        if (!value) return false;
        const selectedDate = new Date(value);
        const today = new Date();
        // Xóa phần giờ phút giây
        selectedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return selectedDate > today;
    }
);

const $v = useVuelidate(rules, form);



const handleSubmit = async () => {

    const isValid = await $v.value.$validate();

    // Nếu lỗi thì show lỗi và dừng lại
    if (!isValid) {
        showError("Vui lòng kiểm tra lại thông tin!");
        return;
    }

    const payload = {
        effectiveDate: formatDate(form.effectiveDate),
        percentage: form.percentage

    }
    try {
        console.log("Payload gửi lên:", payload)
        await addCommission(payload)
        await showSuccess("Thêm thành công!")
        router.push('/admin/commission/list')
    } catch (err) {
        showError("Thêm thất bại!")
        console.error("Lỗi khi thêm tiết học:", err?.response?.data || err.message || err)
    }


}

const formatDate = (date) => {
    const d = new Date(date)
    const day = String(d.getDate() + 1).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
}
</script>

<style lang="scss" scoped></style>