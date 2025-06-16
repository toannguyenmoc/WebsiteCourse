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
                                    <form method="POST" id="contactForm" name="contactForm" class="contactForm">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="label" for="name">Họ tên</label>
                                                    <input type="text" class="form-control" name="name" id="name"
                                                        placeholder="Họ tên">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="label" for="email">Email</label>
                                                    <input type="email" class="form-control" name="email" id="email"
                                                        disabled placeholder="Email">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="label" for="birthday">Ngày sinh</label>
                                                    <input type="date" class="form-control" name="birthday"
                                                        id="birthday" placeholder="Subject">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="label" for="birthday">Giới tính</label>
                                                <div class="d-flex">
                                                    <div class="form-group d-flex mr-3">
                                                        <input type="radio" class="form-check mr-1" name="gender"
                                                            id="male" placeholder="Subject">
                                                        <label class="form-check-label" for="male">Nam</label>
                                                    </div>
                                                    <div class="form-group d-flex ">
                                                        <input type="radio" class="form-check mr-1 " name="gender"
                                                            id="female" placeholder="Subject">
                                                        <label class="form-check-label" for="female">Nữ</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="label" for="major">Chuyên ngành</label>
                                                    <input type="text" class="form-control" name="major" id="major"
                                                        placeholder="Chuyên ngành">
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="label" for="degree">Bằng cấp</label>
                                                    <input type="text" class="form-control" name="degree" id="degree"
                                                        placeholder="Bằng cấp">
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
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
                                                <div>
                                                    <button type="button" class="btn btn-light m-sm-4">Đổi ảnh đại
                                                        diện</button>
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

<script>

</script>

<style lang="scss" scoped></style>
