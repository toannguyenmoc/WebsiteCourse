<template>
    <ClientBanner pageTitle="Khoá học"/>
    <section class="ftco-section bg-light">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 sidebar">
                    <InputSearchCustom />
                    <div v-for="item in courses" :key="item">
                        <SidebarBoxCustom :title="item.nameCourseCourse" :options="item.list" />
                    </div>
                </div>
                <div class="col-lg-9">
                    <div class="row">
                        <div v-for="item in cardProducts" :key="item"
                            class="col-md-6 d-flex align-items-stretch ">
                            <CardProductCustom :image="item.image" :title="item.title" :advisor="item.advisor"
                                :students="item.students" :price="item.price" :category="item.category" />
                        </div>
                    </div>
                    <div class="text-center">
                        <PaginationCustom />
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
//img banner
import banner from '@/assets/Client/images/bg_2.jpg'
//dữ liệu mẫu sidebar
const courses = [
    {
        nameCourseCourse: "Lập trình",
        list: [
            { label: "Lập trình Frontend", value: "frontend" },
            { label: "Lập trình Backend", value: "backend" },
            { label: "Lập trình Fullstack", value: "fullstack" }
        ]
    },
    {
        nameCourseCourse: "Thiết kế",
        list: [
            { label: "Thiết kế Đồ họa", value: "graphic-design" },
            { label: "Thiết kế Web", value: "web-design" },
            { label: "Thiết kế UX/UI", value: "ux-ui-design" }
        ]
    },
    {
        nameCourseCourse: "Marketing",
        list: [
            { label: "Marketing Online", value: "online-marketing" },
            { label: "SEO online-marketing", value: "seo " },
            { label: "Content Marketing", value: "content-marketing" }
        ]
    }
]
//ảnh mẩu card
import image from '@/assets/Client/images/work-2.jpg';
//dữ liệu mẫu cho CardProductCustom
const cardProducts = [
    {
        image: image,
        title: "Lập trình Frontend",
        advisor: "Nguyễn Văn A",
        students: 100,
        price: 2000000,
        category: "Lập trình"
    },
    {
        image: image,
        title: "Lập trình Backend",
        advisor: "Trần Thị B",
        students: 150,
        price: 2500000,
        category: "Lập trình"
    },
    {
        image: image,
        title: "Lập trình Fullstack",
        advisor: "Nguyễn Văn C",
        students: 200,
        price: 3000000,
        category: "Lập trình"
    },
    {
        image: image,
        title: "Lập trình Mobile",
        advisor: "Lê Thị D",
        students: 120,
        price: 2200000,
        category: "Lập trình"
    },
    {
        image: image,
        title: "Lập trình Game",
        advisor: "Phạm Văn E",
        students: 80,
        price: 1800000,
        category: "Lập trình"
    },
    {
        image: image,
        title: "Lập trình AI",
        advisor: "Nguyễn Thị F",
        students: 90,
        price: 2700000,
        category: "Lập trình"
    },
];

</script>

<style scoped>

</style>