import api from '@/services/axiosMiddleware';

export const getReports = (page = 0, size = 10) => {
  return api.get('/report', {
    params: {
      page,
      size
    }
  });
};

export const getReportById = id => api.get(`/report/${id}`);
export const createReport = payload => api.post('/report', payload);
export const updateReport = (id, payload) => api.put(`/report/${id}`, payload);
export const deleteReport = id => api.delete(`/report/${id}`);
