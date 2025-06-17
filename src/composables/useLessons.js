import { ref, onMounted } from 'vue'
import {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson
} from '@/api/lessonApi'

export function useLessons() {
  const lessons = ref([])
  const lesson = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Phân trang
  const currentPage = ref(0)
  const pageSize = ref(5)
  const totalPages = ref(0)
  const totalItems = ref(0)

  const fetchLessons = async (page = currentPage.value, size = pageSize.value) => {
    loading.value = true
    try {
      const res = await getLessons(page, size)
      lessons.value = res.data.data
      currentPage.value = res.data.currentPage
      totalPages.value = res.data.totalPages
      totalItems.value = res.data.totalItems
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const fetchLessonById = async (id) => {
    loading.value = true
    try {
      const res = await getLessonById(id)
      lesson.value = res.data
      return res.data
    } catch (err) {
      error.value = err
      return null
    } finally {
      loading.value = false
    }
  }

  const addLesson = async (data) => {
    try {
      await createLesson(data)
      await fetchLessons(0) // Quay lại trang đầu sau khi thêm
    } catch (err) {
      error.value = err
    }
  }

  const editLesson = async (id, data) => {
    try {
      await updateLesson(id, data)
      await fetchLessons()
    } catch (err) {
      error.value = err
    }
  }

  const removeLesson = async (id) => {
    try {
      await deleteLesson(id)
      await fetchLessons() // Vẫn ở trang hiện tại
    } catch (err) {
      error.value = err
    }
  }

  onMounted(() => {
    fetchLessons()
  })

  return {
    lessons,
    lesson,
    loading,
    error,
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    fetchLessons,
    fetchLessonById,
    addLesson,
    editLesson,
    removeLesson
  }
}
