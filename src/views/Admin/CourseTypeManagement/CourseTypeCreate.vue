<template>
    <div>
        <div class="mt--7">
            <div class="row">
                <div class="col-xl-6 order-xl-1">
                    <div class="card bg-light shadow">
                        <div class="card-header bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Thêm Loại Khoá Học</h3>
                                </div>
                                <div class="col-4 text-right">

                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="handleSubmit">
                                <div class="pl-lg-12">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label class="form-control-label" for="course-name">Tên Loại Khoá
                                                    Học</label>
                                              <input v-model="form.name" @blur="$v.name.$touch()" type="text" id="lesson-name"
                                                    class="form-control form-control-alternative"
                                                    placeholder="Tên khóa học">
                                                     <small class="text-danger" v-if="$v.name.$error">
                                                    <span>{{ $v.name.$errors[0].$message }}</span>

                                                </small>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label class="form-control-label" for="unit-price">Trạng
                                                        Thái</label><br>
                                                    <div class="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="status-true" name="status"
                                                            class="custom-control-input" v-model="form.status"
                                                            :value="true" @change="$v.status.$touch()">
                                                        <label class="custom-control-label" for="status-true">Hoạt
                                                            Động</label>

                                                    </div>
                                                    <div class="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="status-false" name="status"
                                                            class="custom-control-input" v-model="form.status"
                                                            :value="false" @change="$v.status.$touch()">
                                                        <label class="custom-control-label" for="status-false">Ngừng
                                                            Hoạt Động</label>
                                                    </div>




                                                </div>
                                                <small v-if="$v.status.$error" class="text-danger">
                                                    <span> {{ $v.status.$errors[0].$message }}</span>

                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr class="my-4" />
                                <div class="d-flex justify-content-between">
                                    <RouterLink to="/admin/course-type/list" class="btn btn-secondary">Quay lại
                                    </RouterLink>
                                    <button class="btn btn-primary">Thêm Mới</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- <div class="col-xl-6 order-xl-1">
                    <div class="card bg-light shadow">
                        <div class="card-header bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Thông Tin Chiết Khấu</h3>
                                </div>
                                <div class="col-4 text-right">

                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="">
                                <input type="text" hidden value="">
                                <div class="form-group">
                                                <label class="form-control-label" for="">Ngày áp dụng</label>
                                                <select class="form-select form-control form-control-alternative"
                                                    aria-label="Default select example">
                                                    <option selected>Ngày áp dụng</option>
                                                    <option value="1">13-02-2024</option>
                                                    <option value="2">13-02-2024</option>
                                                    <option value="3">13-02-2024</option>
                                                </select>
                                            </div>
                                <div class="form-group">
                                    <label class="form-control-label" for="commission">Phần trăm</label><br>
                                    <input type="text" id="commission" class="form-control form-control-alternative" value="10%" disabled>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup>

import useVuelidate from "@vuelidate/core"
import { RouterLink } from 'vue-router'
import { showSuccess, showError } from '@/assets/Admin/js/alert'
import { onMounted, reactive, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCourseTypes } from '@/composables/useCourseTypes'
import { required, numeric, helpers } from "@vuelidate/validators";
const form = reactive({
     name:'',
    status: null
  

})

const router = useRouter()
const { addCourseType } = useCourseTypes()
const rules = computed(() => ({
     name: { required: helpers.withMessage("Tên khóa học không được để trống", required) },
     status: {
        required: helpers.withMessage("Vui lòng chọn trạng thái", value => value === true || value === false)
    }
}));


const $v = useVuelidate(rules, form);

const handleSubmit = async () => {

      const isValid = await $v.value.$validate();

    // Nếu lỗi thì show lỗi và dừng lại
    if (!isValid) {
        showError("Vui lòng kiểm tra lại thông tin!");
        return;
    }
    const payload = {
        name: form.name,
        status: form.status,
      
    }
    try {
        await addCourseType(payload)
        await showSuccess("Thêm thành công!")
        router.push('/admin/course-type/list')
    } catch (err) {
        showError("Thêm thất bại!")
        console.error("Lỗi khi thêm tiết học:", err?.response?.data || err.message || err)
    }


}






</script>

<style scoped></style>