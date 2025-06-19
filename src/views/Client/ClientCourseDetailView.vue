<template>
    <div class="course-session">
        <div class="row banner rounded-3 py-5">
            <div class="col-lg-8 pt-5">
                <h3 class="mt-5">{{ useCourse.title }}</h3>
                <p class="d-inline-block bg-light category text-secondary py-1 px-3">{{ useCourse.courseTypeName }}</p>
                <div class="d-flex gap-5 align-items-center">
                    <div class="m-0">
                        <i class="fa fa-user text-primary"></i>
                        Tác giả : {{ useCourse.accountTeacher }}</div>
                    <!-- <div class="d-flex gap-2">
                        <i class="fa fa-users  text-primary pt-1"></i> {{ course.numberStudent }} học viên
                    </div> -->
                    <div class="text-warning d-flex gap-1 align-items-center">
<!-- 
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i> -->
                        <span class="text-secondary">{{ Number(useCourse.totalRating).toFixed(1) }}</span>
                        <i class="fa fa-star"></i>
                    </div>
                </div>
                <div class="mt-3">
                    <div v-if="useCourse.price > 0" class="d-flex gap-5">
                        <!-- <h5 class=" text-danger fw-bold my-2 fs-2" style="text-decoration: line-through;">{{ formatPrice(course.price + 200000)  }}</h5> -->
                        <h5 class=" text-danger fw-bold my-2 fs-2">{{ formatPrice(useCourse.price) }}</h5>
                    </div>
                    <div v-if="useCourse.price == 0">
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
                <img :src="useCourse.image" class="img-fluid mt-5" alt="">
            </div>
        </div>

        <!-- course description -->
        <div class="description mt-3 mx-0 py-5 bg-white text-dark">
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
                            <i class="fa fa-book"></i> {{ lessons.length }} Bài đọc
                        </p>
                        <!-- <p>
                            <i class="fa fa-video"></i> {{ numberVideo }} Video
                        </p> -->
                    </div>
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li v-for="lesson in lessons" :key="lesson.id" class="list-group-item">
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
                                        <RouterLink :to="`/lesson/${lesson.id}`" class="text-decoration-none">
                                            <i class="bi bi-book"></i>
                                            <span>{{ lesson.title }}</span>
                                            <p class="text-secondary ms-3">{{ lesson.description }}</p>
                                        </RouterLink>
                                        <div>
                                            <RouterLink :to="`/lesson/${lesson.id}`" class="text-decoration-none">Xem ngay</RouterLink>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <a target="_blank" :href="lesson.exerciseUrl" class="text-decoration-none">
                                            <i class="bi bi-journal-code"></i>
                                            <span>Bài tập</span>
                                            <!-- <p class="text-secondary ms-3">30 phút</p> -->
                                        </a>
                                        <div>
                                            <a target="_blank" class="text-decoration-none"
                                                :href="lesson.exerciseUrl">Xem ngay</a>
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
import ButtonCustom from '@/components/Common/ButtonCustom.vue';
import { useCourses } from '@/composables/useCourses';
import { getData } from '@/services/apiMiddleware';
const lessons = ref([]);
const id = ref(0);
const useCourse = ref({});
const {
    course,
    fetchCourseById
} = useCourses();

id.value = sessionStorage.getItem("courseId");
watch(course, ()=>{
    useCourse.value = course.value
})

onMounted(async() => {
  try {
    id.value = sessionStorage.getItem("courseId");
    await fetchCourseById(id.value);
    const data = await getData("/lesson", {courseId: id.value, page: 0, size: 999});
    lessons.value = data.data.filter(ls => ls.status).sort((a, b) => a.lesson - b.lesson);
  } catch (error) {
    console.log(error);
  } 
});


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