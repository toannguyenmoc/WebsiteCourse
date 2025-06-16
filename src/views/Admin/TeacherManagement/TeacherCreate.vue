<template>
        <div>
        <div class="mt--7">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <div class="card bg-light shadow">
                        <div class="card-header bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Thêm Học Viên</h3>
                                </div>
                                <div class="col-4 text-right">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="createTeacher">
                                <div class="pl-lg-12">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="name">Tên Giảng Viên</label>
                                                <input type="text" id="name"
                                                    class="form-control form-control-alternative"
                                                    placeholder="Tên học viên" value="">
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="email">Email</label>
                                                <input type="email" id="email"
                                                    class="form-control form-control-alternative"
                                                    placeholder="Nhập email" value="">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="birthday">Ngày Sinh</label>
                                                <input type="date" id="birthday"
                                                    class="form-control form-control-alternative"
                                                    placeholder="Nhập email" value="">
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <label class="form-control-label" for="">Hình Ảnh</label>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input form-control-alternative" id="customFileLang">
                                                <label class="custom-file-label" for="customFileLang">Chọn file</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="unit-price">Giới Tính</label><br>
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="gender-true"
                                                        name="gender" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="gender-true">Nam</label>
                                                </div>
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="gender-false"
                                                        name="gender" class="custom-control-input">
                                                    <label class="custom-control-label" for="gender-false">Nữ</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="unit-price">Vai Trò</label><br>
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="role-true"
                                                        name="role" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="role-true">Giảng Viên</label>
                                                </div>
                                                <!-- <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="role-false"
                                                        name="role" class="custom-control-input">
                                                    <label class="custom-control-label" for="role-false">Học Viên</label>
                                                </div> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <!-- Description -->
                                <div class="pl-lg-12">
                                    <div class="form-group">
                                        <label>Mô tả</label>
                                        <textarea rows="4" class="form-control form-control-alternative"
                                            placeholder="Mô tả về khoá học của bạn ..."></textarea>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <div class="d-flex justify-content-between">
                                    <RouterLink to="/admin/teacher/list" class="btn btn-secondary">Quay lại</RouterLink>
                                    <button class="btn btn-primary">Thêm Khoá học</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { showSuccess, showError } from '@/assets/Admin/js/alert';

//function thêm 
const createTeacher = () => {




    //Thông báo sau khi thêm thành công
    showSuccess("Thêm thành công!");


    //Thông báo khi lỗi khi thêm thất bại
    // showError("Thêm thất bại!");
}
</script>

<style lang="scss" scoped>

</style>