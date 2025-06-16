<template>
      <div>
        <div class="mt--7">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <div class="card bg-light shadow">
                        <div class="card-header bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Thêm Mới Chiết Khấu</h3>
                                </div>
                                <div class="col-4 text-right">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="createCommission">
                                <div class="pl-lg-12">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label class="form-control-label" for="commission">Hiệu Lực</label>
                                                <input type="date" id="commission"
                                                    class="form-control form-control-alternative"
                                                 value="">
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                          <div class="form-group">
                                                <label class="form-control-label" for="percent">Phần trăm</label>
                                                <input type="text" id="percent"
                                                    class="form-control form-control-alternative"
                                                    placeholder="Nhập phần trăm" value="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <div class="d-flex justify-content-between">
                                    <RouterLink to="/admin/commission/list" class="btn btn-secondary">Quay lại</RouterLink>
                                    <button class="btn btn-primary">Thêm mới</button>
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
const createCommission = () => {




    //Thông báo sau khi thêm thành công
    showSuccess("Thêm thành công!");


    //Thông báo khi lỗi khi thêm thất bại
    // showError("Thêm thất bại!");
}
</script>

<style lang="scss" scoped>

</style>