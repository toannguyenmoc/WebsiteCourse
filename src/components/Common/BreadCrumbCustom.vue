<template>
    <div>
        <p class="breadcrumbs">
            <span class="mr-2">
                <RouterLink to="/">Trang chủ <i class="fa fa-chevron-right"></i></RouterLink>
            </span> 
            <span>{{ pageTitle }} <i class="fa fa-chevron-right"></i></span>
        </p>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
  pageTitle: {
    type: String,
    required: true
  }
});

</script>

<style lang="scss" scoped></style>