<template>
    <ClientBanner pageTitle="Khoá học" />
    <section class="ftco-section bg-light">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 sidebar">
                    <div class="sidebar-box bg-white ">
                        <form @submit.prevent="" class="search-form">
                            <div class="form-group">
                                <!-- <span class="icon fa fa-search tran"></span> -->
                                <input v-model="keyword" type="text" class="form-control" placeholder="Tìm kiếm..." />
                            </div>
                        </form>
                    </div>
                    <SidebarBoxCustom data-aos="fade-up" v-model:model-value="listTypeId" :options="listCourseType" />
                </div>
                <div class="col-lg-9">
                    <div class="row">
                        <div v-for="item in listCourse" :key="item.id" class="col-md-6 d-flex align-items-stretch ">
                            <CardProductCustom :id="item.id" :slug="item.slug" :image="item.image" :title="item.title"
                                :advisor="item.accountTeacher" :students="item.lessonCount" :price="item.price"
                                :category="item.courseTypeName" />
                        </div>
                    </div>
                    <div class="text-center">
                        <PaginationCustom :total-page="totalPages" v-model:current-page="currentPage" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import InputSearchCustom from '@/components/Common/InputSearchCustom.vue';
import SidebarBoxCustom from '@/components/Common/SidebarBoxCustom.vue';
import CardProductCustom from '@/components/Common/CardProductCustom.vue';
import PaginationCustom from '@/components/Common/PaginationCustom.vue';
import ClientBanner from '@/components/Client/ClientBanner.vue';
import { ref, watch } from 'vue';
import { useCourses } from '@/composables/useCourses';
import { useCourseTypes } from '@/composables/useCourseTypes';
const listTypeId = ref([]);
const keyword = ref('');
const listCourse = ref([]);
const listCourseType = ref([]);
const {
    courseTypes,
    fetchAllCourseTypes
} = useCourseTypes();
fetchAllCourseTypes();

watch(courseTypes, () => {
    listCourseType.value = courseTypes.value.filter(t => t.status)
})

const {
    courses,
    fetchCourses,
    currentPage,
    totalPages,
} = useCourses();
fetchCourses(0, 6);

watch(courses, () => {
    listCourse.value = courses.value.filter(c => c.status);
})

watch(listTypeId, () => {
    currentPage.value = 0; // reset về trang đầu
});
watch(keyword, () => {
  currentPage.value = 0; // reset về trang đầu khi thay đổi từ khóa
});


watch([listTypeId, () => currentPage.value,()=> keyword.value], () => {
    if (listTypeId.value.length === 0 && keyword.value == '') {
        fetchCourses(currentPage.value, 6);
    } else {
        fetchCourses(currentPage.value, 6, keyword.value, null, null, listTypeId.value);
    }
});
</script>

<style scoped></style>