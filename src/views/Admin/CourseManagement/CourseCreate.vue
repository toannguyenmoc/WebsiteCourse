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
                                                    <option disabled value="-1" selected>-- Chọn loại khoá học --
                                                    </option>
                                                    <option v-for="type in courseTypes" :key="type.id" :value="type.id">
                                                        {{ type.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="form-group">
                                                <label class="form-control-label" for="">Chiết khấu</label>
                                                <select class="form-select form-control form-control-alternative"
                                                    v-model="form.commissionId" aria-label="Default select example">
                                                    <option disabled value="-1" selected>-- Chọn ngày áp dụng --</option>
                                                    <option v-for="c in commissions" :key="c.id" :value="c.id">
                                                        {{ c.effectiveDate }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="form-group">
                                                <label class="form-control-label" for="percentage">Phần trăm chiết khấu</label>
                                                <input type="text" id="percentage"
                                                    class="form-control form-control-alternative" 
                                                    :value="selectedCommission ? selectedCommission.percentage + '%' : '0%'"
                                                    disabled>
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
                                                    id="customFileLang" @change="handleImageUpload">
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
import { RouterLink } from 'vue-router'
import { showSuccess, showError } from '@/assets/Admin/js/alert'
import { onMounted, reactive, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCourses } from '@/composables/useCourses'
import { useCourseTypes } from '@/composables/useCourseTypes'
import { useCommissions } from '@/composables/useCommissions'
import { uploadImageToCloudinary } from "@/utils/uploadImageUtils";

const router = useRouter()
const { addCourse } = useCourses()
const { fetchAllCourseTypes } = useCourseTypes()
const { fetchAllCommissions } = useCommissions()

const courseTypes = ref([])
const commissions = ref([])

onMounted(async () => {
  courseTypes.value = await fetchAllCourseTypes()
  commissions.value = await fetchAllCommissions()
})

const slugify = (text) =>
  text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

const form = reactive({
  title: '',
  slug: '',
  courseTypeId: -1,
  price: 0,
  image: '',
  description: '',
  createdDate: new Date(),
  status: true,
  accountId: 1,
  commissionId: -1
})

// Slug tự động theo title
watch(() => form.title, (newTitle) => {
  form.slug = slugify(newTitle)
})

const selectedCommission = computed(() => {
  return commissions.value.find(c => c.id === form.commissionId)
})

// Format ngày sang dd/MM/yyyy
const formatDate = (date) => {
  const d = new Date(date)
  const day = String(d.getDate()+1).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

// Submit form thêm khoá học
const handleSubmit = async () => {
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
    image: form.image,
    description: form.description,
    price: form.price,
    createdDate: formatDate(form.createdDate),
    status: form.status,
    accountId: 1,
    courseTypeId: form.courseTypeId,
    commissionId: form.commissionId
  }

  try {
    await addCourse(payload)

    await showSuccess("Thêm thành công!")
    router.push('/admin/course/list')
  } catch (err) {
    showError("Thêm thất bại!")
    console.error("Lỗi khi thêm khoá học:")
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