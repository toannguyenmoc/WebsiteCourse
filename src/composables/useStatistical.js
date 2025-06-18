import { ref, onMounted } from 'vue';
import {
  getStatisticalCourse,
} from '@/api/statisticalApi';

export function useStatisticalCourses() {
  const statisticalCourses = ref([]);
  const statisticalCourse = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const currentPage = ref(0);
  const pageSize = ref(5);
  const totalPages = ref(0);
  const totalItems = ref(0);
  const keywordDefault = ref("")

  const fetchStatisticalCourses = async (page = currentPage.value, size = pageSize.value, keyword = keywordDefault.value) => {
    loading.value = true;
    try {
      const res = await getStatisticalCourse(page, size, keyword);
      statisticalCourses.value = res.data.data;
      currentPage.value = res.data.currentPage;
      totalPages.value = res.data.totalPages;
      totalItems.value = res.data.totalItems;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };


  onMounted(async () => {
    await fetchStatisticalCourses();
  });

  return {
    statisticalCourses,
    statisticalCourse,
    loading,
    error,
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    fetchStatisticalCourses,
    keyword: keywordDefault
  };
}
