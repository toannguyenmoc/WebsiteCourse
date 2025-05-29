<template>
    <div>
        <a href="#" class="course-category img d-flex align-items-center justify-content-center" :style="{
            backgroundImage: `url(${image})`, width: width,
            height: height
        }">
            <div class="text w-100 text-center">
                <h3>{{ name }}</h3>
                <span>{{ courses }}</span>
            </div>
        </a>
    </div>
</template>
<script setup>
defineProps({
    image: String,
    name: String,
    courses: Number,
    width: String,
    height:String
});

</script>
<style></style>