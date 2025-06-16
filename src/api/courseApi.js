import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

export const getCourses = (page = 0, size = 10) => {
  return api.get('/course', {
    params: {
      page,
      size
    }
  })
}
export const getCourseById = id => api.get(`/course/${id}`)
export const createCourse = payload => api.post('/course', payload)
export const updateCourse = (id, payload) => api.put(`/course/${id}`, payload)
export const deleteCourse = id => api.delete(`/course/${id}`)
