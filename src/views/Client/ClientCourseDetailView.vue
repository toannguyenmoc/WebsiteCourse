<template>
    <div class="course-session">
        <div class="row banner rounded-3 py-5">
            <div class="col-lg-8 pt-5">
                <h3 class="mt-5">{{ course.title }}</h3>
                <p class="d-inline-block bg-light category text-secondary py-1 px-3">{{ course.typeCourse }}</p>
                <div class="d-flex gap-5 align-items-center">
                    <div class="m-0">
                        <i class="fa fa-user text-primary"></i>
                        Tác giả : {{ course.teacher }}</div>
                    <div class="d-flex gap-2">
                        <i class="fa fa-users  text-primary pt-1"></i> {{ course.numberStudent }} học viên
                    </div>
                    <div class="text-warning d-flex gap-1 align-items-center">

                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <span class="text-secondary">{{ rate }}</span>
                    </div>
                </div>
                <div class="mt-3">
                    <div v-if="course.price > 0" class="d-flex gap-5">
                        <h5 class=" text-danger fw-bold my-2 fs-2" style="text-decoration: line-through;">{{ formatPrice(course.price + 200000)  }}</h5>
                        <h5 class=" text-danger fw-bold my-2 fs-2">{{ formatPrice(course.price) }}</h5>
                    </div>
                    <div v-if="course.price == 0">
                        <div class="my-3">
                            <span class="text-success fw-bold"> Free </span class="text-white"> - Không trả phí!
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <ButtonCustom>Đăng ký ngay</ButtonCustom>
                </div>
            </div>
            <div class="col-lg-4 pt-5 img-course">
                <img :src="course.image" class="img-fluid mt-5" alt="">
            </div>
        </div>

        <!-- course description -->
        <div class="description mt-3 mx-0 py-5 bg-white text-dark">
            <h4 >
                Ngôn ngữ lập trình "BÍ KÍP" vươn mình trong thời đại kỷ nguyên số
            </h4>
            <p >Sự bùng nổ của công nghệ Robot, trí nhân tạo Al dẫn đến sự thay đổi trong các lĩnh vực ngành nghề. CNTT
                trở thành lựa chọn số 1 giúp con người kiểm soát và phát triển các công nghệ đỉnh cao. Để đáp ứng được
                nhu cầu phát triển xã hội, Codelearn xây dựng hệ thống học lập trình trực tuyến nhằm giúp các bạn trẻ &
                người mới bắt đầu dễ dàng tiếp cận với môn học, khơi dậy đam mê công nghệ.</p>
            <img :src="bieuDo" class="my-3">
            <h4 >
                Ngôn ngữ lập trình dễ học
            </h4>
            <p>
                Python được đánh giá là ngôn ngữ lập trình dễ học nhất hiện nay, cú pháp đơn giản và gần gũi với ngôn
                ngữ tự nhiên. Đặc biệt, mã lệnh của python ngắn gọn, dễ đọc và dễ ghi nhớ hơn. So với code Java, code
                Python ngắn hơn tới 3 - 5 lần, thậm chí là 5 - 10 lần so với code C++.
            </p>
            <h5>Ứng dụng rộng rãi và linh hoạt</h5>
            <p>Python có một thư viện tiêu chuấn lớn, chứa nhiều dòng mã có thể tái sử dụng cho hầu hết mọi tác vụ. Nhờ
                đó, các nhà phát triển sẽ không cần phải viết mă từ đầu.</p>
        </div>
        <div class="lesson mt-3 mx-0 pb-5  bg-white rounded-3" id="lesson">
            <h4>Nội dung khóa học</h4>
            <div class="d-flex gap-5">
                <p>{{ totalLesson }} bài học</p>
                <p>28 giờ 47 phút</p>
            </div>
            <div class="card">
                <div class="card-header bg-white">
                    <h5>Tổng quan</h5>
                    <div class="d-flex gap-3 text-primary">
                        <p>
                            <i class="fa fa-book"></i> {{ numberDocument }} Bài đọc
                        </p>
                        <p>
                            <i class="fa fa-video"></i> {{ numberVideo }} Video
                        </p>
                    </div>
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li v-for="(lesson, index) in lessons" :key="lesson.id" class="list-group-item">
                            <p>
                                <a data-toggle="collapse" :href="'#collapse' + lesson.id" role="button"
                                    aria-expanded="false" :aria-controls="'collapse' + lesson.id"
                                    class="text-decoration-none text-dark d-flex justify-content-between">
                                    <span class="lesson-title">{{ lesson.title }}</span>
                                    
                                    <i class="fas fa-chevron-down"></i>
                                </a>
                            </p>
                            <div class="collapse mt-2" :id="'collapse' + lesson.id">
                                <div>
                                    <div class="d-flex justify-content-between">
                                        <a href="#" class="text-decoration-none">
                                            <i class="bi bi-book"></i>
                                            <span>Bài giảng</span>
                                            <p class="text-secondary ms-3">45 phút</p>
                                        </a>
                                        <div>
                                            <a class="text-decoration-none" href="#">Xem ngay</a>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <a target="_blank" :href="lesson.documentUrl" class="text-decoration-none">
                                            <i class="bi bi-journal-code"></i>
                                            <span>Bài học</span>
                                            <p class="text-secondary ms-3">30 phút</p>
                                        </a>
                                        <div>
                                            <a target="_blank" class="text-decoration-none"
                                                :href="lesson.documentUrl">Xem ngay</a>
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
import { ref } from 'vue';
import work1img from '@/assets/Client/images/work-1.jpg'
import bieuDo from '@/assets/Client/images/BieuDo.png'
import ButtonCustom from '@/components/Common/ButtonCustom.vue';


import { useRoute } from 'vue-router'
const route = useRoute()

const slug = route.params.slug
const id = sessionStorage.getItem("courseId");
console.log(id )

const course = {
    typeCourse: 'software',
    title: 'Lập trình Spring boot 3',
    image: work1img,
    teacher: 'Thanh Tài',
    numberStudent: 2000,
    price: 499000
}

const lessons = [
    {
        id: 1,
        title: 'Giới thiệu về Spring Boot',
        documentUrl: 'https://codelearn.io/learning'
    },
    {
        id: 2,
        title: 'Cài đặt môi trường',
        documentUrl: 'https://codelearn.io/learning'
    },
    {
        id: 3,
        title: 'Data binding',
        documentUrl: 'https://codelearn.io/learning'
    },
    {
        id: 4,
        title: 'Đa ngôn ngữ trong Spring boot',
        documentUrl: 'https://codelearn.io/learning'
    },
    {
        id: 5,
        title: 'Xử lí request trong controller',
        documentUrl: 'https://codelearn.io/learning'
    }
]

const rate = ref(5);

const totalLesson = 5;

const numberDocument = 5;
const numberVideo = 5;


const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

</script>

<style scoped>
.banner {
    width: 100vw;
    background-color: rgba(255, 255, 255);
}

.lesson-title{
    font-weight: 500;
}

.banner , .lesson, .description{
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
    .banner, .lesson, .description {
        padding-inline: 150px;
    }
}

@media (max-width: 992px) {
    .banner, .lesson, .description {
        padding-inline: 100px;
    }
}

@media (max-width: 768px) {
    .banner, .lesson, .description {
        padding-inline: 50px;
    }
}

@media (max-width: 576px) {
    .banner, .lesson, .description {
        padding-inline: 20px;
    }
}
</style>