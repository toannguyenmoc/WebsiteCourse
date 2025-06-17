import { ref, onMounted } from 'vue'
import {
  getCommissions,
  getCommissionById,
  createCommission,
  updateCommission,
  deleteCommission
} from '@/api/commissionApi'

export function useCommissions() {
  const commissions = ref([])
  const commission = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const currentPage = ref(0)
  const pageSize = ref(5)
  const totalPages = ref(0)
  const totalItems = ref(0)

  const fetchCommissions = async (page = currentPage.value, size = pageSize.value) => {
    loading.value = true
    try {
      const res = await getCommissions(page, size)
      commissions.value = res.data.data
      currentPage.value = res.data.currentPage
      totalPages.value = res.data.totalPages
      totalItems.value = res.data.totalItems
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const fetchCommissionById = async (id) => {
    loading.value = true
    try {
      const res = await getCommissionById(id)
      commission.value = res.data
      return res.data
    } catch (err) {
      error.value = err
      return null
    } finally {
      loading.value = false
    }
  }

  const addCommission = async (data) => {
    try {
      await createCommission(data)
      await fetchCommissions(0)
    } catch (err) {
      error.value = err
    }
  }

  const editCommission = async (id, data) => {
    try {
      await updateCommission(id, data)
      await fetchCommissions()
    } catch (err) {
      error.value = err
    }
  }

  const removeCommission = async (id) => {
    try {
      await deleteCommission(id)
      await fetchCommissions()
    } catch (err) {
      error.value = err
    }
  }

  const fetchAllCommissions = async () => {
    loading.value = true
    try {
      const res = await getCommissions(0, 1)
      const total = res.data.totalItems

      const fullRes = await getCommissions(0, total)
      commissions.value = fullRes.data.data
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
    await fetchCommissions()
  })

  return {
    commissions,
    commission,
    loading,
    error,
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    fetchCommissions,
    fetchAllCommissions,
    fetchCommissionById,
    addCommission,
    editCommission,
    removeCommission
  }
}
