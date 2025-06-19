<template>
    <ClientBanner pageTitle="Báo cáo" />
    <section class="ftco-section bg-light">
        <div class="container">
            <form class="report-form" @submit.prevent="create">
                <h2>🚩 Báo Cáo Video Vi Phạm</h2>
                <div class="form-group">
                    <div class="card mb-3 w-100">
                        <div class="row no-gutters">
                            <div class="col-md-4 p-2">
                                <img :src="getCourse.image" alt="..." class="w-100">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <RouterLink :to="`/course-detail/${getCourse.id}`" class="card-title h5">{{
                                        getCourse.title }}</RouterLink>
                                    <p class="card-text">
                                        Giáo viên: <span class="text-primary">{{ getCourse.accountTeacher }}</span><br>
                                        Số lượng bài học: <span class="text-primary">{{ getCourse.lessonCount
                                        }}</span><br>
                                        Đánh giá: <span class="text-primary">{{ Number(getCourse.totalRating).toFixed(1)
                                        }}/5
                                            <i class="fa fa-star text-yellow"></i>

                                        </span>
                                    </p>
                                    <p class="card-text text-danger fw-bold my-2 fs-2">{{ formatPrice(getCourse.price)
                                    }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <!-- <div class="form-group">
                    <label for="email">Bài học</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="email@gmail.com"
                        required>
                    </div> -->
                    <label for="reason">Lý do báo cáo</label>
                    <select :class="{'border border-danger' : v$.reason.$error}" v-model="form.reason" @change="handleReasonChange" class="form-control" id="reason"
                        name="reason" >
                        <option value="">-- Chọn lý do --</option>
                        <option value="Vi phạm bản quyền">Vi phạm bản quyền</option>
                        <option value="Nội dung bạo lực">Nội dung bạo lực</option>
                        <option value="Nội dung nhạy cảm / khiêu dâm">Nội dung nhạy cảm / khiêu dâm</option>
                        <option value="Spam / lừa đảo">Spam / lừa đảo</option>
                        <option value="Ngôn từ thù ghét">Ngôn từ thù ghét</option>
                        <option value="Khác">Khác...</option>
                    </select>
                    <small class="text-danger" v-if="v$.reason.$error">
                        <span v-if="v$.reason.$error">{{ v$.reason.$errors[0].$message }}</span>
                    </small>
                </div>
                <div class="form-group"  v-if="isOrther">
                    <label for="email">Lý do khác</label>
                    <input :class="{'border border-danger' : v$.orther.$error}" v-model="form.orther" type="text" class="form-control" id="orther" name="orther"
                        placeholder="Thêm lý do..." >
                         <small class="text-danger" v-if="v$.orther.$error">
                        <span v-if="v$.orther.$error">{{ v$.orther.$errors[0].$message }}</span>
                    </small>
                </div>
                <div class="form-group">
                    <label for="description">Chi tiết</label>
                    <textarea :class="{'border border-danger':v$.description.$error}" v-model="form.description" class="form-control" id="description" name="description"
                        rows="4" placeholder="Ví dụ: thời điểm vi phạm, nội dung cụ thể..."></textarea>
                                     <small class="text-danger" v-if="v$.description.$error">
                        <span v-if="v$.description.$error">{{ v$.description.$errors[0].$message }}</span>
                    </small>
                </div>

                <div class="text-center">
                    <button type="submit" class="btn btn-danger btn-block">Gửi Báo Cáo</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script setup>
import ClientBanner from '@/components/Client/ClientBanner.vue';
import { useCourses } from '@/composables/useCourses';
import { useReports } from '@/composables/useReports';
import { computed, ref, watch } from 'vue';
import { showError, showSuccess } from '@/assets/Admin/js/alert';
import { required, minLength, helpers } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const { course, fetchCourseById } = useCourses();
const getCourse = ref({});
const courseId = sessionStorage.getItem("courseId");
const { addReport } = useReports();
const isOrther = ref(false);

const form = ref({
    reason: '',
    description: '',
    accountId: 1,
    courseId: courseId,
    orther: ''
});

fetchCourseById(courseId);
watch(course, () => {
    getCourse.value = course.value;
});

const create = async () => {
    const isValid = await v$.value.$validate();
    if (!isValid) {
        showError("Gửi thất bại! Vui lòng kiểm tra lại thông tin.");
        return;
    }
    try {
        if (isOrther.value && form.value.orther) {
            form.value.reason = form.value.orther;
        }
        await addReport(form.value);

        showSuccess("Cảm ơn bạn đã báo cáo!");
        // Reset form
        form.value.reason = '';
        form.value.description = '';
        form.value.orther = '';
        isOrther.value = false;
        v$.value.$reset();
    } catch (error) {
        showError("Gửi thất bại!");
        console.log(error);
    }
};

const handleReasonChange = () => {
    isOrther.value = form.value.reason === "Khác";
    if (!isOrther.value) {
        form.value.orther = '';
    }
};

const rules = computed(() => {
    return {
        reason: {
            required: helpers.withMessage("Vui lòng chọn lý do báo cáo!", required)
        },
        description: {
            required: helpers.withMessage("Vui lòng nhập lý do chi tiết!", required)
        },
        orther: isOrther.value
            ? {
                required: helpers.withMessage("Vui lòng nhập lý do khác!", required),
                minLength: helpers.withMessage("Lý do phải ít nhất 3 ký tự!", minLength(3))
            }
            : {}
    };
});
const v$ = useVuelidate(rules, form);

const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
</script>

<style scoped>
.report-form h2 {
    text-align: center;
    margin-bottom: 25px;
    font-weight: bold;
    color: #333;
}
</style>