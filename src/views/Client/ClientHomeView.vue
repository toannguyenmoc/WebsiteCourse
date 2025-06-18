<template>
    <!-- banner -->
    <div class="hero-wrap h-100 py-5" :style="{ backgroundImage: `url(${bgImg})` }">
        <div class="container">
            <div class="row no-gutters slider-text align-items-center" data-scrollax-parent="true">
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
                    <div v-for="(item) in listCourseType" :key="item.id" class="col-md-3 col-lg-2">
                        <CircleImageCustom :image="item.image" :name="item.name" :courses="item.totalCourse" />
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
                <div class="col-md-12 heading-section text-center">
                    <span class="subheading">Bắt đầu học hôm nay</span>
                    <h2 class="mb-4">Chọn khóa học của bạn</h2>
                </div>
            </div>
            <div class="row">
                <div data-aos="fade-up" v-for="(course) in listCourse" class="col-md-4 ">
                    <CardProductCustom :id="course.id" :slug="course.slug" :category="course.courseTypeName" :advisor="course.accountTeacher" :image="course.image"
                        :students="course.lessonCount" :price="course.price" :title="course.title">
                    </CardProductCustom>
                </div>
            </div>
        </div>
    </section>

</template>

<script setup>
import bgImg from '@/assets/Client/images/bg_1.jpg'

import CircleImageCustom from '@/components/Common/CircleImageCustom.vue';
import CardProductCustom from '@/components/Common/CardProductCustom.vue'

import { RouterLink } from 'vue-router';
import { ref, watch } from 'vue';
import { useCourseTypes } from '@/composables/useCourseTypes'
import { useCourses } from '@/composables/useCourses'
const listCourse = ref([]);
const listCourseType = ref([]);
const {
    courseTypes,
    fetchAllCourseTypes
} = useCourseTypes();
fetchAllCourseTypes();
watch(courseTypes, () =>{
    listCourseType.value = courseTypes.value.filter( t => t.status);
    listCourseType.value = listCourseType.value.slice(0, 6);
})


const {
    courses,
    fetchAllCourses
} = useCourses();
fetchAllCourses()
watch(courses, ()=>{
    listCourse.value = courses.value.filter(c => c.status);
    listCourse.value = listCourse.value.slice(0, 6);
})

</script>

<style scoped>
.content {
    margin-top: 48vh;
}
</style>