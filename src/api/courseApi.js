import api from '@/services/axiosMiddleware';

export const getCourses = (page = 0, size = 10, keyword = "") => {
  return api.get('/course', {
    params: {
      page,
      size,
      keyword
    }
  })
}
export const getCourseById = id => api.get(`/course/${id}`)
export const createCourse = payload => api.post('/course', payload)
export const updateCourse = (id, payload) => api.put(`/course/${id}`, payload)
export const deleteCourse = id => api.delete(`/course/${id}`)
