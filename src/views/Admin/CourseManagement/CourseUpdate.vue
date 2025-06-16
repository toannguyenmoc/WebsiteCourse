<template>
    <div>
        <div class="mt--7">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <div class="card bg-light shadow">
                        <div class="card-header bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Cập Nhật Khoá Học</h3>
                                </div>
                                <div class="col-4 text-right">
                                    <button class="btn btn-danger">Xoá</button>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="handleUpdate">
                                <div class="pl-lg-4">
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
                                                    placeholder="Nhập giá tiền" value="">
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <label class="form-control-label" for="">Hình Ảnh</label>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input form-control-alternative" id="customFileLang">
                                                <label class="custom-file-label" for="customFileLang">Chọn file</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <!-- Description -->
                                <div class="pl-lg-4">
                                    <div class="form-group">
                                        <label>Mô tả</label>
                                        <textarea rows="4" class="form-control form-control-alternative"
                                            placeholder="Mô tả về khoá học của bạn ..." v-model="form.description"></textarea>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <div class="d-flex justify-content-between">
                                    <RouterLink to="/admin/course/list" class="btn btn-secondary">Quay lại</RouterLink>
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
import { ref, reactive, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useCourses } from '@/composables/useCourses'

const router = useRouter()
const route = useRoute()
const courseId = route.params.id

// Composable để gọi API
const { fetchCourseById, editCourse, removeCourse } = useCourses()

// Danh sách loại khoá học
const courseTypes = ref([])

// Form hiển thị và cập nhật
const form = reactive({
  title: '',
  slug: '',
  description: '',
  price: '',
  image: '',
  status: true,
  courseTypeId: '',
  accountId: 2,
  commissionId: 1
})

// Sinh slug tự động khi nhập tiêu đề
const slugify = (text) =>
  text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

// Tự cập nhật slug khi đổi tiêu đề
watch(() => form.title, (newTitle) => {
  if (newTitle) {
    form.slug = slugify(newTitle)
  }
})

// Fetch loại khoá học và dữ liệu khoá học khi mounted
onMounted(async () => {
  await loadCourseTypes()
  await loadCourse()
})

const loadCourseTypes = async () => {
  try {
    const res = await axios.get('/api/course-types')
    courseTypes.value = res.data
  } catch (err) {
    console.error('Lỗi lấy loại khoá học:', err)
  }
}

const loadCourse = async () => {
  try {
    const data = await fetchCourseById(courseId)
    if (!data) {
      alert('Không tìm thấy khoá học! ' + courseId)
      router.push('/admin/course/list')
      return
    }
    Object.assign(form, data)
  } catch (err) {
    console.error('Lỗi khi tải dữ liệu khoá học:', err)
  }
}

const handleUpdate = async () => {
  try {
    await editCourse(courseId, { ...form })
    alert('Cập nhật thành công!')
    router.push('/admin/course/list')
  } catch (err) {
    alert('Cập nhật thất bại!')
    console.error(err)
  }
}

const handleDelete = async () => {
  if (!confirm(`Bạn chắc chắn muốn xoá "${form.title}"?`)) return
  try {
    await removeCourse(courseId)
    alert('Đã xoá khoá học!')
    router.push('/admin/course/list')
  } catch (err) {
    alert('Lỗi khi xoá khoá học!')
    console.error(err)
  }
}

// Lấy tên file ảnh nếu chọn mới
const handleFileChange = (e) => {
  const file = e.target.files[0]
  form.image = file?.name || ''
}
</script>



<style scoped></style>