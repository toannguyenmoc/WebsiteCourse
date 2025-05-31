<template>
    <div class="project-wrap">
        <a href="#" class="img" :style="{ backgroundImage: `url(${image})`}" >
            <span class="price">{{ category }}</span>
        </a>
        <div class="text p-4">
            <h3><a href="#">{{ title }}</a></h3>
            <p class="advisor">Giáo viên <span>{{ advisor }}</span></p>
            <ul class="d-flex justify-content-between">
                <li><span class="flaticon-shower"><span class="fa fa-user"></span></span>{{ students }}</li>
                <li class="price">{{formatPrice(price)}}</li>
            </ul>
        </div>
    </div>
</template>
<script setup>
defineProps({
  image: String,
  title: String,
  advisor: String,
  students: Number,
  price: Number,
  category: String
});

const formatPrice = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

</script>
<style scoped>

</style>