<template>
    <div class="project-wrap">
        <RouterLink :to="`/course-detail/${slug}`" @click="setCourseId" class="img" :style="{ backgroundImage: `url(${image})`}" >
            <span class="price">{{ category }}</span>
        </RouterLink>
        <div class="text p-4">
            <h3><RouterLink :to="`/course-detail/${slug}`" @click="setCourseId">{{ title }}</RouterLink></h3>
            <p class="advisor">Giáo viên <span>{{ advisor }}</span></p>
            <ul class="d-flex justify-content-between">
                <li><span class="flaticon-shower"><span class="fa fa-user"></span></span>{{ students }}</li>
                <li class="price">{{formatPrice(price)}}</li>
            </ul>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
  image: String,
  title: String,
  advisor: String,
  students: Number,
  price: Number,
  category: String,
  slug: String, 
  id: Number
});

const formatPrice = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
const setCourseId = () => {
  sessionStorage.setItem("courseId", props.id);
};

</script>
<style scoped>

</style>