import api from '@/services/axiosMiddleware';

export const getStatisticalCourse = (page = 0, size = 10, keyword = "") => {
  return api.get('/statistics/courses', {
    params: {
        keyword,
        page,
        size
    }
  });
};