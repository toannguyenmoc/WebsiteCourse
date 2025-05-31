<template>
  <div id="app">
    <div class="container-fluid mb-5 margin-top">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <div
                class="embed-responsive embed-responsive-16by9 bg-light d-flex align-items-center justify-content-center position-relative"
                style="min-height: 400px;">
                <img :src="work1img" class="img-fluid" style="max-height: 100%; max-width: 100%;">
                <div class="position-absolute d-flex align-items-center justify-content-center w-100 h-100"
                  style="background-color: rgba(0, 0, 0, 0.3);">
                  <svg class="play-icon" viewBox="0 0 24 24" fill="red" width="60px" height="60px"
                    style="cursor: pointer; color: red">
                    <path d="M8 5v14l11-7z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <h4 class="mt-3 ">Giới thiệu C++ là gì?</h4>
                <RouterLink to="/report" class="mt-3"><i class="fa fa-flag"></i> Báo cáo</RouterLink>
              </div>
              <h6 class="text-left mt-4">Giới thiệu khóa học</h6>
              <p>Sự bùng nổ của công nghệ Robot, trí nhân tạo Al dẫn đến sự thay đổi trong các lĩnh vực ngành nghề. CNTT
                trở thành lựa chọn số 1 giúp con người kiểm soát và phát triển các công nghệ đỉnh cao. Để đáp ứng được
                nhu cầu phát triển xã hội, Codelearn xây dựng hệ thống học lập trình trực tuyến nhằm giúp các bạn trẻ &
                người mới bắt đầu dễ dàng tiếp cận với môn học, khơi dậy đam mê công nghệ.</p>
            </div>

          </div>
        </div>

        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              <h6>
                Nội dung khóa học
              </h6>
            </div>
            <ul class="list-group list-group-flush" style="max-height: 500px; overflow-y: auto;">
              <li v-for="(module, index) in courseModules" :key="index"
                class="list-group-item d-flex justify-content-between align-items-center"
                :class="{ 'bg-light': currentModuleIndex === index }" @click="selectModule(index)"
                style="cursor: pointer;">

                <div>
                  <span class="text-dark">
                    {{ module.title }}
                  </span>
                  <small class="text-muted d-block"> {{ module.duration }}</small>
                </div>
                <i class="fa fa-play"></i>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed-bottom bg-white p-3 border-top d-flex justify-content-center">
      <button class="btn btn-outline-primary mr-3">
        <i class="fas fa-angle-left mr-2"></i> BÀI TRƯỚC
      </button>
      <button class="btn btn-primary">
        BÀI TIẾP THEO <i class="fas fa-angle-right ml-2"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import work1img from '@/assets/Client/images/work-1.jpg'


const courseModules = ref([
  { title: '1. Giới thiệu', completedLessons: 0, totalLessons: 3, duration: '07:07' },
  { title: '2. Biến và kiểu dữ liệu', completedLessons: 0, totalLessons: 21, duration: '01:15:29' },
  { title: '3. Cấu trúc điều khiển và vòng lặp', completedLessons: 0, totalLessons: 28, duration: '01:28:08' },
  { title: '4. Mảng', completedLessons: 0, totalLessons: 18, duration: '01:22:56' },
  { title: '5. String', completedLessons: 0, totalLessons: 6, duration: '50:05' },
  { title: '6. Hàm', completedLessons: 0, totalLessons: 30, duration: '01:04:15' },
  { title: '7. Con trỏ', completedLessons: 0, totalLessons: 4, duration: '50:14' },
  { title: '8. Struct', completedLessons: 0, totalLessons: 4, duration: '01:05:08' },
  { title: '9. Làm việc với file', completedLessons: 0, totalLessons: 3, duration: '40:34' },
  { title: '10. Hướng đối tượng (OOP)', completedLessons: 0, totalLessons: 10, duration: '?' },
]);

const currentModuleIndex = ref(0);


const selectModule = (index) => {
  currentModuleIndex.value = index;
  console.log('Selected module:', courseModules.value[index].title);
};

</script>

<style scoped>
.margin-top {
  margin-top: 85px;
}

.list-group-item.active {
  background-color: #f1e4ee;
  color: #495057;
}

.embed-responsive {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.embed-responsive::before {
  display: block;
  content: "";
}

.embed-responsive-16by9::before {
  padding-top: 56.25%;
  /* 9 / 16 * 100 */
}

.embed-responsive .embed-responsive-item {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>