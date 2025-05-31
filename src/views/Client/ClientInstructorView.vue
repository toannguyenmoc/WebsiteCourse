<template>
    <section class="hero-wrap hero-wrap-2" :style="{ backgroundImage: `url(${banner})` }">
        <div class="overlay"></div>
        <div class="container">
            <div class="row no-gutters slider-text align-items-end justify-content-center">
                <div class="col-md-9 ftco-animate pb-5 text-center">
                    <p class="breadcrumbs"><span class="mr-2"><router-link to="/">Trang chủ <i
                                    class="fa fa-chevron-right"></i></router-link></span> <span>Giáo viên<i
                                class="fa fa-chevron-right"></i></span></p>
                    <h1 class="mb-0 bread">Giáo viên</h1>
                </div>
            </div>
        </div>
    </section>
    <section class="ftco-section bg-light">
        <div class="container">
            <div class="row">
                <div v-for="item in instructors" :key="item"
                    class="col-md-6 col-lg-3 ftco-animate d-flex align-items-stretch">
                    <CardProfileCustom :image="item.image" :name="item.name" :position="item.position"
                        :description="item.description" :link="item.link" :twitter="item.twitter"
                        :facebook="item.facebook" :instagram="item.instagram" />
                </div>
            </div>
            <PaginationCustom />
        </div>
    </section>
</template>

<script setup>
import PaginationCustom from '@/components/Common/PaginationCustom.vue';
import CardProfileCustom from '@/components/Common/CardProfileCustom.vue';
//img banner
import banner from '@/assets/Client/images/bg_2.jpg'
//dữ liệu mẫu
import avata from '@/assets/Client/images/teacher-1.jpg'
const instructors = [
    {
        image: avata,
        name: 'Văn Tèo',
        position: 'Developer',
        description: "Tôi là một người nghiện công việc đầy tham vọng, nhưng ngoài điều đó ra, tôi là người khá đơn giản.",
        link: "#",
        twitter: "https://twitter.com",
        facebook: "https://facebook.com",
        google: "https://google.com",
        instagram: "https://instagram.com"
    },
    {
        image: avata,
        name: 'Văn Tèo',
        position: 'Developer',
        description: "Tôi là một người nghiện công việc đầy tham vọng, nhưng ngoài điều đó ra, tôi là người khá đơn giản.",
        link: "#",
        twitter: "https://twitter.com",
        facebook: "https://facebook.com",
        google: "https://google.com",
        instagram: "https://instagram.com"
    },
    {
        image: avata,
        name: 'Văn Tèo',
        position: 'Developer',
        description: "Tôi là một người nghiện công việc đầy tham vọng, nhưng ngoài điều đó ra, tôi là người khá đơn giản.",
        link: "#",
        twitter: "https://twitter.com",
        facebook: "https://facebook.com",
        google: "https://google.com",
        instagram: "https://instagram.com"
    },
    {
        image: avata,
        name: 'Văn Tèo',
        position: 'Developer',
        description: "Tôi là một người nghiện công việc đầy tham vọng, nhưng ngoài điều đó ra, tôi là người khá đơn giản.",
        link: "#",
        twitter: "https://twitter.com",
        facebook: "https://facebook.com",
        google: "https://google.com",
        instagram: "https://instagram.com"
    },
    {
        image: avata,
        name: 'Văn Tèo',
        position: 'Developer',
        description: "Tôi là một người nghiện công việc đầy tham vọng, nhưng ngoài điều đó ra, tôi là người khá đơn giản.",
        link: "#",
        twitter: "https://twitter.com",
        facebook: "https://facebook.com",
        google: "https://google.com",
        instagram: "https://instagram.com"
    },
    {
        image: avata,
        name: 'Văn Tèo',
        position: 'Developer',
        description: "Tôi là một người nghiện công việc đầy tham vọng, nhưng ngoài điều đó ra, tôi là người khá đơn giản.",
        link: "#",
        twitter: "https://twitter.com",
        facebook: "https://facebook.com",
        google: "https://google.com",
        instagram: "https://instagram.com"
    },
    {
        image: avata,
        name: 'Văn Tèo',
        position: 'Developer',
        description: "Tôi là một người nghiện công việc đầy tham vọng, nhưng ngoài điều đó ra, tôi là người khá đơn giản.",
        link: "#",
        twitter: "https://twitter.com",
        facebook: "https://facebook.com",
        google: "https://google.com",
        instagram: "https://instagram.com"
    },
    {
        image: avata,
        name: 'Văn Tèo',
        position: 'Developer',
        description: "Tôi là một người nghiện công việc đầy tham vọng, nhưng ngoài điều đó ra, tôi là người khá đơn giản.",
        link: "#",
        twitter: "https://twitter.com",
        facebook: "https://facebook.com",
        google: "https://google.com",
        instagram: "https://instagram.com"
    }
]

</script>

<style lang="scss" scoped></style>