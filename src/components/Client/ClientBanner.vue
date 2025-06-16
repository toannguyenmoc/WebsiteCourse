<template>
    <div >
        <section class="hero-wrap hero-wrap-2" :style="{ backgroundImage: `url(${ImgBanner})`}">
            <div class="overlay"></div>
            <div data-aos="fade-up" class="container">
                <div class="row no-gutters slider-text align-items-end justify-content-center">
                    <div class="col-md-9 pb-5 text-center">
                        <BreadCrumbCustom :page-title="pageTitle" />
                        <h1 class="mb-0 bread">{{ pageTitle }}</h1>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import BreadCrumbCustom from '../Common/BreadCrumbCustom.vue';
import ImgBanner from '@/assets/Client/images/bg_2.jpg'

const props = defineProps({
  pageTitle: {
    type: String,
    required: true
  }
});

</script>

<style lang="scss" scoped>

</style>