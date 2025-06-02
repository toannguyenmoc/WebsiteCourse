<template>
    <ClientBanner pageTitle="Giáo viên"/>
    <section class="ftco-section bg-light">
        <div class="container">
            <div class="row">
                <div v-for="item in instructors" :key="item"
                    class="col-md-6 col-lg-3 d-flex align-items-stretch">
                    <CardProfileCustom :image="item.image" :name="item.name" :position="item.position"
                        :description="item.description" :link="item.link" :twitter="item.twitter"
                        :facebook="item.facebook" :instagram="item.instagram" />
                </div>
            </div>
            <div class="text-center">
                <PaginationCustom />
            </div>
        </div>
    </section>
</template>

<script setup>
import PaginationCustom from '@/components/Common/PaginationCustom.vue';
import CardProfileCustom from '@/components/Common/CardProfileCustom.vue';
//img banner
import ClientBanner from '@/components/Client/ClientBanner.vue';
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