import api from '@/services/axiosMiddleware';

export const getCourses = (
  page = 0,
  size = 10,
  keyword = '',
  minPrice = null,
  maxPrice = null,
  courseTypeIds = null
) => {
  const params = {
    page,
    size,
    keyword,
    minPrice,
    maxPrice,
    courseTypeIds: courseTypeIds?.length ? courseTypeIds : null
  };

  // Xoá key có giá trị null hoặc undefined
  Object.keys(params).forEach(key => {
    if (params[key] === null || params[key] === undefined) {
      delete params[key];
    }
  });

  return api.get('/course', { params });
};

export const getCourseById = id => api.get(`/course/${id}`)
export const createCourse = payload => api.post('/course', payload)
export const updateCourse = (id, payload) => api.put(`/course/${id}`, payload)
export const deleteCourse = id => api.delete(`/course/${id}`)
