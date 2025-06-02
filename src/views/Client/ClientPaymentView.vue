<template>
    <ClientBanner pageTitle="Thanh toán"/>
    <section class="ftco-section bg-light">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
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
                <div class="col-lg-4">
                    <div class="card p-4">
                        <h5><strong>Phương thức thanh toán</strong></h5>
                        <div class="row">
                            <div class="col-6 mb-3">
                                <label for="qr"
                                    class="payment-option d-block d-flex flex-column justify-content-center align-items-center">
                                    <img src="https://codelearn.io/images/payment/vietqr_3.png" class="mx-auto my-auto"
                                        alt="VietQR" width="50">
                                    <span class="d-block">VietQR</span>
                                    <input id="qr" type="radio" name="payment" checked>
                                </label>
                            </div>
                            <div class="col-6 mb-3">
                                <label for="banking"
                                    class="payment-option  d-flex flex-column justify-content-center align-items-center">
                                    <img src="https://codelearn.io/images/payment/mobilebanking_3.png" alt="VietQR"
                                        width="50">
                                    <span class="d-block">Banking</span>
                                    <input id="banking" type="radio" name="payment">
                                </label>
                            </div>
                        </div>
                        <h5><strong>Tổng tiền</strong></h5>
                        <ul class="list-group mb-3">
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Tổng tiền</span>
                                <strong>{{ formatPrice(payment.price) }}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span><strong>Tổng thanh toán</strong></span>
                                <strong class="text-primary">{{ formatPrice(payment.price) }}</strong>
                            </li>
                        </ul>
                        <ButtonCustom variant="primary">Thanh toán</ButtonCustom>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import ButtonCustom from '@/components/Common/ButtonCustom.vue';
import ClientBanner from '@/components/Client/ClientBanner.vue';
//img banner
import banner from '@/assets/Client/images/bg_2.jpg'

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
.payment-option {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 12px;
    text-align: center;
    cursor: pointer;
    height: 100px;
}

.payment-option input {
    position: absolute;
    top: 7px;
    right: 19px;
}

.payment-option.selected {
    border-color: #007bff;
}
</style>