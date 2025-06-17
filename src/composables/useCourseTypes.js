import { ref, onMounted } from 'vue'
import {
  getCourseTypes,
  getCourseTypeById,
  createCourseType,
  updateCourseType,
  deleteCourseType
} from '@/api/courseTypeApi'

export function useCourseTypes() {
  const courseTypes = ref([])
  const courseType = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const currentPage = ref(0)
  const pageSize = ref(5)
  const totalPages = ref(0)
  const totalItems = ref(0)

  const fetchCourseTypes = async (page = currentPage.value, size = pageSize.value) => {
    loading.value = true
    try {
      const res = await getCourseTypes(page, size)
      courseTypes.value = res.data.data
      currentPage.value = res.data.currentPage
      totalPages.value = res.data.totalPages
      totalItems.value = res.data.totalItems
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const fetchCourseTypeById = async (id) => {
    loading.value = true
    try {
      const res = await getCourseTypeById(id)
      courseType.value = res.data
      return res.data
    } catch (err) {
      error.value = err
      return null
    } finally {
      loading.value = false
    }
  }

  const addCourseType = async (data) => {
    try {
      await createCourseType(data)
      await fetchCourseTypes(0)
    } catch (err) {
      error.value = err
    }
  }

  const editCourseType = async (id, data) => {
    try {
      await updateCourseType(id, data)
      await fetchCourseTypes()
    } catch (err) {
      error.value = err
    }
  }

  const removeCourseType = async (id) => {
    try {
      await deleteCourseType(id)
      await fetchCourseTypes()
    } catch (err) {
      error.value = err
    }
  }

  const fetchAllCourseTypes = async () => {
    loading.value = true
    try {
      const res = await getCourseTypes(0, 1)
      const total = res.data.totalItems

      const fullRes = await getCourseTypes(0, total)
      courseTypes.value = fullRes.data.data
      currentPage.value = 0
      pageSize.value = total
      totalPages.value = 1
      totalItems.value = total
      return fullRes.data.data
    } catch (err) {
      error.value = err
      return []
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await fetchCourseTypes()
  })

  return {
    courseTypes,
    courseType,
    loading,
    error,
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    fetchCourseTypes,
    fetchAllCourseTypes,
    fetchCourseTypeById,
    addCourseType,
    editCourseType,
    removeCourseType
  }
}
