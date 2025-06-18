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
                <video autoplay muted controls :key="useLesson.videoUrl" :src="useLesson.videoUrl">
                    Trình duyệt của bạn không hỗ trợ video.
                </video>
                <!-- <img :src="useLesson.img " class="img-fluid" style="max-height: 100%; max-width: 100%;">
                <div class="position-absolute d-flex align-items-center justify-content-center w-100 h-100"
                  style="background-color: rgba(0, 0, 0, 0.3);">
                  <svg class="play-icon" viewBox="0 0 24 24" fill="red" width="60px" height="60px"
                    style="cursor: pointer; color: red">
                    <path d="M8 5v14l11-7z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                </div> -->
              </div>
              <div class="d-flex justify-content-between">
                <h4 class="mt-3 ">{{ useLesson.title }}</h4>
                <RouterLink to="/report" class="mt-3"><i class="fa fa-flag"></i> Báo cáo</RouterLink>
              </div>
              <h6 class="text-left mt-4">Giới thiệu khóa học</h6>
              <p>{{ useLesson.description }}</p>
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
              <li v-for="(module, index) in lessons" :key="index"
                class="list-group-item d-flex justify-content-between align-items-center"
                :class="{ 'bg-light': currentModuleIndex === module.lesson }" @click="selectModule(module.id)"
                style="cursor: pointer;">

                <div>
                  <span class="text-dark">
                    {{ module.lesson }}. {{ module.title }}
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
      <button @click="goToPreviousLesson" class="btn btn-outline-primary mr-3">
        <i class="fas fa-angle-left mr-2"></i> BÀI TRƯỚC
      </button>
      <button @click="goToNextLesson" class="btn btn-primary">
        BÀI TIẾP THEO <i class="fas fa-angle-right ml-2"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useLessons } from '@/composables/useLessons';
import { getData } from '@/services/apiMiddleware';
const router = useRouter();
const route = useRoute();
const useLesson = ref({});
const { lesson, fetchLessonById } = useLessons();
const lessons = ref([]);
const id = ref(0);


const currentLessonId = ref(Number(route.params.id));
fetchLessonById(route.params.id);
//bien theo gioi acctive cho video dang chon
const currentModuleIndex = ref(0);
//theo doi lesson lay du lieu len
watch(lesson, () => {
  useLesson.value = lesson.value;
  currentModuleIndex .value = useLesson.value.lesson
})

//theo gioi id lesson cap nhat du lieu
watch(() => route.params.id, async (newValue)=>{
  await fetchLessonById(newValue);
  currentModuleIndex.value = lesson.value.lesson;
  currentLessonId.value = Number(newValue);
})

//load data
onMounted(async() => {
  try {
    id.value = sessionStorage.getItem("courseId");
    const data = await getData("/lesson", {courseId: id.value, page: 0, size: 9999});
    lessons.value = data.data.filter(ls => ls.status).sort((a, b) => a.lesson - b.lesson);
  } catch (error) {
    console.log(error);
  } 
});



//function click chuyen bai
const selectModule = (index) => {
  router.push("/lesson/"+index);
};

//theo gioi du lieu next previous
const currentIndex = computed(() => {
  return lessons.value.findIndex(item => item.id === currentLessonId.value);
});

//previous video
const goToPreviousLesson = () => {
  if (currentIndex.value > 0) {
    const prevLesson = lessons.value[currentIndex.value - 1];
    router.push(`/lesson/${prevLesson.id}`);
  }
};
//next video
const goToNextLesson = () => {
  if (currentIndex.value < lessons.value.length - 1) {
    const nextLesson = lessons.value[currentIndex.value + 1];
    router.push(`/lesson/${nextLesson.id}`);
  }
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