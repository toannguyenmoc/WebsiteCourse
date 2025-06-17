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
                <div class="pl-lg-12">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="course-name">Tên Khoá Học</label>
                        <input type="text" id="course-name" v-model="form.title"
                          class="form-control form-control-alternative" placeholder="Tên khoá học" />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="preview-slug">Slug</label>
                        <input type="text" id="preview-slug" class="form-control form-control-alternative"
                          :value="form.slug" disabled />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">Loại Khoá Học</label>
                        <select class="form-select form-control form-control-alternative" v-model="form.courseTypeId">
                          <option disabled value="-1">-- Chọn loại khoá học --</option>
                          <option v-for="type in courseTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="form-group">
                        <label class="form-control-label">Chiết khấu</label>
                        <select class="form-select form-control form-control-alternative" v-model="form.commissionId">
                          <option disabled value="-1">-- Chọn ngày áp dụng --</option>
                          <option v-for="c in commissions" :key="c.id" :value="c.id">
                            {{ c.effectiveDate }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="form-group">
                        <label class="form-control-label">Phần trăm chiết khấu</label>
                        <input type="text" class="form-control form-control-alternative"
                          :value="selectedCommission ? selectedCommission.percentage + '%' : '0%'" disabled />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">Giá Tiền</label>
                        <input type="number" min="10000" step="1000" v-model="form.price"
                          class="form-control form-control-alternative" placeholder="Nhập giá tiền" />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <label class="form-control-label">Hình Ảnh</label>
                      <div class="custom-file">
                        <input type="file" class="custom-file-input form-control-alternative" id="customFileLang"
                          @change="handleImageUpload" />
                        <label class="custom-file-label" for="customFileLang">Chọn file</label>
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="my-4" />
                <div class="pl-lg-12">
                  <div class="form-group">
                    <label>Mô tả</label>
                    <textarea rows="4" class="form-control form-control-alternative" placeholder="Mô tả về khoá học..."
                      v-model="form.description"></textarea>
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
import { ref, reactive, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showSuccess, showError, showConfirm, showAlert } from '@/assets/Admin/js/alert'
import { useCourses } from '@/composables/useCourses'
import { useCourseTypes } from '@/composables/useCourseTypes'
import { useCommissions } from '@/composables/useCommissions'
import { uploadImageToCloudinary } from "@/utils/uploadImageUtils";

const router = useRouter()
const route = useRoute()
const courseId = route.params.id

const { fetchCourseById, editCourse, removeCourse } = useCourses()
const { fetchAllCourseTypes } = useCourseTypes()
const { fetchAllCommissions } = useCommissions()

const courseTypes = ref([])
const commissions = ref([])

// Slug 
const slugify = (text) =>
  text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")

// Format date gửi string kiểu dd/MM/yyyy
const formatDate = (date) => {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

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
  commissionId: -1
})

watch(() => form.title, (newTitle) => {
  form.slug = slugify(newTitle)
})

// Xác định chiết khấu đang chọn
const selectedCommission = computed(() => {
  return commissions.value.find(c => c.id === form.commissionId)
})

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
    form.createdDate = data.createdDate
    form.accountId = data.accountId
    form.courseTypeId = data.courseTypeId
    form.commissionId = data.commissionId

  } catch (err) {
    showError("Không thể tải dữ liệu khoá học.")
    console.error("Lỗi loadCourse:", err?.response?.data || err)
  }
}

onMounted(async () => {
  courseTypes.value = await fetchAllCourseTypes()
  commissions.value = await fetchAllCommissions()
  await loadCourse()
})

const handleUpdate = async () => {
  if (
    form.courseTypeId === -1 ||
    form.commissionId === -1 ||
    !form.title.trim() ||
    !form.price
  ) {
    showError("Vui lòng điền đầy đủ thông tin.")
    return
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
    commissionId: form.commissionId 
  }

  try {
    await editCourse(courseId, payload)
    await showSuccess("Cập nhật thành công!")
    router.push('/admin/course/list')
  } catch (err) {
    showError("Cập nhật thất bại!")
    console.error("Lỗi cập nhật")
  }
}

const handleDelete = async () => {
  const result = await showConfirm({ title: 'Xác nhận xoá', text: 'Bạn sẽ không thể khôi phục dữ liệu này!'})
  if (!result.isConfirmed) return

  try {
    await removeCourse(courseId)
    await showSuccess("Đã xoá khoá học!")
    router.push('/admin/course/list')
  } catch (err) {
    showError("Lỗi khi xoá khoá học!")
    console.error("Lỗi xoá")
  }
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const imageUrl = await uploadImageToCloudinary(file);
    form.image = imageUrl;
    console.log("Upload thành công:", imageUrl);
  } catch (err) {
    console.error("Không thể upload ảnh:", err);
  }
};
</script>




<style scoped></style>