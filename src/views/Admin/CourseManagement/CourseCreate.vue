<template>
    <div>
        <div class="mt--7">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <div class="card bg-light shadow">
                        <div class="card-header bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Thêm Khoá Học</h3>
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
                                                <label class="form-control-label" for="course-name">Tên Khoá Học</label>
                                                <input type="text" id="course-name" v-model="form.title"
                                                    class="form-control form-control-alternative"
                                                    placeholder="Tên khoá học" value="">
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="preview-slug">Slug</label>
                                                <input type="text" id="preview-slug"
                                                    class="form-control form-control-alternative" :value="form.slug"
                                                    disabled>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="">Loại Khoá Học</label>
                                                <select class="form-select form-control form-control-alternative"
                                                    v-model="form.courseTypeId" aria-label="Default select example">
                                                    <option disabled value="-1" selected>-- Chọn loại khoá học --</option>
                                                    <option v-for="type in courseTypes" :key="type.id" :value="type.id">
                                                        {{ type.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="unit-price">Giá Tiền</label>
                                                <input type="number" min="10000" step="1000" id="unit-price"
                                                    v-model="form.price" class="form-control form-control-alternative"
                                                    placeholder="Nhập giá tiền">
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <label class="form-control-label" for="">Hình Ảnh</label>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input form-control-alternative"
                                                    id="customFileLang" @change="handleFileChange">
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
                                            placeholder="Mô tả về khoá học của bạn ..."
                                            v-model="form.description"></textarea>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <div class="d-flex justify-content-between">
                                    <RouterLink to="/admin/course/list" class="btn btn-secondary">Quay lại</RouterLink>
                                    <button class="btn btn-primary">Thêm Khoá học</button>
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
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCourses } from '@/composables/useCourses'

const router = useRouter()
const { addCourse } = useCourses()

const slugify = (text) =>
    text.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")

const form = reactive({
    title: '',
    slug: '',
    courseTypeId: "-1",
    price: '',
    image: '',
    description: '',
    status: true,
    accountId: 1,
    commissionId: 1
})

watch(() => form.title, (newTitle) => {
    form.slug = slugify(newTitle)
})

const handleSubmit = async () => {
    const payload = { ...form }
    try {
        await addCourse(payload)
        alert('Tạo khóa học thành công!')
        router.push('/admin/course/list')
    } catch (err) {
        alert('Lỗi khi tạo khoá học')
        console.error(err)
    }
}

const handleFileChange = (e) => {
    const file = e.target.files[0]
    form.value.image = file?.name || ''
}
</script>


<style scoped></style>