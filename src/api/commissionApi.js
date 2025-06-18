
import api from '@/services/axiosMiddleware'

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL
// })

export const getCommissions = (page = 0, size = 10) => {
  return api.get('/commission', {
    params: {
      page,
      size
    }
  })
}

export const getCommissionById = id => api.get(`/commission/${id}`)

export const createCommission = payload => api.post('/commission', payload)

export const updateCommission = (id, payload) => api.put(`/commission/${id}`, payload)

export const deleteCommission = id => api.delete(`/commission/${id}`)
