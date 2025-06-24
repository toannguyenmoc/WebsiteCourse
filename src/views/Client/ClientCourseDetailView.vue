<template>
    <div class="course-session">
        <div class="row container mx-auto pt-5 mt-5">
            <div class="col-lg-8">
                <div class="row bg-gradient-indigo rounded py-3">
                    <div class="col-lg-5 h-100 my-auto overflow-hidden">
                        <img :src="useCourse.image" class="rounded w-100 h-100" alt="img">
                    </div>
                    <div class="py-2 px-3 col-lg-6">
                        <h3 class="text-white">{{ useCourse.title }}</h3>
                        <p class="text-white text-truncate">{{ useCourse.description }}</p>
                        <p class="d-inline-block bg-light category text-secondary py-1 px-3 mr-2">{{
                            useCourse.courseTypeName }}</p>
                        <div class="d-inline-flex gap-1 align-items-center">
                            <span class="text-white">{{ Number(useCourse.totalRating).toFixed(1) }}</span>
                            <i class="fa fa-star text-yellow"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 p-0 pl-2">
                <div class="card p-2 px-4">
                    <div class="mt-3">
                        <div v-if="useCourse.price > 0 && !check" class="d-flex gap-5">
                            <h5 v-if="useCourse.discount" class=" text-danger fw-bold my-2 fs-2"
                                style="text-decoration: line-through;">{{ formatPrice(useCourse.price +
                                    useCourse.discount) }}</h5>
                            <h5 class=" text-danger fw-bold my-2 fs-2">{{ formatPrice(useCourse.price) }}</h5>
                        </div>
                        <div v-if="useCourse.price == 0">
                            <div class="my-3">
                                <span class="text-success fw-bold"> Free </span class="text-white"> - Không trả phí!
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="">
                        <h4>Thông tin khóa học</h4>
                        <span>Số bài học: {{ lessons.length }}</span><br>
                        <span>Tác giả: {{ useCourse.accountTeacher }}</span>
                    </div>
                    <hr>
                    <button v-if="!check && useCourse.price != 0" @click="payment" class="btn btn-primary">Đăng ký ngay</button>
                    <RouterLink v-if="check || useCourse.price === 0" :to="lessons.length > 0 ? `/lesson/${lessons[0].id}` : `/course-detail/${useCourse.slug}`" class="btn btn-primary">Vào học ngay</RouterLink>
                </div>
            </div>
        </div>

        <!-- course description -->
        <div class="description mt-3 mx-0 py-2 bg-white text-dark">
            {{ useCourse.description }}
        </div>
        <div class="lesson mt-3 mx-0 pb-5  bg-white rounded-3" id="lesson">
            <h4>Nội dung khóa học</h4>
            <div class="d-flex gap-5">
                <p>{{ lessons.length }} bài học</p>
                <!-- <p>28 giờ 47 phút</p> -->
            </div>
            <div class="card">
                <div class="card-header bg-white">
                    <h5>Tổng quan</h5>
                    <div class="d-flex gap-3 text-primary">
                        <p>
                            <i class="fa fa-book"></i> {{ lessons.length }} Bài học
                        </p>
                    </div>
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li v-for="lesson in lessons" :key="lesson.id" class="list-group-item">
                            <p>
                                <a data-toggle="collapse" :href="'#collapse' + lesson.id" role="button"
                                    aria-expanded="false" :aria-controls="'collapse' + lesson.id"
                                    class="text-decoration-none text-dark d-flex justify-content-between">
                                    <span class="lesson-title">{{ lesson.lesson }}. {{ lesson.title }}</span>
                                    <i class="fas fa-chevron-down"></i>
                                </a>
                            </p>
                            <div class="collapse mt-2" :id="'collapse' + lesson.id">
                                <div>
                                    <div class="d-flex justify-content-between">
                                        <div class="text-decoration-none">
                                            <i class="bi bi-book"></i>
                                            <span> {{ lesson.title }}</span>
                                            <p class="text-secondary ms-3">{{ lesson.description }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>


</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useCourses } from '@/composables/useCourses';
import { getData, postData } from '@/services/apiMiddleware';
import { useRoute, useRouter, } from 'vue-router';
import { showError, showSuccess } from '@/assets/Admin/js/alert';
const lessons = ref([]);
const route = useRoute();
const router = useRouter();
const id = ref(0);
const useCourse = ref({});
const check = ref(false);
///
const accountId = sessionStorage.getItem('accountId');
let paymentStatus = route.query.vnp_TransactionStatus;

const {
    course,
    fetchCourseById
} = useCourses();

id.value = sessionStorage.getItem("courseId");
watch(course, () => {
    useCourse.value = course.value
})


onMounted(async () => {
    try {
        id.value = sessionStorage.getItem("courseId");
        await fetchCourseById(id.value);
        const data = await getData("/lesson", { courseId: id.value, page: 0, size: 999 });
        lessons.value = data.data.filter(ls => ls.status).sort((a, b) => a.lesson - b.lesson);
        await checkCoursePayment();
        if (paymentStatus) {
            await create();
        }
    } catch (error) {
        console.log(error);
    }
});


//tao ma don hang
const generateOrderId = () => {
    const timestamp = Date.now(); // thời gian tính bằng ms
    const random = Math.floor(Math.random() * 1000);
    //Them account id
    return `ORDER_${1}_${useCourse.value.id}_${timestamp}${random}`;
}

const payment = async () => {
    const amount = useCourse.value.price - (useCourse.value.discount || 0);
    const orderInfo = generateOrderId();
    try {
        const res = await getData(`/vnpay-payment`, {
            amount: amount,
            orderInfo: orderInfo
        });
        if (res) {
            window.location.href = res;
        }
    } catch (err) {
        console.error("Lỗi khi thanh toán:", err);
    }
};
const create = async () => {
    try {
        const data = {
            totalAmount: route.query.vnp_Amount / 100,
            discount: 0,
            transactionCode: route.query.vnp_OrderInfo,
            accountId: route.query.vnp_OrderInfo.split("_")[1],
            courseId: route.query.vnp_OrderInfo.split("_")[2],
        }
        const res = await postData('/payment' + window.location.search,data);
        if (res) {
            await checkCoursePayment();
            await showSuccess('Thanh toán thành công!');
        }else{
            await showError('Thanh toán thất bại!')
        }
        await router.push('/course-detail/' + useCourse.value.slug);
    } catch (error) {
        console.log(error);
    }
}

const checkCoursePayment = async () => {
    try {
        const result = await getData('payment/check/course', {
            accountId: 1,
            courseId: id.value
        });
        check.value = result;
    } catch (error) {
        console.error("Lỗi kiểm tra thanh toán khóa học:", error);
        check.value = false;
    }
}


const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
</script>

<style scoped>
.banner {
    width: 100vw;
    background-color: rgba(255, 255, 255);
}

.lesson-title {
    font-weight: 500;
}

.banner,
.lesson,
.description {
    padding-inline: 200px;
}

.gap-5 {
    gap: 2.5rem;
}

.gap-3 {
    gap: 1rem;
}

.gap-2 {
    gap: 0.5rem;
}

.gap-1 {
    gap: 0.25rem;
}

.category {
    border-radius: 0.1rem;
    font-weight: 500;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
        rgba(56, 90, 105, 0.32) 0px 2px 4px 0px;
}

.img-course img {
    box-shadow: rgba(31, 81, 102, 0.12) 0px 2px 4px 0px,
        rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}

@media (max-width: 1200px) {

    .banner,
    .lesson,
    .description {
        padding-inline: 150px;
    }
}

@media (max-width: 992px) {

    .banner,
    .lesson,
    .description {
        padding-inline: 100px;
    }
}

@media (max-width: 768px) {

    .banner,
    .lesson,
    .description {
        padding-inline: 50px;
    }
}

@media (max-width: 576px) {

    .banner,
    .lesson,
    .description {
        padding-inline: 20px;
    }
}

.truncate-3-lines {
    display: -webkit-box !important;
    -webkit-line-clamp: 3 !important;
    line-clamp: 3 !important;
    /* Số dòng muốn hiển thị */
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}
</style>