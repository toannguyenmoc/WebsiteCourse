<template>
    <!-- banner -->
    <div class="hero-wrap h-100 py-5" :style="{ backgroundImage: `url(${bgImg})` }">
        <div class="container">
            <div class="row no-gutters slider-text align-items-center"  data-scrollax-parent="true">
                <div data-aos="fade-up" class="col-md-7 content">
                    <span class="subheading">Chào mừng đến DevCourse</span>
                    <h1 class="mb-4">Chúng tôi là nền tảng trực tuyến để học tập</h1>
                    <p class="caps">Nơi học lập trình uy tính và chất lượng cho học viên và hỗ trợ
                        việc giảng dạy cho giáo viên</p>
                    <p class="mb-0">
                        <RouterLink to="/course" class="btn btn-primary">Khóa học</RouterLink>
                        <RouterLink to="/blog" class="btn btn-white">Tìm hiểu</RouterLink>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <section class="ftco-section">
        <div class="container">
            <div class="row justify-content-center pb-4">
                <div data-aos="fade-up" class="col-md-12 heading-section text-center ">
                    <span class="subheading">Bắt đầu học hôm nay</span>
                    <h2 class="mb-4">Danh mục khóa học trực tuyến</h2>
                </div>
            </div>
            <div class="row justify-content-center">
                <div v-for="(typeCourse, index) in typeCourses" class="col-md-3 col-lg-2">
                    <CircleImageCustom :image="typeCourse.image" :name="typeCourse.typeCourse"
                        :courses="typeCourse.numberCourse"></CircleImageCustom>
                </div>

                <div class="col-md-12 text-center mt-5">
                    <RouterLink to="/course" class="btn btn-secondary">Xem khóa học</RouterLink>
                </div>
            </div>
        </div>
    </section>

    <section class="ftco-section bg-light">
        <div class="container">
            <div data-aos="fade-up" class="row justify-content-center pb-4">
                <div  class="col-md-12 heading-section text-center">
                    <span class="subheading">Bắt đầu học hôm nay</span>
                    <h2 class="mb-4">Chọn khóa học của bạn</h2>
                </div>
            </div>
            <div class="row">
                <div data-aos="fade-up" v-for="(course, index) in courses" class="col-md-4 ">
                    <CardProductCustom :category="course.typeCourse" :advisor="course.teacher" :image="course.image"
                        :students="course.numberStudent" :price="course.price" :title="course.title"></CardProductCustom>
                </div>
            </div>
        </div>
    </section>

</template>

<script setup>
import bgImg from '@/assets/Client/images/bg_1.jpg'
import work1img from '@/assets/Client/images/work-1.jpg'
import work2img from '@/assets/Client/images/work-2.jpg'
import work4img from '@/assets/Client/images/work-4.jpg'
import work5img from '@/assets/Client/images/work-5.jpg'
import work6img from '@/assets/Client/images/work-6.jpg'
import work3img from '@/assets/Client/images/work-3.jpg'

import CircleImageCustom from '@/components/Common/CircleImageCustom.vue';
import CardProductCustom from '@/components/Common/CardProductCustom.vue'

import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const typeCourses = ref([
    { typeCourse: 'software', numberCourse: 10, image: work1img },
    { typeCourse: 'programming', numberCourse: 10, image: work2img },
    { typeCourse: 'data structure', numberCourse: 10, image: work3img },
    { typeCourse: 'design', numberCourse: 10, image: work4img },
    { typeCourse: 'game', numberCourse: 10, image: work5img },
    { typeCourse: 'software', numberCourse: 10, image: work6img }
])

const courses = ref([
    { typeCourse: 'software', title: 'Lập trình Spring boot 3', image: work1img, teacher: 'Thanh Tài', numberStudent: 2000, price: 499000 },
    { typeCourse: 'software', title: 'Lập trình Spring boot 3', image: work2img, teacher: 'Thanh Tài', numberStudent: 2000, price: 499000 },
    { typeCourse: 'software', title: 'Lập trình Spring boot 3', image: work3img, teacher: 'Thanh Tài', numberStudent: 2000, price: 499000 },
    { typeCourse: 'software', title: 'Lập trình Spring boot 3', image: work4img, teacher: 'Thanh Tài', numberStudent: 2000, price: 499000 },
    { typeCourse: 'software', title: 'Lập trình Spring boot 3', image: work5img, teacher: 'Thanh Tài', numberStudent: 2000, price: 499000 },
    { typeCourse: 'software', title: 'Lập trình Spring boot 3', image: work6img, teacher: 'Thanh Tài', numberStudent: 2000, price: 499000 },
])

</script>

<style scoped>
.content {
    margin-top: 48vh;
}
</style>