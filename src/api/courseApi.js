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
  };

  // Xoá key có giá trị null hoặc undefined
  Object.keys(params).forEach(key => {
    if (params[key] === null || params[key] === undefined) {
      delete params[key];
    }
  });
   // Dùng URLSearchParams để build URL thủ công
  const query = new URLSearchParams();

  // Thêm các param thường
  for (const key in params) {
    query.append(key, params[key]);
  }

  // Thêm thủ công courseTypeIds
  if (Array.isArray(courseTypeIds) && courseTypeIds.length > 0) {
    courseTypeIds.forEach(id => {
      query.append('courseTypeIds', id);
    });
  }

    return api.get('/course?' + query.toString());
};

export const getCourseById = id => api.get(`/course/${id}`)
export const createCourse = payload => api.post('/course', payload)
export const updateCourse = (id, payload) => api.put(`/course/${id}`, payload)
export const deleteCourse = id => api.delete(`/course/${id}`)
export const checkSlug = slug => 
  api.get(`/course/check-slug`, {
    params: { slug }
  });

export const getCoursesByAccount = (
  accountId,
  page = 0,
  size = 5
) => {
  const params = new URLSearchParams();
  params.append('accountId', accountId);
  params.append('page', page);
  params.append('size', size);

  return api.get('/course/by-account?' + params.toString());
};

