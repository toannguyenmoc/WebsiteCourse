<template>
    <section class="ftco-section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <div class="wrapper">
                        <div class="row no-gutters">
                            <div class="col-lg-8 col-md-7 order-md-last d-flex align-items-stretch">
                                <div class="contact-wrap w-100 p-md-5 p-4">
                                    <h3 class="mb-4">Information</h3>
                                    <form method="POST" id="contactForm" name="contactForm" class="contactForm">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="label" for="name">Full Name</label>
                                                    <input type="text" class="form-control" name="name" id="name"
                                                        placeholder="Name">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="label" for="email">Email Address</label>
                                                    <input type="email" class="form-control" name="email" id="email"
                                                        placeholder="Email">
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="label" for="subject">Subject</label>
                                                    <input type="text" class="form-control" name="subject" id="subject"
                                                        placeholder="Subject">
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="label" for="#">Message</label>
                                                    <textarea name="message" class="form-control" id="message" cols="30"
                                                        rows="4" placeholder="Message"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <input type="submit" value="Update" class="btn btn-primary">
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
