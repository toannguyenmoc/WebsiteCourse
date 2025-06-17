import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export const getFavorites = (page = 0, size = 10) => {
  return api.get('/favorite', {
    params: {
      page,
      size
    }
  });
};

export const getFavoriteById = id => api.get(`/favorite/${id}`);

export const createFavorite = payload => api.post('/favorite', payload);

export const updateFavorite = (id, payload) => api.put(`/favorite/${id}`, payload);

export const deleteFavorite = id => api.delete(`/favorite/${id}`);
