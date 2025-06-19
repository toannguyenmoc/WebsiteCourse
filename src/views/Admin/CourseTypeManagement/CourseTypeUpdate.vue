<template>
    <div>
        <div class="mt--7">
            <div class="row">
                <div class="col-xl-6 order-xl-1">
                    <div class="card bg-light shadow">
                        <div class="card-header bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Cập Nhật Loại Khoá Học</h3>
                                </div>
                               <div class="col-4 text-right">
                  <button class="btn btn-danger" @click="handleDelete">Xoá</button>
                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="handleUpdate">
                                <div class="pl-lg-12">
                                    <div class="row">
                                        <div class="col-lg-12">
                                             <div class="form-group">
                                                <label class="form-control-label" for="courseType-name">Tên Loại khóa học</label>
                                                <input type="text" id="courseType-name" v-model="form.name" @blur="$v.name.$touch()"
                                                    class="form-control form-control-alternative"
                                                    placeholder="Tên loại khoá học" value="">
                                                     <small class="text-danger" v-if="$v.name.$error">
                                                    <span>{{ $v.name.$errors[0].$message }}</span>

                                                </small>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                             <div class="form-group">
                                                <label class="form-control-label" for="unit-price">Trạng
                                                    Thái</label><br>
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="status-true" value="true"
                                                        v-model="form.status" name="status"
                                                        class="custom-control-input">
                                                    <label class="custom-control-label" for="status-true">Hoạt
                                                        Động</label>
                                                </div>
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="status-false" value="false"
                                                        v-model="form.status" name="status"
                                                        class="custom-control-input">
                                                    <label class="custom-control-label" for="status-false">Ngừng Hoạt
                                                        Động</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr class="my-4" />
                                <div class="d-flex justify-content-between">
                                    <RouterLink to="/admin/course-type/list" class="btn btn-secondary">Quay lại
                                    </RouterLink>
                                    <button class="btn btn-primary">Cập Nhật</button>
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
import useVuelidate from '@vuelidate/core'
import { required, numeric, helpers } from '@vuelidate/validators'
import { ref, reactive, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showSuccess, showError, showConfirm, showAlert } from '@/assets/Admin/js/alert'
import { useCourseTypes } from '@/composables/useCourseTypes'
import Swal from 'sweetalert2'

const router = useRouter()
const route = useRoute()
const courseTypeId = route.params.id


const { fetchCourseTypeById, editCourseType, removeCourseType } = useCourseTypes()



const form = reactive({
    name: '',
    status: true
   
})
const rules = computed(() => ({
     name: { required: helpers.withMessage("Tên khóa học không được để trống", required) }
}));


const $v = useVuelidate(rules, form);
const loadCourseType= async () => {
    try {
        const data = await fetchCourseTypeById(courseTypeId)
        if (!data) {
            showError(`Không tìm thấy khoá học với ID ${courseTypeId}`)
            router.push('/admin/course-type/list')
            return
        }

        form.name = data.name
        form.status = data.status
     


    } catch (err) {
        showError("Không thể tải dữ liệu khoá học.")
        console.error("Lỗi loadCourse:", err?.response?.data || err)
    }

}
onMounted(async () => {
  

    await loadCourseType()
})

const handleUpdate = async () => {
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
        await editCourseType(courseTypeId, payload)
        await showSuccess("Cập nhật thành công!")
        router.push('/admin/course-type/list')
    } catch (err) {
        showError("Cập nhật thất bại!")
        console.error("Lỗi cập nhật")
    }
}
const handleDelete = async () => {
    const result = await Swal.fire({
        title: `Xác nhận xoá`,
        text: `Bạn chắc chắn muốn xoá "${form.name}"? Hành động này không thể hoàn tác.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xoá',
        cancelButtonText: 'Huỷ',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6'
    })
    if (!result.isConfirmed) return

    try {
        await removeCourseType(courseTypeId)
        await showSuccess("Đã xoá tiết học")
        router.push('/admin/course-type/list')
    } catch (err) {
        showError("Lỗi khi xoá khoá học!")
        console.error("Lỗi xoá")
    }
}

//function update
</script>

<style scoped></style>