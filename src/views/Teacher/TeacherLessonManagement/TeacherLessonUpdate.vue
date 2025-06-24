<template>
    <div>
        <div class="mt--7">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <div class="card bg-light shadow">
                        <div class="card-header bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Cập Nhật Bài Học</h3>
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
                                        <div class="col-lg-6">

                                            <div class="form-group">
                                                <label class="form-control-label">Khoá Học</label>
                                                <select v-model="form.courseId" @blur="$v.courseId.$touch()"
                                                    @change="$v.courseId.$touch()"
                                                    class="form-select form-control form-control-alternative">
                                                    <option v-for="type in courses" :key="type.id" :value="type.id">
                                                        {{ type.title }}
                                                    </option>
                                                </select>
                                                <small class="text-danger"
                                                    v-if="$v.courseId.$dirty && $v.courseId.$error">
                                                    <span>{{ $v.courseId.$errors[0].$message }}</span>
                                                </small>


                                            </div>



                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="lesson-name">Tên Bài Học</label>
                                                <input type="text" id="lesson-name" v-model="form.title"
                                                    class="form-control form-control-alternative"
                                                    placeholder="Tên bài học">
                                               <small class="text-danger" v-if="$v.title.$error">
                                                    <span>{{ $v.title.$errors[0].$message }}</span>
                                                </small>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">

                                            <div class="form-group">
                                                <label class="form-control-label" for="lesson-no">Bài Học Số</label>
                                                <input type="number" min="1" step="1" id="lesson-no"
                                                    v-model="form.lesson" class="form-control form-control-alternative"
                                                    placeholder="Nhập số thứ tự bài học">
                                                <small class="text-danger" v-if="$v.lesson.$error">
                                                    <span>{{ $v.lesson.$errors[0].$message }}</span>
                                                </small>
                                            </div>

                                        </div>
                                        <div class="col-lg-6">
                                            <label class="form-control-label" for="">Video URL</label>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input form-control-alternative"
                                                    id="customFileLang" @change="handleUpdateUpload" />
                                                <label class="custom-file-label" for="customFileLang">Chọn file</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label">Trạng Thái</label><br>
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
                                        <div class="col-lg-6">
                                            <label class="form-control-label" for="">Bài Tập URL</label>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input form-control-alternative"
                                                    id="customFileLang" @change="handleFileChange1" />
                                                <label class="custom-file-label" for="customFileLang">Chọn file</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <!-- Description -->
                                <div class="pl-lg-12">
                                    <div class="form-group">
                                        <label>Mô tả</label>
                                        <textarea rows="4" class="form-control form-control-alternative"
                                            placeholder="Mô tả về bài học của bạn ..."
                                            v-model="form.description"></textarea>
                                        <small class="text-danger" v-if="$v.description.$error">
                                                    <span>{{ $v.description.$errors[0].$message }}</span>
                                                </small>

                                        
                                    </div>

                                </div>
                                <hr class="my-4" />
                                <div class="d-flex justify-content-between">
                                    <RouterLink to="/admin/lesson/list" class="btn btn-secondary">Quay lại</RouterLink>
                                    <button class="btn btn-primary">Cập Nhật</button>
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
import { required, numeric, helpers } from '@vuelidate/validators'
import { ref, reactive, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showSuccess, showError, showConfirm, showAlert } from '@/assets/Admin/js/alert'
import { useLessons } from '@/composables/useLessons'
import { useCourses } from '@/composables/useCourses'
import { createVideo, uploadVideoSource, updateVideoSource } from '@/utils/uploadVideoUtils'
import Swal from 'sweetalert2'

const router = useRouter()
const route = useRoute()
const lessonId = route.params.id


const { fetchLessonById, editLesson, removeLesson } = useLessons()
const { fetchAllCourses } = useCourses()

const courses = ref([])

const formatDate = (date) => {
    const d = new Date(date)
    const day = String(d.getDate() + 1).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
}

const form = reactive({
    title: '',
    lesson: 0,
    description: '',
    videoUrl: '',
    exerciseUrl: '',
    postedDate: new Date(),
    status: true,
    courseId: ''
})


const rules = computed(() => ({
    title: { required: helpers.withMessage("Tên không được để trống", required) },
    lesson: {
        required: helpers.withMessage("Tiết không được để trống", required),
        numeric: helpers.withMessage("Tiết phải là số", numeric)
    },
    courseId: {
        required: helpers.withMessage("Vui lòng chọn khoá học", value => value !== -1)
    },
    description: {
        required: helpers.withMessage("Mô tả không được để trống", required)
    },
   
    postedDate: {
        required: helpers.withMessage("Vui lòng chọn ngày", value => value !== null && value !== '')
    }   
}))




const $v = useVuelidate(rules, form);


const loadLesson = async () => {
    try {
        const data = await fetchLessonById(lessonId)
        if (!data) {
            showError(`Không tìm thấy khoá học với ID ${lessonId}`)
            router.push('/admin/lesson/list')
            return
        }

        form.title = data.title
        form.lesson = data.lesson
        form.description = data.description
        form.videoUrl = data.videoUrl
        form.exerciseUrl = data.exerciseUrl

        form.status = data.status
        form.courseId = data.courseId


    } catch (err) {
        showError("Không thể tải dữ liệu khoá học.")
        console.error("Lỗi loadCourse:", err?.response?.data || err)
    }
}
onMounted(async () => {
    courses.value = await fetchAllCourses()

    await loadLesson()
})


const handleUpdate = async () => {


    await $v.value.$validate()

    if ($v.value.$invalid) {
        showError("Vui lòng kiểm tra lại các trường nhập!")
        return
    }

    const payload = {
        title: form.title,
        lesson: form.lesson,
        description: form.description,
        videoUrl: form.videoUrl,
        exerciseUrl: form.exerciseUrl,
        postedDate: formatDate(form.postedDate),
        status: form.status,
        courseId: form.courseId
    }

    try {
        await editLesson(lessonId, payload)
        await showSuccess("Cập nhật thành công!")
        router.push('/admin/lesson/list')
    } catch (err) {
        showError("Cập nhật thất bại!")
        console.error("Lỗi cập nhật:", err)
    }
}

const handleDelete = async () => {
    const result = await Swal.fire({
        title: `Xác nhận xoá`,
        text: `Bạn chắc chắn muốn xoá "${form.title}"? Hành động này không thể hoàn tác.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xoá',
        cancelButtonText: 'Huỷ',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6'
    })
    if (!result.isConfirmed) return

    try {
        await removeLesson(lessonId)
        await showSuccess("Đã xoá tiết học")
        router.push('/admin/lesson/list')
    } catch (err) {
        showError("Lỗi khi xoá khoá học!")
        console.error("Lỗi xoá")
    }
}
const handleFileChange = (e) => {
    const file = e.target.files[0]
    form.exerciseUrl = file?.name || ''
}
const handleFileChange1 = (e) => {
    const file = e.target.files[0]
    form.videoUrl = file?.name || ''
}
const handleUpdateUpload = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  try {
    const publicId = await createVideo(file.name)
    const url = await updateVideoSource(publicId, file)

    form.videoUrl = url  // Chỉ cần dòng này
    // videoUrl.value = url  → xoá dòng này

  } catch (err) {
    console.error('Lỗi upload:', err?.response?.data || err.message)
    showError('Không thể cập nhật video!')
  }
}



</script>

<style scoped></style>