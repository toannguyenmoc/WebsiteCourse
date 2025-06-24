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
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label class="form-control-label">Loại Khoá Học</label>
                                            <select class="form-select form-control form-control-alternative"
                                                v-model="form.courseTypeId">
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
                                                class="form-control form-control-alternative"
                                                placeholder="Tên khoá học">
                                            <small class="text-danger" v-if="$v.title.$error">
                                                <span v-if="$v.title.required.$invalid">Tên khoá học không được bỏ
                                                    trống</span>
                                                <span v-else-if="$v.title.isUniqueTitle.$invalid">Tên khoá học đã tồn
                                                    tại</span>
                                            </small>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-control-label" for="preview-slug">Slug</label>
                                            <input type="text" id="preview-slug"
                                                class="form-control form-control-alternative" v-model="form.slug"
                                                readonly @input="$v.slug.$validate()">
                                            <small class="text-danger" v-if="$v.slug.$error">
                                                <span v-if="$v.slug.isNotDuplicateSlug">Slug đã tồn tại</span>
                                            </small>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-control-label" for="unit-price">Giá Tiền</label>
                                            <input type="text" id="unit-price" v-model="form.price"
                                                class="form-control form-control-alternative"
                                                placeholder="Nhập giá tiền">
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
                                                    <input class="custom-control-input" type="radio" name="status"
                                                        id="status-true" :checked="form.status === true"
                                                        @change="form.status = true" />
                                                    <label class="custom-control-label" for="status-true">Đang Hoạt
                                                        Động</label>
                                                </div>
                                                <div class="custom-control custom-radio custom-radio-inline ml-3">
                                                    <input class="custom-control-input" type="radio" name="status"
                                                        id="status-false" :checked="form.status === false"
                                                        @change="form.status = false" />
                                                    <label class="custom-control-label" for="status-false">Ngừng Hoạt
                                                        Động</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label class="form-control-label" for="customFileLang">Hình Ảnh</label>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input form-control-alternative"
                                                    id="customFileLang" @change="handleImageUpload">
                                                <label class="custom-file-label" for="customFileLang">Chọn file</label>
                                            </div>
                                            <small class="text-danger" v-if="$v.image.$error">
                                                <span v-if="$v.image.required.$invalid">Vui lòng chọn hình ảnh</span>
                                            </small>
                                        </div>
                                        <div class="form-group mt-3">
                                            <label class="form-control-label">Xem Trước Hình Ảnh</label>
                                            <div class="image-preview-wrapper" @click="triggerFileInput">
                                                <img v-if="previewImage" :src="previewImage" alt="Xem trước ảnh"
                                                    class="image-preview" />
                                                <div v-else class="image-empty-placeholder">
                                                    <i class="fas fa-image fa-2x mb-2"></i><br>
                                                    <span>Chưa có hình ảnh</span>
                                                </div>
                                            </div>
                                            <!-- Input file hidden chỉ kích hoạt khi click -->
                                            <input ref="hiddenFileInput" type="file" accept="image/*"
                                                style="display: none" @change="handleImageUpload" />
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
                                            <span v-if="$v.description.required.$invalid">Mô tả không được bỏ
                                                trống</span>
                                        </small>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <div class="d-flex justify-content-between">
                                    <RouterLink to="/teacher/course/list" class="btn btn-secondary">Quay lại</RouterLink>
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
import { getUserId } from '@/utils/getUserIdUtils'

const router = useRouter()
const { addCourse, fetchAllCourses } = useCourses()
const { fetchAllCourseTypes } = useCourseTypes()
const { fetchAllCommissions } = useCommissions()

const courseTypes = ref([])
const commissions = ref([])
const previewImage = ref(null)
const hiddenFileInput = ref(null)
const userId = getUserId()

console.log(userId);

onMounted(async () => {
    courseTypes.value = await fetchAllCourseTypes()
    commissions.value = await fetchAllCommissions()

    form.commissionId = findValidCommissionId(commissions.value, form.createdDate);
})

const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`);
};

const findValidCommissionId = (commissionsList, createdDate) => {
    const created = new Date(createdDate); 

    const valid = commissionsList.filter(c => {
        const effDate = parseDate(c.effectiveDate);
        return effDate <= created;
    });

    return valid.length > 0 ? valid[0].id : '';
};


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
    validateSlug()
})

// Format ngày sang dd/MM/yyyy
const formatDate = (date) => {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
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
        createdDate: form.createdDate,
        status: form.status,
        accountId: userId,
        courseTypeId: form.courseTypeId,
        commissionId: form.commissionId
    }

    try {
        await addCourse(payload)

        await showSuccess("Thêm thành công!")
        router.push('/teacher/course/list')
    } catch (err) {
        showError("Thêm thất bại!")
        console.error("Lỗi khi thêm khoá học:")
    }
}

const triggerFileInput = () => {
    hiddenFileInput.value.click();
};

const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const imageUrl = await uploadImageToCloudinary(file);
        form.image = imageUrl;
        previewImage.value = imageUrl;
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

const validateSlug = async () => {
    try {
        const allCourses = await fetchAllCourses()
        const currentSlug = form.slug.trim().toLowerCase()

        isDuplicateSlug.value = allCourses.some(c => c.slug.toLowerCase() === currentSlug)
    } catch (err) {
        console.error("Lỗi kiểm tra slug:", err)
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
