import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

export const getLessons = (page = 0, size = 10) => {
  return api.get('/lesson', {
    params: {
      page,
      size
    }
  })
}
export const getLessonById = id => api.get(`/lesson/${id}`)
export const createLesson = payload => api.post('/lesson', payload)
export const updateLesson = (id, payload) => api.put(`/lesson/${id}`, payload)
export const deleteLesson = id => api.delete(`/lesson/${id}`)
