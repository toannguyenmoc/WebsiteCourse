
import api from '@/services/axiosMiddleware'

export const getComments = (page = 0, size = 10) => {
  return api.get('/comment', {
    params: {
      page,
      size
    }
  });
};

export const getCommentById = id => api.get(`/comment/${id}`);

export const createComment = payload => api.post('/comment', payload);

export const updateComment = (id, payload) => api.put(`/comment/${id}`, payload);

export const deleteComment = id => api.delete(`/comment/${id}`);
