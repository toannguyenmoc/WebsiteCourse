<template>
    <div>
        <div class="mt--7">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <div class="card bg-light shadow">
                        <div class="card-header bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Thêm Bài Học</h3>
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
                                                <label class="form-control-label" for="">Khoá Học</label>
                                                <select class="form-select form-control form-control-alternative"
                                                    v-model="form.courseId" aria-label="Default select example">
                                                    <option disabled value="-1" selected>-- Chọn loại khoá học --
                                                    </option>
                                                    <option v-for="courses in course" :key="courses.id"
                                                        :value="courses.id">
                                                        {{ courses.title }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="lesson-name">Tên Bài Học</label>
                                                <input v-model="form.title" type="text" id="lesson-name"
                                                    class="form-control form-control-alternative"
                                                    placeholder="Tên bài học">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="lesson-no">Bài Học Số</label>

                                                <input v-model="form.lesson"
                                                    class="form-control form-control-alternative"
                                                    placeholder="Nhập bài học">
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <label class="form-control-label" for="">Video URL</label>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input form-control-alternative"
                                                    id="customFileLang" @change="handleFileChange">
                                                <label class="custom-file-label" for="customFileLang">Chọn file</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
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
                                        <div class="col-lg-6">
                                            <label class="form-control-label" for="">Bài Tập URL</label>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input form-control-alternative"
                                                    id="customFileLang" @change=handleFileChange1>
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
                                        <textarea v-model="form.description" rows="4"
                                            class="form-control form-control-alternative"
                                            placeholder="Mô tả về bài học của bạn ..."></textarea>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <div class="d-flex justify-content-between">
                                    <RouterLink to="/admin/lesson/list" class="btn btn-secondary">Quay lại</RouterLink>
                                    <button class="btn btn-primary">Thêm Mới</button>
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
import { useLessons } from '@/composables/useLessons'
import { useCourses } from '@/composables/useCourses'


const router = useRouter()
const { addLesson } = useLessons()
const { fetchAllCourses } = useCourses()

const course = ref([])


onMounted(async () => {
    course.value = await fetchAllCourses()

})
//function thêm 

const form = reactive({
    title: '',
    lesson: '',
    description: '',
    videoUrl: '',
    exerciseUrl: '',
    postedDate: new Date(),
    status: true,
    courseId: -1,

})
const formatDate = (date) => {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
}

const handleSubmit = async () => {
    console.log(form.title),
    console.log(form.description),
    console.log(form.exerciseUrl),
    console.log(form.videoUrl),
    console.log(form.status),
    console.log(form.lesson)
    if (
        form.courseId === -1 ||
        !form.title.trim()
    ) {
        showError("Vui lòng điền đầy đủ thông tin.")
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
        await addLesson(payload)
        await showSuccess("Thêm thành công!")
        router.push('/admin/lesson/list')
    } catch (err) {
        showError("Thêm thất bại!")
        console.error("Lỗi khi thêm tiết học:", err?.response?.data || err.message || err)
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
</script>

<style scoped></style>