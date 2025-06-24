<template>
    <section class="ftco-section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <div class="wrapper">
                        <div class="row no-gutters">
                            <div class="col-lg-8 col-md-7 order-md-last d-flex align-items-stretch">
                                <div class="contact-wrap w-100 p-md-5 p-4">
                                    <h3 class="mb-4">Thông tin</h3>
                                    <p>Bạn đã tham gia từ : {{ formatDate(user.registeredDate) }}</p>
                                    <form method="POST" id="contactForm" name="contactForm" class="contactForm"
                                        @submit.prevent="updateUser">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group mb-0">
                                                    <label class="label" for="name">Họ tên</label>
                                                    <input type="text" class="form-control" name="name" id="name"
                                                        placeholder="Họ tên" v-model="user.fullname">
                                                </div>

                                                <small class="text-danger" v-if="$v.fullname.$error">
                                                    <span v-if="$v.fullname.required.$invalid">Họ tên không được bỏ
                                                        trống</span>
                                                    <span v-if="$v.fullname.minLength.$invalid">Họ tên ít nhất 6 ký
                                                        tự.</span>
                                                </small>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group mb-0">
                                                    <label class="label" for="email">Email</label>
                                                    <input type="email" class="form-control" name="email" id="email"
                                                        disabled placeholder="Email" v-model="user.email">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group mb-0">
                                                    <label class="label" for="birthday">Ngày sinh</label>
                                                    <input type="date" class="form-control" name="birthday"
                                                        id="birthday" placeholder="Subject" v-model="user.birthday">
                                                </div>

                                                <small class="text-danger" v-if="$v.birthday.$error">
                                                    <span v-if="$v.birthday.isAdult.$invalid">Phải đủ 18 tuổi trở
                                                        lên</span>
                                                </small>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="label" for="birthday">Giới tính</label>
                                                <div class="d-flex">
                                                    <div class="form-group d-flex mr-3">
                                                        <input type="radio" class="form-check mr-1" name="gender"
                                                            id="male" placeholder="Subject" value=true
                                                            v-model="user.gender">
                                                        <label class="form-check-label" for="male">Nam</label>
                                                    </div>
                                                    <div class="form-group d-flex ">
                                                        <input type="radio" class="form-check mr-1 " name="gender"
                                                            id="female" placeholder="Subject" value=false
                                                            v-model="user.gender">
                                                        <label class="form-check-label" for="female">Nữ</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <input type="submit" :value="isUploading ? 'Loading...' : 'Cập nhật'" :disabled="isUploading" class="btn btn-primary">
                                                    <div class="submitting"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-5 d-flex align-items-stretch">
                                <div class="info-wrap bg-primary w-100 p-md-5 p-4">
                                    <div class="col-lg-4 col-md-5 d-flex align-items-stretch">
                                        <div class="col-lg-4 col-md-5 d-flex align-items-stretch">
                                            <div class="info-wrap bg-primary w-100 p-md-5 p-4 text-center m-sm--5">
                                                <div class="mb-4 d-flex align-items-center justify-content-center rounded-circle bg-white border border-white mx-auto"
                                                    style="width: 200px; height: 200px; overflow: hidden;">
                                                    <img v-if="user.avatar" :src="user.avatar" alt="Avatar"
                                                        style="width: 100%; height: 100%; object-fit: cover;" />
                                                    <i v-else class="bi bi-person"
                                                        style="font-size: 200px; color: #6c757d;"></i>
                                                </div>
                                                <div>
                                                    <button type="button" class="btn btn-light m-sm-4"
                                                        @click="triggerFileInput">
                                                        Đổi ảnh đại diện
                                                    </button>
                                                    <!-- Input file ẩn -->
                                                    <input type="file" ref="fileInput" accept="image/*"
                                                        @change="handleImageUpload" hidden />
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import useVuelidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { showSuccess, showError } from '@/assets/Admin/js/alert'
import { getUserId } from '@/utils/getUserIdUtils';
import apiClient from "@/services/axiosMiddleware.js";
import { uploadImageToCloudinary } from "@/utils/uploadImageUtils";


const API = '/account'
const user = ref({});
const fileInput = ref(null);
const isUploading = ref(false);

const isAdult = helpers.withMessage(
    'Phải đủ 18 tuổi trở lên',
    (value) => {
        if (!value) return true;
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        const d = today.getDate() - birthDate.getDate();
        if (m < 0 || (m === 0 && d < 0)) {
            return age - 1 >= 18;
        }
        return age >= 18;
    }
);

const rules = {
    fullname: { required, minLength: minLength(6) },
    birthday: { isAdult }
};

const $v = useVuelidate(rules, user);

const updateUser = async () => {
    const isValid = await $v.value.$validate();

    if (!isValid) {
        // showError("Vui lòng kiểm tra lại thông tin!");
        return;
    }

    const id = getUserId();
    try {
        const payload = {
            email: user.value.email,
            fullname: user.value.fullname,
            gender: user.value.gender,
            birthday: user.value.birthday,
            avatar: user.value.avatar,
            active: user.value.active,
            role: user.value.role
        }
        console.log("data:" + JSON.stringify(payload));
        const result = await apiClient.put(`${API}/${id}`, payload);

        console.log("Cập nhật thành công:",JSON.stringify( result.data));

        showSuccess("Cập nhật thành công!")
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin:", error);
        showError("Cập nhật thất bại!");
    }
};

const triggerFileInput = () => {
    fileInput.value.click();
};

const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    isUploading.value = true; //load ảnh
    try {
        const imageUrl = await uploadImageToCloudinary(file);
        user.value.avatar = imageUrl;
        console.log("Upload thành công:", imageUrl);
    } catch (err) {
        console.error("Không thể upload ảnh:", err);
    } finally {
        isUploading.value = false; //load xong
  }
};

const getUser = async () => {
    const id = getUserId();
    console.log("id:" + id);
    if (id) {
        try {
            const result = await apiClient.get(`${API}/${id}`, id);
            user.value = result.data
            console.log("data:" + JSON.stringify(user.value));
        } catch (error) {
            console.log(error);
        }
    }


}

onMounted(getUser)

function formatDate(date) {
    const d = new Date(date)
    return d.toLocaleDateString('vi-VN')
}



</script>

<style lang="scss" scoped></style>
