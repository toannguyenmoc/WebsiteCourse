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
                                              <input v-model="form.name" type="text" id="lesson-name"
                                                    class="form-control form-control-alternative"
                                                    placeholder="Tên khóa học">
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
                                                            :value="true">
                                                        <label class="custom-control-label" for="status-true">Hoạt
                                                            Động</label>
                                                    </div>
                                                    <div class="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="status-false" name="status"
                                                            class="custom-control-input" v-model="form.status"
                                                            :value="false">
                                                        <label class="custom-control-label" for="status-false">Ngừng
                                                            Hoạt Động</label>
                                                    </div>
                                                </div>
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
import { RouterLink } from 'vue-router'
import { showSuccess, showError } from '@/assets/Admin/js/alert'
import { onMounted, reactive, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCourseTypes } from '@/composables/useCourseTypes'
//function thêm 


const router = useRouter()
const { addCourseType } = useCourseTypes()

const form = reactive({
     name:'',
    status: true
  

})



const handleSubmit = async () => {

    if (
        form.name=== -1 
    ) {
        showError("Vui lòng điền đầy đủ thông tin.")
        return
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