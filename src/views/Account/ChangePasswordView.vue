<template>
	<section class="ftco-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-12">
					<div class="wrapper">
						<div class="row no-gutters">
							<div class="col-lg-8 col-md-7 order-md-last d-flex align-items-stretch">
								<div class="contact-wrap w-100 p-md-5 p-4">
									<h3 class="mb-4">Đổi mật khẩu</h3>
									<form id="contactForm" name="contactForm" class="contactForm"
										@submit.prevent="changePassword">
										<div class="row">
											<div class="col-md-12">
												<div class="form-group">
													<label class="label" for="subject">Email</label>
													<input type="text" class="form-control" name="subject" id="subject"
														:value="email" disabled>
												</div>
											</div>
											<div class="col-md-12">
												<div class="form-group mb-0">
													<label class="label" for="subject">Mật khẩu cũ</label>
													<input type="password" class="form-control" name="subject"
														id="subject" placeholder="Mật khẩu cũ"
														v-model="form.oldPassword">
												</div>
												<small class="text-danger" v-if="$v.oldPassword.$error">
													<span v-if="$v.oldPassword.required.$invalid">Password không được bỏ
														trống</span>
													<span v-else-if="$v.oldPassword.minLength.$invalid">Password ít nhất
														6
														ký
														tự.</span>
												</small>
											</div>
											<div class="col-md-12">
												<div class="form-group mb-0">
													<label class="label" for="subject">Mật khẩu mới</label>
													<input type="password" class="form-control" name="subject"
														id="subject" placeholder="Mật khẩu mới"
														v-model="form.newPassword">
												</div>
												<small class="text-danger" v-if="$v.newPassword.$error">
													<span v-if="$v.newPassword.required.$invalid">Password không được bỏ
														trống</span>
													<span v-else-if="$v.newPassword.minLength.$invalid">Password ít nhất
														6 ký
														tự.</span>
												</small>
											</div>
											<div class="col-md-12">
												<div class="form-group mb-0">
													<label class="label" for="subject">Xác nhận mật khẩu</label>
													<input type="password" class="form-control" name="subject"
														id="subject" placeholder="Xác nhận mật khẩu"
														v-model="form.confirmPassword">
												</div>
												<small class="text-danger" v-if="$v.confirmPassword.$error">
													<span v-if="$v.confirmPassword.required.$invalid">Password không được bỏ
														trống</span>
													<span v-else-if="$v.confirmPassword.minLength.$invalid">Password ít nhất
														6 ký
														tự.</span>
												</small>
											</div>
											<div class="col-md-12">
												<div class="form-group mt-3">
													<input type="submit" value="Cập nhật" class="btn btn-primary">
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
													style="width: 200px; height: 200px;">
													<i class="bi bi-person"
														style="font-size: 200px; color: #6c757d;"></i>
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
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { showSuccess, showError } from '@/assets/Admin/js/alert'
import { getEmail } from '@/utils/getEmailUtils';
import apiClient from "@/services/axiosMiddleware.js";
import { getUserId } from '@/utils/getUserIdUtils';
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';


const API = '/auth/change-password'
const form = ref({
	oldPassword: "",
	newPassword: "",
	confirmPassword: ""
})
const router = useRouter();
const email = getEmail();
const rules = {
	oldPassword: { required, minLength: minLength(6) },
	newPassword: { required, minLength: minLength(6) },
	confirmPassword: { required, minLength: minLength(6) },
};

const $v = useVuelidate(rules, form);


const changePassword = async () => {
	const isValid = await $v.value.$validate();
	if (!isValid) {
		showError("Vui lòng kiểm tra lại thông tin!");
		return;
	}
	if (form.value.newPassword !== form.value.confirmPassword) {
		showError("Xác nhận mật khẩu không đúng!");
		return;
	}
	const id = getUserId();
	console.log("id :" + id);
	try {
		const payload = {
			email: email,
			oldPassword: form.value.oldPassword,
			newPassword: form.value.newPassword
		}

		// console.log("payload :" + JSON.stringify(payload));

		const result = await apiClient.put(`${API}/${id}`, payload);

		// console.log("Cập nhật mật khẩu thành công:", JSON.stringify(result.data));

		showSuccess("Cập nhật thành công!")

		sessionStorage.removeItem('TOKEN')
		router.push("/login");
		// window.location.reload();
	} catch (error) {
		console.error("Lỗi khi cập nhật thông tin:", error);
		showError("Cập nhật thất bại!");
	}

};



</script>

<style lang="scss" scoped></style>