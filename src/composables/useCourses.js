import { ref, onMounted } from 'vue'
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  checkSlug
} from '@/api/courseApi'

export function useCourses() {
  const courses = ref([])
  const course = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Phân trang
  const currentPage = ref(0)
  const pageSize = ref(5)
  const totalPages = ref(0)
  const totalItems = ref(0)
  
  const keyword = ref('')
  const minPrice = ref(null)
  const maxPrice = ref(null)
  const courseTypeIds = ref([])

  const fetchCourses = async (page = currentPage.value, size = pageSize.value, kw = keyword.value,
    min = minPrice.value,
    max = maxPrice.value,
    types = courseTypeIds.value) => {
    loading.value = true
    try {
      const res = await getCourses(page, size, kw,
        min,
        max,
        types.length ? types : null)
      courses.value = res.data.data
      currentPage.value = res.data.currentPage
      totalPages.value = res.data.totalPages
      totalItems.value = res.data.totalItems
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const fetchCourseById = async (id) => {
    loading.value = true
    try {
      const res = await getCourseById(id)
      course.value = res.data
      return res.data
    } catch (err) {
      error.value = err
      return null
    } finally {
      loading.value = false
    }
  }

  const addCourse = async (data) => {
    try {
      await createCourse(data)
      await fetchCourses(0) // Quay lại trang đầu sau khi thêm
    } catch (err) {
      error.value = err
    }
  }

  const editCourse = async (id, data) => {
    try {
      await updateCourse(id, data)
      await fetchCourses()
    } catch (err) {
      error.value = err
    }
  }

  const removeCourse = async (id) => {
    try {
      await deleteCourse(id)
      await fetchCourses() // Vẫn ở trang hiện tại
    } catch (err) {
      error.value = err
    }
  }

  const checkSlugExistence = async (slug) => {
  try {
    const res = await checkSlug(slug);
    return res.data === true;
  } catch (err) {
    error.value = err;
    return false; // fallback nếu xảy ra lỗi
  }
};


  const fetchAllCourses = async () => {
  loading.value = true
  try {
    // Gọi trước để lấy totalItems
    const res = await getCourses(0, 1) // chỉ cần 1 item để lấy metadata
    const total = res.data.totalItems

    // Gọi lại với size = totalItems
    const fullRes = await getCourses(0, total)
    courses.value = fullRes.data.data
    currentPage.value = 0
    pageSize.value = total
    totalPages.value = 1
    totalItems.value = total
    return fullRes.data.data
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

  onMounted(async () => {
    await fetchCourses();
  })

  return {
    // State
    courses,
    course,
    loading,
    error,
    currentPage,
    pageSize,
    totalPages,
    totalItems,

    // Filter
    keyword,
    minPrice,
    maxPrice,
    courseTypeIds,

    // Methods
    fetchCourses,
    fetchAllCourses,
    fetchCourseById,
    addCourse,
    editCourse,
    removeCourse,
    checkSlugExistence
  }
}
