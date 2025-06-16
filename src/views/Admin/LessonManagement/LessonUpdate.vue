<template>
    <div>
        <div class="mt--7">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <div class="card bg-light shadow">
                        <div class="card-header bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Cập Nhật Bài Học</h3>
                                </div>
                                <!-- <div class="col-4 text-right">
                                    <button class="btn btn-danger">Xoá</button>
                                </div> -->
                            </div>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="updateLesson">
                                <div class="pl-lg-12">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="">Khoá Học</label>
                                                <select class="form-select form-control form-control-alternative"
                                                    aria-label="Default select example">
                                                    <option selected>Select Tên Khoá Học</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="lesson-name">Tên Bài Học</label>
                                                <input type="text" id="lesson-name"
                                                    class="form-control form-control-alternative"
                                                    placeholder="Tên khoá học" value="">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="lesson-no">Bài Học Số</label>
                                                <input type="number" min="10000" step="1000" id="lesson-no"
                                                    class="form-control form-control-alternative"
                                                    placeholder="Nhập số thứ tự bài học" value="">
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <label class="form-control-label" for="">Video URL</label>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input form-control-alternative" id="videoURL">
                                                <label class="custom-file-label" for="videoURL">Upload video</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="unit-price">Trạng Thái</label><br>
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="status-true"
                                                        name="status" class="custom-control-input" checked>
                                                    <label class="custom-control-label" for="status-true">Hoạt Động</label>
                                                </div>
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="status-false"
                                                        name="status" class="custom-control-input">
                                                    <label class="custom-control-label" for="status-false">Ngừng Hoạt Động</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <label class="form-control-label" for="">Bài Tập URL</label>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input form-control-alternative" id="exercise">
                                                <label class="custom-file-label" for="exercise">Upload file</label>
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
                                            placeholder="Mô tả về bài học của bạn ..."></textarea>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <div class="d-flex justify-content-between">
                                    <RouterLink to="/admin/lesson/list" class="btn btn-secondary">Quay lại</RouterLink>
                                    <button class="btn btn-primary">Cập Nhật</button>
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
import { RouterLink } from 'vue-router';
import { showSuccess, showError } from '@/assets/Admin/js/alert';

//function update
const updateLesson = ()=>{


    //Thông báo sau khi cập nhật thành công
    showSuccess("Cập nhật thành công!");


    //Thông báo khi lỗi khi cập nhật thất bại

    // showError("Cập nhật thất bại!");
}
</script>

<style scoped></style>