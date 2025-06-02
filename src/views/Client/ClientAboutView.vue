<template>
    <div>
        <ClientBanner pageTitle="Về chúng tôi" />
        <section class="ftco-section ftco-about img">
            <div class="container">
                <div class="row d-flex">
                    <div class="col-md-12 about-intro">
                        <div class="row">
                            <div class="col-md-6 d-flex">
                                <div class="d-flex about-wrap">
                                    <div class="img d-flex align-items-center justify-content-center"
                                        :style="{ backgroundImage: `url(${ImgAbout1})` }"></div>
                                    <div class="img-2 d-flex align-items-center justify-content-center"
                                        :style="{ backgroundImage: `url(${ImgAbout})` }"></div>
                                </div>
                            </div>
                            <div class="col-md-6 pl-md-5 py-5">
                                <div class="row justify-content-start pb-3">
                                    <div class="col-md-12 heading-section ">
                                        <span class="subheading">Nâng cao kỹ năng của bạn</span>
                                        <h2 class="mb-4">Học bất cứ điều gì bạn muốn ngay hôm nay</h2>
                                        <p>
                                            Xa nơi dữ liệu trôi chảy và các dòng mã lặng lẽ hoạt động, phía sau những
                                            bức tường firewall vững chắc, tồn tại một thế giới của các lập trình viên
                                            đam mê.
                                            Họ sống trong không gian của GitHub và Stack Overflow, nơi từng dòng lệnh
                                            đều có mục đích và mỗi giải pháp đều là một hành trình học hỏi.
                                            Một dòng chảy gọi là API kết nối họ lại, truyền tải thông tin, cảm hứng và
                                            công nghệ đi khắp mọi nơi.
                                        </p>
                                        <p>
                                            <RouterLink to="/" class="btn btn-primary">Liên hệ với chúng tôi
                                            </RouterLink>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="ftco-section ftco-counter img" id="section-counter"
            :style="{ backgroundImage: `url(${ImgBg4})` }">
            <div class="overlay"></div>
            <div class="container">
                <div class="row">
                    <div class="col-md-3 d-flex justify-content-center counter-wrap ">
                        <div class="block-18 d-flex align-items-center">
                            <div class="icon"><span class="flaticon-online"></span></div>
                            <div class="text">
                                <strong class="number" data-number="400">0</strong>
                                <span>Khóa học trực tuyến</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 d-flex justify-content-center counter-wrap ">
                        <div class="block-18 d-flex align-items-center">
                            <div class="icon"><span class="flaticon-graduated"></span></div>
                            <div class="text">
                                <strong class="number" data-number="4500">0</strong>
                                <span>Học sinh đã ghi danh</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 d-flex justify-content-center counter-wrap ">
                        <div class="block-18 d-flex align-items-center">
                            <div class="icon"><span class="flaticon-instructor"></span></div>
                            <div class="text">
                                <strong class="number" data-number="1200">0</strong>
                                <span>Chuyên gia Giảng viên</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 d-flex justify-content-center counter-wrap ">
                        <div class="block-18 d-flex align-items-center">
                            <div class="icon"><span class="flaticon-tools"></span></div>
                            <div class="text">
                                <strong class="number" data-number="300">0</strong>
                                <span>Thời lượng học</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="ftco-section testimony-section bg-light">
            <div class="overlay" :style="{ backgroundImage: `url(${ImgBg2})` }"></div>
            <div class="container">
                <div class="row pb-4">
                    <div class="col-md-7 heading-section ">
                        <span class="subheading">Lời chứng thực</span>
                        <h2 class="mb-4">Những gì sinh viên nói</h2>
                    </div>
                </div>
            </div>
            <div class="container container-2">
                <div class="row ">
                    <div class="col-md-12">
                        <div class="carousel-testimony owl-carousel">
                            <div class="item" v-for="(item, index) in testimonials" :key="index">
                                <CardStudentCustom 
                                    :content="item.content" 
                                    :name="item.name" 
                                    :position="item.position"
                                    :avatar="item.avatar" 
                                    :rating="item.rating" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="ftco-intro ftco-section ftco-no-pb">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-12 text-center">
                        <div class="img" :style="{ backgroundImage: `url(${ImgBg4})` }">
                            <div class="overlay"></div>
                            <h2>Chúng tôi là StudyLab, một trung tâm học tập trực tuyến</h2>
                            <p>Chúng tôi có thể quản lý tòa nhà mơ ước của bạn Một con sông nhỏ tên là Duden chảy qua
                                nơi của họ</p>
                            <p class="mb-0">
                                <RouterLink to="#" class="btn btn-primary px-4 py-3">Đăng ký ngay</RouterLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="ftco-section services-section">
            <div class="container">
                <div class="row d-flex">
                    <div class="col-md-6 heading-section pr-md-5 d-flex align-items-center ">
                        <div class="w-100 mb-4 mb-md-0">
                            <span class="subheading">Chào mừng đến với StudyLab</span>
                            <h2 class="mb-4">Chúng tôi là StudyLab, một trung tâm học tập trực tuyến</h2>

                            <p>Một dòng chảy kiến thức không ngừng như dòng sông Duden, luôn cập nhật và cung cấp cho
                                bạn những kiến thức công nghệ cần thiết. Đây là nơi lý tưởng để bắt đầu hành trình trở
                                thành lập trình viên chuyên nghiệp.</p>

                            <p>Ở một không gian học tập hiện đại, nơi hội tụ những người yêu công nghệ từ khắp nơi, bạn
                                sẽ cùng nhau khám phá các ngôn ngữ lập trình, thuật toán và kỹ năng phát triển phần mềm.
                                Tất cả đều được tổ chức bài bản và dễ tiếp cận, dù bạn là người mới bắt đầu hay đã có
                                nền tảng.</p>

                            <div class="d-flex video-image align-items-center mt-md-4">
                                <a href="#" class="video img d-flex align-items-center justify-content-center"
                                    :style="{ backgroundImage: `url(${ImgAbout})` }">
                                    <span class="fa fa-play-circle"></span>
                                </a>
                                <h4 class="ml-4">Học bất cứ điều gì từ StudyLab, Xem video</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 d-flex align-self-stretch ">
                                <div class="services">
                                    <div class="icon d-flex align-items-center justify-content-center"><span
                                            class="flaticon-tools"></span>
                                    </div>
                                    <div class="media-body">
                                        <h3 class="heading mb-3">Nội dung chất lượng hàng đầu</h3>
                                        <p>Dòng sông Duden nhỏ bé uốn lượn bên ngôi nhà của họ, mang theo sự mát lành và nguồn năng lượng tươi mới cho cuộc sống.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 d-flex align-self-stretch ">
                                <div class="services">
                                    <div class="icon icon-2 d-flex align-items-center justify-content-center"><span
                                            class="flaticon-instructor"></span></div>
                                    <div class="media-body">
                                        <h3 class="heading mb-3">Giảng viên có trình độ cao</h3>
                                        <p>Một dòng sông nhỏ mang tên Duden lặng lẽ chảy bên ngôi nhà họ, mang đến dòng chảy của kiến thức và cảm hứng.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 d-flex align-self-stretch ">
                                <div class="services">
                                    <div class="icon icon-3 d-flex align-items-center justify-content-center"><span
                                            class="flaticon-quiz"></span></div>
                                    <div class="media-body">
                                        <h3 class="heading mb-3">học đỉnh cao &amp; Quiz mọi lúc</h3>
                                        <p>Một dòng chảy tri thức len lỏi qua không gian học tập, nuôi dưỡng đam mê và phát triển kỹ năng.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 d-flex align-self-stretch ">
                                <div class="services">
                                    <div class="icon icon-4 d-flex align-items-center justify-content-center"><span
                                            class="flaticon-browser"></span></div>
                                    <div class="media-body">
                                        <h3 class="heading mb-3">Nhận chứng nhận</h3>
                                        <p>Dòng chảy tri thức len lỏi qua không gian học tập, nuôi dưỡng hành trình phát triển.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import ClientBanner from "@/components/Client/ClientBanner.vue";
import { RouterLink } from "vue-router";
import ImgAbout1 from "@/assets/Client/images/about-1.jpg"
import ImgAbout from "@/assets/Client/images/about.jpg"
import ImgBg4 from "@/assets/Client/images/bg_4.jpg"
import ImgBg2 from "@/assets/Client/images/bg_2.jpg"
import CardStudentCustom from "@/components/Common/CardStudentCustom.vue";
import { onMounted } from "vue";

const testimonials = [
    {
        content: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
        name: "Trần Minh Khoa",
        position: "Backend Developer",
        avatar: "/images/person_1.jpg",
        rating: 5
    },
    {
        content: "Tôi học được rất nhiều kỹ năng thực tế để ứng dụng vào công việc.",
        name: "Nguyễn Thị Mai",
        position: "Tester",
        avatar: "/images/person_2.jpg",
        rating: 4
    },
    {
        content: "Khóa học bài bản, giao diện đẹp, trải nghiệm tuyệt vời.",
        name: "Phạm Văn Long",
        position: "Fullstack Developer",
        avatar: "/images/person_3.jpg",
        rating: 5
    },
    {
        content: "Khóa học bài bản, giao diện đẹp, trải nghiệm tuyệt vời.",
        name: "Phạm Văn Long",
        position: "Fullstack Developer",
        avatar: "/images/person_3.jpg",
        rating: 5
    },
    {
        content: "Khóa học bài bản, giao diện đẹp, trải nghiệm tuyệt vời.",
        name: "Phạm Văn Long",
        position: "Fullstack Developer",
        avatar: "/images/person_3.jpg",
        rating: 5
    }
]

// onMounted(() => {
//   $('.carousel-testimony').owlCarousel({
//     loop: true,
//     autoplay: true,
//     margin: 30,
//     nav: false,
//     dots: true,
//     items: 4
//   });
// });
</script>

<style scoped></style>
