import api from '@/services/axiosMiddleware';

export const getCourseTypes = (page = 0, size = 10) => {
  return api.get('/course-type', {
    params: {
      page,
      size
    }
  })
}

export const getCourseTypeById = id => api.get(`/course-type/${id}`)

export const createCourseType = payload => api.post('/course-type', payload)

export const updateCourseType = (id, payload) => api.put(`/course-type/${id}`, payload)

export const deleteCourseType = id => api.delete(`/course-type/${id}`)
