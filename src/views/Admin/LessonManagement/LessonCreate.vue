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
                                                    v-model="form.courseId">
                                                    <option disabled value="-1">-- Chọn loại khoá học --</option>
                                                    <option v-for="courses in course" :key="courses.id"
                                                        :value="courses.id">
                                                        {{ courses.title }}
                                                    </option>
                                                </select>
                                                <small class="text-danger" v-if="$v.courseId.$error">
                                                    <span>{{ $v.courseId.$errors[0].$message }}</span>
                                                </small>


                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="lesson-name">Tên Bài Học</label>
                                                <input v-model="form.title" type="text"
                                                    id="lesson-name" class="form-control form-control-alternative"
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

                                                <input v-model="form.lesson" 
                                                    class="form-control form-control-alternative"
                                                    placeholder="Nhập bài học">
                                                    <small class="text-danger" v-if="$v.lesson.$error">
                                                    <span>{{ $v.lesson.$errors[0].$message }}</span>
                                                </small>
                                        
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <label class="form-control-label" for="">Video URL</label>
                                            <div class="custom-file">
                                                <input type="file"  class="custom-file-input form-control-alternative"
                                                    id="customFileLang" @change="handleUploadVideo">
                                                <label class="custom-file-label" for="customFileLang">
                                                    {{ form.videoUrl ? 'Đã upload xong video' : 'Chọn file' }}
                                                </label>
                                            </div>

                                            <!-- Lỗi -->
                                            <small class="text-danger" v-if="$v.videoUrl.$error">
                                                {{ $v.videoUrl.$errors[0].$message }}
                                            </small>




                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label class="form-control-label" for="unit-price">Trạng
                                                        Thái</label><br>
                                                    <div class="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" checked id="status-true" name="status"
                                                            class="custom-control-input" v-model="form.status">
                                                        <label class="custom-control-label" for="status-true">Hoạt
                                                            Động</label>

                                                    </div>
                                                    <div class="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="status-false" name="status"
                                                            class="custom-control-input" v-model="form.status">
                                                        <label class="custom-control-label" for="status-false">Ngừng
                                                            Hoạt Động</label>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                         <div class="col-lg-6">
                                            <label class="form-control-label" for="">Exercise URL</label>
                                            <div class="custom-file">
                                                <input type="file"  class="custom-file-input form-control-alternative"
                                                    id="customFileLang" @change="handleImageUpload">
                                                <label class="custom-file-label" for="customFileLang">
                                                    {{ form.exerciseUrl ? 'Đã upload xong video' : 'Chọn file' }}
                                                </label>
                                            </div>

                                            <!-- Lỗi -->
                                            <small class="text-danger" v-if="$v.exerciseUrl.$error">
                                                {{ $v.exerciseUrl.$errors[0].$message }}
                                            </small>




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
                                        <small class="text-danger" v-if="$v.description.$error">
                                                    <span>{{ $v.description.$errors[0].$message }}</span>
                                                </small>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <div class="d-flex justify-content-between">
                                    <RouterLink to="/admin/lesson/list" class="btn btn-secondary">Quay lại</RouterLink>
                                    <input type="submit" :value="isUploading ? 'Loading...' : 'Cập nhật'" :disabled="isUploading" class="btn btn-primary"></input>
                                    
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
import useVuelidate from "@vuelidate/core"
import { showSuccess, showError } from '@/assets/Admin/js/alert'
import { onMounted, reactive, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLessons } from '@/composables/useLessons'
import { useCourses } from '@/composables/useCourses'
import { required, numeric, helpers } from "@vuelidate/validators";
import { createVideo, uploadVideoSource, normalizeTitle } from '@/utils/uploadVideoUtils'
import { uploadImageToCloudinary } from '@/utils/uploadImageUtils'

const router = useRouter()
const { addLesson } = useLessons()
const { fetchAllCourses } = useCourses()
const isUploading = ref(false);
const course = ref([])


onMounted(async () => {
    course.value = await fetchAllCourses()

})

const form = reactive({
    title: '',
    lesson: '',
    description: '',
    videoUrl: null,
    exerciseUrl: '',
    postedDate: new Date(),
    status: null,
    courseId: -1,

})
const videoUrlRequired = helpers.withMessage(
    "Vui lòng chọn file",
    (value) => typeof value === 'string' && value !== ''
)
const exerciseUrlRequired = helpers.withMessage(
    "Vui lòng chọn file",
    (value) => typeof value === 'string' && value !== ''
)

const rules = computed(() => ({
    title: { required: helpers.withMessage("Tên không được để trống", required) },
    lesson: {
        required: helpers.withMessage("Tiết không được để trống", required),
        numeric: helpers.withMessage("Tiết phải là số", numeric)
    },
    courseId: { required: helpers.withMessage("Vui lòng chọn khoá học", (value) => value !== -1, required) },
    description: {
        required: helpers.withMessage("Mô tả không được để trống", required)

    },exerciseUrl: { required: exerciseUrlRequired },
    videoUrl: { required: videoUrlRequired },
    // exerciseUrl: {
    //     required: helpers.withMessage("Vui lòng chọn ảnh", (value) => {
    //         return value instanceof File || (Array.isArray(value) && value.length > 0);
    //     })
    // },
    postedDate: {
        required: helpers.withMessage("Vui lòng chọn ngày", (value) => {
            return value !== null && value !== '';
        })
    }


}));
const $v = useVuelidate(rules, form);


//function thêm 


const formatDate = (date) => {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
}

const handleSubmit = async () => {
    // Chạy tất cả rule validations
    const isValid = await $v.value.$validate();

    // Nếu lỗi thì show lỗi và dừng lại
    if (!isValid) {
        showError("Vui lòng kiểm tra lại thông tin!");
        return;
    }



    // Format payload đúng chuẩn
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

const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const exerciseUrl = await uploadImageToCloudinary(file);
        form.exerciseUrl = exerciseUrl;
        console.log("Upload thành công:", exerciseUrl);
    } catch (err) {
        console.error("Không thể upload ảnh:", err);
    }
};
const handleFileChange1 = (e) => {
    const file = e.target.files[0]
    form.exerciseUrl = file?.name || ''
}

const handleUploadVideo = async (e) => {
    const file = e.target.files[0]
    if (!file) {
        form.videoUrl = null
        $v.value.videoUrl.$touch()
        return
    }

    try {
        const publicId = await createVideo(file.name)
        const url = await uploadVideoSource(publicId, file)

        form.videoUrl = url
        $v.value.videoUrl.$touch()
    } catch (err) {
        console.error('Lỗi upload:', err?.response?.data || err.message)
        showError('Không thể upload video!')
        form.videoUrl = null
        $v.value.videoUrl.$touch()
    }
}





</script>

<style scoped></style>