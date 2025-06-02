<template>
    <div>
        <div class="mt--7">
            <div class="row">
                <div class="col-xl-6 order-xl-1">
                    <div class="card bg-light shadow">
                        <div class="card-header bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Thêm Loại Khoá Học</h3>
                                </div>
                                <div class="col-4 text-right">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="pl-lg-12">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label class="form-control-label" for="course-name">Tên Loại Khoá
                                                    Học</label>
                                                <input type="text" id="course-name"
                                                    class="form-control form-control-alternative"
                                                    placeholder="Tên khoá học" value="">
                                            </div>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
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
                                    </div>
                                </div>

                                <hr class="my-4" />
                                <div class="d-flex justify-content-between">
                                    <RouterLink to="/admin/course-type/list" class="btn btn-secondary">Quay lại
                                    </RouterLink>
                                    <button class="btn btn-primary">Thêm Mới</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 order-xl-1">
                    <div class="card bg-light shadow">
                        <div class="card-header bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Thông Tin Chiết Khấu</h3>
                                </div>
                                <div class="col-4 text-right">

                                </div>
                            </div>
                        </div>
                        <div class="card-body">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped></style>