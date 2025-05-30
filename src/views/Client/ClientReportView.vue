<template>
    <section class="hero-wrap hero-wrap-2" :style="{ backgroundImage: `url(${banner})` }">
        <div class="overlay"></div>
        <div class="container">
            <div class="row no-gutters slider-text align-items-end justify-content-center">
                <div class="col-md-9 ftco-animate pb-5 text-center">
                    <BreadCrumbCustom :page-title="'Báo cáo'" />
                    <h1 class="mb-0 bread">Báo cáo vi phạm</h1>
                </div>
            </div>
        </div>
    </section>
    <section class="ftco-section bg-light">
        <div class="container">
            <form class="report-form">
                <h2>🚩 Báo Cáo Video Vi Phạm</h2>
                <div class="form-group">
                    <div class="card mb-3 w-100">
                        <div class="row no-gutters">
                            <div class="col-md-4 p-2">
                                <img :src="payment.image" alt="..." class="w-100">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <RouterLink to="#" class="card-title h5">{{ payment.title }}</RouterLink>
                                    <p class="card-text">
                                        Giáo viên: <span class="text-primary">{{ payment.teacher }}</span><br>
                                        Số lượng bài học: <span class="text-primary">{{ payment.lessons }}</span><br>
                                        Đánh giá: <span class="text-primary">{{ payment.rating }}/5</span>
                                    </p>
                                    <p class="card-text h6">{{ formatPrice(payment.price) }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="reason">Lý do báo cáo</label>
                    <select class="form-control" id="reason" name="reason" required>
                        <option value="">-- Chọn lý do --</option>
                        <option value="copyright">Vi phạm bản quyền</option>
                        <option value="violence">Nội dung bạo lực</option>
                        <option value="sexual">Nội dung nhạy cảm / khiêu dâm</option>
                        <option value="spam">Spam / lừa đảo</option>
                        <option value="hate">Ngôn từ thù ghét</option>
                        <option value="other">Khác...</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="description">Chi tiết</label>
                    <textarea class="form-control" id="description" name="description" rows="4"
                        placeholder="Ví dụ: thời điểm vi phạm, nội dung cụ thể..."></textarea>
                </div>
                <div class="form-group">
                    <label for="email">Email của bạn(khi cần liên hệ)</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="email@gmail.com"
                        required>
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-danger btn-block">Gửi Báo Cáo</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script setup>
import BreadCrumbCustom from '@/components/Common/BreadCrumbCustom.vue';
//img banner
import banner from '@/assets/Client/images/bg_2.jpg'
//img dữ liệu mẫu productproduct
import imgp from '@/assets/Client/images/work-9.jpg'
//dữ liệu mẫu product
const product = {
    image: imgp,
    title: "Lập trình Frontend",
    advisor: "Nguyễn Văn A",
    students: "1000",
    price: "1100",
    category: "Báo cáo"
};
//du liệu mẫu
const payment = {
    title: "Lập trình C",
    image: "/src/assets/Client/images/work-6.jpg",
    teacher: "Nguyễn Văn A",
    lessons: 10,
    rating: 4.5,
    price: 88888
}

const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
</script>

<style scoped>
.report-form h2 {
    text-align: center;
    margin-bottom: 25px;
    font-weight: bold;
    color: #333;
}
</style>