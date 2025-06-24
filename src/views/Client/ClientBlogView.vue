<template>
  <div>
    <ClientBanner pageTitle="Blog" />
    <section class="ftco-section bg-light">
      <div class="container">
        <div class="row d-flex">
          <CardBlogCustom data-aos="fade-up" v-for="(blog, index) in blogs" :key="index" 
            :image="blog.image" 
            :title="blog.title"
            :description="blog.description" 
            :date="blog.date" 
            :author="blog.author" 
            :comments="blog.comments"
            :link="blog.link" />
          <div class="mx-auto">
            <!-- <PaginationCustom /> -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import ClientBanner from "@/components/Client/ClientBanner.vue";
import CardBlogCustom from "@/components/Common/CardBlogCustom.vue";
import PaginationCustom from "@/components/Common/PaginationCustom.vue";

const blogs = [
  {
    image: new URL('@/assets/Client/images/image_1.jpg', import.meta.url).href,
    title: 'Tôi không sáng tạo, có nên học lập trình?',
    description: 'Khóa học giúp bạn từ số 0 trở thành người tự tin với tư duy logic và kỹ năng lập trình.',
    date: '29/05/2025',
    author: 'Admin',
    comments: 3,
    link: '/bai-viet/khoa-hoc-cho-nguoi-moi'
  },
  {
    image: new URL('@/assets/Client/images/image_2.jpg', import.meta.url).href,
    title: 'Lập trình viên cần những kỹ năng gì?',
    description: 'Tìm hiểu những kỹ năng mềm và kỹ thuật mà nhà tuyển dụng đánh giá cao.',
    date: '28/05/2025',
    author: 'Admin',
    comments: 5,
    link: '/bai-viet/ky-nang-lap-trinh'
  },
  {
    image: new URL('@/assets/Client/images/image_3.jpg', import.meta.url).href,
    title: 'Lộ trình học lập trình cho người mới',
    description: 'Tổng hợp các bước học hiệu quả từ căn bản đến nâng cao.',
    date: '27/05/2025',
    author: 'Admin',
    comments: 7,
    link: '/bai-viet/lo-trinh-hoc-lap-trinh'
  },
  {
    image: new URL('@/assets/Client/images/image_3.jpg', import.meta.url).href,
    title: 'Lộ trình học lập trình cho người mới',
    description: 'Tổng hợp các bước học hiệu quả từ căn bản đến nâng cao.',
    date: '27/05/2025',
    author: 'Admin',
    comments: 7,
    link: '/bai-viet/lo-trinh-hoc-lap-trinh'
  },
  {
    image: new URL('@/assets/Client/images/image_3.jpg', import.meta.url).href,
    title: 'Lộ trình học lập trình cho người mới',
    description: 'Tổng hợp các bước học hiệu quả từ căn bản đến nâng cao.',
    date: '27/05/2025',
    author: 'Admin',
    comments: 7,
    link: '/bai-viet/lo-trinh-hoc-lap-trinh'
  },
  {
    image: new URL('@/assets/Client/images/image_3.jpg', import.meta.url).href,
    title: 'Lộ trình học lập trình cho người mới',
    description: 'Tổng hợp các bước học hiệu quả từ căn bản đến nâng cao.',
    date: '27/05/2025',
    author: 'Admin',
    comments: 7,
    link: '/bai-viet/lo-trinh-hoc-lap-trinh'
  }
]

</script>

<style scoped></style>