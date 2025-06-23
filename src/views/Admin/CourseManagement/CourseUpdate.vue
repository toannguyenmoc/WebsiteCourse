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
                  <button class="btn btn-danger" @click="handleDelete">Xoá</button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleUpdate">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label">Loại Khoá Học</label>
                      <select class="form-select form-control form-control-alternative" v-model="form.courseTypeId">
                        <option disabled value="">-- Chọn loại khoá học --</option>
                        <option v-for="type in courseTypes" :key="type.id" :value="type.id">{{
                          type.name }}</option>
                      </select>
                      <small class="text-danger" v-if="$v.courseTypeId.$error">
                        <span v-if="$v.courseTypeId.required.$invalid">Vui lòng chọn loại khoá
                          học</span>
                      </small>
                    </div>
                    <div class="form-group">
                      <label class="form-control-label" for="course-name">Tên Khoá Học</label>
                      <input type="text" id="course-name" v-model="form.title"
                        class="form-control form-control-alternative" placeholder="Tên khoá học">
                      <small class="text-danger" v-if="$v.title.$error">
                        <span v-if="$v.title.required.$invalid">Tên khoá học không được bỏ
                          trống</span>
                        <span v-else-if="$v.title.isUniqueTitle.$invalid">Tên khoá học đã tồn
                          tại</span>
                      </small>
                    </div>
                    <div class="form-group">
                      <label class="form-control-label" for="preview-slug">Slug</label>
                      <input type="text" id="preview-slug" class="form-control form-control-alternative"
                        v-model="form.slug" readonly @input="$v.slug.$validate()">
                      <small class="text-danger" v-if="$v.slug.$error">
                        <span v-if="$v.slug.isNotDuplicateSlug">Slug đã tồn tại</span>
                      </small>
                    </div>
                    <div class="form-group">
                      <label class="form-control-label" for="unit-price">Giá Tiền</label>
                      <input type="text" id="unit-price" v-model="form.price"
                        class="form-control form-control-alternative" placeholder="Nhập giá tiền">
                      <small class="text-danger" v-if="$v.price.$error">
                        <span v-if="$v.price.required.$invalid">Giá tiền không được bỏ
                          trống</span>
                        <span v-else-if="$v.price.numeric.$invalid">Giá tiền không chứa ký
                          tự</span>
                        <span v-else-if="$v.price.minValue.$invalid">Giá tiền phải lớn hơn
                          0</span>
                        <span v-else-if="$v.price.maxValue.$invalid">Giá tiền phải nhỏ hơn
                          1,000,000,000</span>
                      </small>
                    </div>
                    <div class="form-group">
                      <label class="form-control-label">Trạng Thái</label>
                      <div class="d-flex">
                        <div class="custom-control custom-radio custom-radio-inline">
                          <input class="custom-control-input" type="radio" name="status" id="status-true"
                            :checked="form.status === true" @change="form.status = true" />
                          <label class="custom-control-label" for="status-true">Đang Hoạt Động</label>
                        </div>
                        <div class="custom-control custom-radio custom-radio-inline ml-3">
                          <input class="custom-control-input" type="radio" name="status" id="status-false"
                            :checked="form.status === false" @change="form.status = false" />
                          <label class="custom-control-label" for="status-false">Ngừng Hoạt Động</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="customFileLang">Hình Ảnh</label>
                      <div class="custom-file">
                        <input type="file" class="custom-file-input form-control-alternative" id="customFileLang"
                          @change="handleImageUpload">
                        <label class="custom-file-label" for="customFileLang">Chọn file</label>
                      </div>
                      <small class="text-danger" v-if="$v.image.$error">
                        <span v-if="$v.image.required.$invalid">Vui lòng chọn hình ảnh</span>
                      </small>
                    </div>
                    <div class="form-group mt-3">
                      <label class="form-control-label">Xem Trước Hình Ảnh</label>
                      <div class="image-preview-wrapper" @click="triggerFileInput">
                        <img v-if="previewImage" :src="previewImage" alt="Xem trước ảnh" class="image-preview" />
                        <div v-else class="image-empty-placeholder">
                          <i class="fas fa-image fa-2x mb-2"></i><br>
                          <span>Chưa có hình ảnh</span>
                        </div>
                      </div>
                      <!-- Input file hidden chỉ kích hoạt khi click -->
                      <input ref="hiddenFileInput" type="file" accept="image/*" style="display: none"
                        @change="handleImageUpload" />
                    </div>
                  </div>
                </div>

                <hr class="my-4" />
                <!-- Description -->
                <div class="pl-lg-12">
                  <div class="form-group">
                    <label>Mô tả</label>
                    <textarea rows="4" class="form-control form-control-alternative"
                      placeholder="Mô tả về khoá học của bạn ..." v-model="form.description"></textarea>
                    <small class="text-danger" v-if="$v.description.$error">
                      <span v-if="$v.description.required.$invalid">Mô tả không được bỏ
                        trống</span>
                    </small>
                  </div>
                </div>
                <hr class="my-4" />
                <div class="d-flex justify-content-between">
                  <RouterLink to="/admin/course/list" class="btn btn-secondary">Quay lại</RouterLink>
                  <button class="btn btn-primary">Cập Nhật Khoá học</button>
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
import { useCourses } from '@/composables/useCourses'
import { useCourseTypes } from '@/composables/useCourseTypes'
import { uploadImageToCloudinary } from "@/utils/uploadImageUtils"
import { showSuccess, showError, showConfirm } from '@/assets/Admin/js/alert'
import useVuelidate from '@vuelidate/core';
import { required, minLength, numeric, helpers, minValue, maxValue } from '@vuelidate/validators';

const router = useRouter()
const route = useRoute()
const courseId = route.params.id

const { fetchCourseById, editCourse, removeCourse, fetchAllCourses } = useCourses()
const { fetchAllCourseTypes } = useCourseTypes()

const courseTypes = ref([])

const form = reactive({
  title: '',
  slug: '',
  description: '',
  image: '',
  price: 0,
  createdDate: new Date(),
  status: true,
  accountId: 1,
  courseTypeId: -1,
  commissionId: 1
})

const slugify = (text) =>
  text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")

watch(() => form.title, (newTitle) => {
  form.slug = slugify(newTitle)
  validateSlug()
})

const previewImage = ref(null)
const hiddenFileInput = ref(null)

const triggerFileInput = () => {
  hiddenFileInput.value?.click()
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const imageUrl = await uploadImageToCloudinary(file)
    form.image = imageUrl
    previewImage.value = imageUrl
    console.log("Upload thành công:", imageUrl)
  } catch (err) {
    console.error("Không thể upload ảnh:", err)
  }
}

const formatDate = (date) => {
  const d = new Date(date)
  const day = String(d.getDate() + 1).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

const loadCourse = async () => {
  try {
    const data = await fetchCourseById(courseId)
    if (!data) {
      showError(`Không tìm thấy khoá học với ID ${courseId}`)
      router.push('/admin/course/list')
      return
    }

    form.title = data.title
    form.slug = data.slug
    form.description = data.description
    form.image = data.image
    form.price = data.price
    form.status = data.status
    form.accountId = data.accountId
    form.courseTypeId = data.courseTypeId
    form.commissionId = data.commissionId
    previewImage.value = data.image
  } catch (err) {
    showError("Không thể tải dữ liệu khoá học.")
    console.error("Lỗi loadCourse:", err?.response?.data || err)
  }
}

const handleUpdate = async () => {
  $v.value.$touch(); // Kiểm tra lỗi
  if ($v.value.$error) {
    return;
  }

  const payload = {
    title: form.title,
    slug: form.slug,
    description: form.description,
    image: form.image,
    price: form.price,
    createdDate: formatDate(form.createdDate),
    status: form.status,
    accountId: 1,
    courseTypeId: form.courseTypeId,
    commissionId: 1
  }

  try {
    await editCourse(courseId, payload)
    await showSuccess("Cập nhật thành công!")
    router.push('/admin/course/list')
  } catch (err) {
    showError("Cập nhật thất bại!")
    console.error("Lỗi cập nhật:", err)
  }
}

const handleDelete = async () => {
  const result = await showConfirm({
    title: 'Xác nhận xoá',
    text: 'Bạn sẽ không thể khôi phục dữ liệu này!'
  })
  if (!result.isConfirmed) return

  try {
    await removeCourse(courseId)
    await showSuccess("Đã xoá khoá học!")
    router.push('/admin/course/list')
  } catch (err) {
    showError("Lỗi khi xoá khoá học!")
    console.error("Lỗi xoá:", err)
  }
}

onMounted(async () => {
  courseTypes.value = await fetchAllCourseTypes()
  await loadCourse()
})

const isDuplicateSlug = ref(false)

// Kiểm tra slug có bị trùng hay không
const validateSlug = async () => {
  try {
    const allCourses = await fetchAllCourses()
    const currentSlug = form.slug.trim().toLowerCase()

    const isDuplicated = allCourses.some(c =>
      c.slug.toLowerCase() === currentSlug && c.id !== parseInt(courseId)
    )

    isDuplicateSlug.value = isDuplicated
  } catch (err) {
    console.error("Lỗi khi kiểm tra slug:", err)
    isDuplicateSlug.value = false
  }
}

const rules = {
  title: { required },
  slug: { isNotDuplicateSlug: helpers.withMessage('Slug đã tồn tại!', () => !isDuplicateSlug.value) },
  image: { required },
  description: { required },
  price: { required, numeric, minValue: minValue(0), maxValue: maxValue(1000 * 1000 * 1000) },
  courseTypeId: { required }
};

// Sử dụng Vuelidate
const $v = useVuelidate(rules, form);

</script>

<style scoped>
.image-preview-wrapper {
  height: 300px;
  border: 1px dashed #bbb;
  border-radius: 6px;
  padding: 10px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.image-preview-wrapper:hover {
  border-color: #5e72e4;
}

.image-preview {
  width: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.image-empty-placeholder {
  text-align: center;
  color: #999;
  font-size: 14px;
}
</style>