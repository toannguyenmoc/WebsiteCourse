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
                                                <small class="text-danger" v-if="$v.title.$error">
                                                    <span v-if="$v.title.required.$invalid">Tên khoá học không được bỏ trống</span>
                                                    <span v-else-if="$v.title.isUniqueTitle.$invalid">Tên khoá học đã tồn tại</span>
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="preview-slug">Slug</label>
                                                <input type="text" id="preview-slug"
                                                    class="form-control form-control-alternative" 
                                                    v-model="form.slug"
                                                    readonly
                                                    @input="$v.slug.$validate()">
                                                <small class="text-danger" v-if="$v.slug.$error">
                                                    <span v-if="$v.slug.isNotDuplicateSlug">Slug đã tồn tại</span>
                                                </small>
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="">Loại Khoá Học</label>
                                                <select class="form-select form-control form-control-alternative"
                                                    v-model="form.courseTypeId" aria-label="Default select example">
                                                    <option disabled value="" selected>-- Chọn loại khoá học --
                                                    </option>
                                                    <option v-for="type in courseTypes" :key="type.id" :value="type.id">
                                                        {{ type.name }}
                                                    </option>
                                                </select>
                                                <small class="text-danger" v-if="$v.courseTypeId.$error">
                                                    <span v-if="$v.courseTypeId.required.$invalid">Vui lòng chọn loại khoá học</span>
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="form-group">
                                                <label class="form-control-label" for="">Chiết khấu</label>
                                                <select class="form-select form-control form-control-alternative"
                                                    v-model="form.commissionId" aria-label="Default select example">
                                                    <option disabled value="" selected>-- Chọn ngày áp dụng --
                                                    </option>
                                                    <option v-for="c in commissions" :key="c.id" :value="c.id">
                                                        {{ c.effectiveDate }}
                                                    </option>
                                                </select>
                                                <small class="text-danger" v-if="$v.commissionId.$error">
                                                    <span v-if="$v.commissionId.required.$invalid">Vui lòng chọn ngày áp dụng</span>
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="form-group">
                                                <label class="form-control-label" for="percentage">Phần trăm chiết
                                                    khấu</label>
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
                                                <input type="text" min="10000" step="1000" id="unit-price"
                                                    v-model="form.price" class="form-control form-control-alternative"
                                                    placeholder="Nhập giá tiền">
                                                <small class="text-danger" v-if="$v.price.$error">
                                                    <span v-if="$v.price.required.$invalid">Giá tiền không được bỏ trống</span>
                                                    <span v-else-if="$v.price.numeric.$invalid">Giá tiền không chứa ký tự</span>
                                                    <span v-else-if="$v.price.minValue.$invalid">Giá tiền phải lớn hơn 0</span>
                                                    <span v-else-if="$v.price.maxValue.$invalid">Giá tiền phải nhỏ hơn 1,000,000,000</span>
                                                </small>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <label class="form-control-label" for="">Hình Ảnh</label>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input form-control-alternative"
                                                    id="customFileLang" @change="handleImageUpload">
                                                <label class="custom-file-label" for="customFileLang">Chọn file</label>
                                            </div>
                                            <small class="text-danger" v-if="$v.image.$error">
                                                <span v-if="$v.image.required.$invalid">Vui lòng chọn hình ảnh</span>
                                            </small>
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
                                        <small class="text-danger" v-if="$v.description.$error">
                                            <span v-if="$v.description.required.$invalid">Mô tả không được bỏ trống</span>
                                        </small>
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
import useVuelidate from '@vuelidate/core';
import { required, minLength, numeric, helpers, minValue, maxValue } from '@vuelidate/validators';

const router = useRouter()
const { addCourse, checkSlugExistence } = useCourses()
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
    courseTypeId: '',
    price: '',
    image: '',
    description: '',
    createdDate: new Date(),
    status: true,
    accountId: 1,
    commissionId: ''
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
    const day = String(d.getDate() + 1).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
}

// Submit form thêm khoá học
const handleSubmit = async () => {

    $v.value.$touch(); // Kiểm tra lỗi
    if ($v.value.$error) {
        return;
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

// Validation rules

const checkDate = helpers.withMessage(
    "",
    (value) => {
        if (!value) {
            return false;
        }
        return new Date(value) > new Date();
    }
);

const isDuplicateSlug = ref(false)
let checkSlugTimeout = null

const checkSlugDebounced = (slug) => {
  clearTimeout(checkSlugTimeout)
  checkSlugTimeout = setTimeout(async () => {
    if (!slug || !slug.trim()) {
      isDuplicateSlug.value = false
      return
    }
    const exists = await checkSlugExistence(slug)
    isDuplicateSlug.value = exists
  }, 500)
}

watch(() => form.slug, (newSlug) => {
  checkSlugDebounced(newSlug)
})

const rules = {
    title: { required },
    slug: { isNotDuplicateSlug: helpers.withMessage('Slug đã tồn tại!', () => !isDuplicateSlug.value) },
    image: { required },
    description: { required },
    price: { required, numeric, minValue: minValue(0), maxValue: maxValue(1000*1000*1000)},
    courseTypeId: { required },
    commissionId: { required }
};

// Sử dụng Vuelidate
const $v = useVuelidate(rules, form);


</script>



<style scoped></style>