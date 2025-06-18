import api from '@/services/axiosMiddleware'


export const getPayments = (page = 0, size = 10) => {
  return api.get('/payment', {
    params: {
      page,
      size
    }
  });
};

export const getPaymentById = id => api.get(`/payment/${id}`);

export const createPayment = payload => api.post('/payment', payload);

export const updatePayment = (id, payload) => api.put(`/payment/${id}`, payload);

export const deletePayment = id => api.delete(`/payment/${id}`);
