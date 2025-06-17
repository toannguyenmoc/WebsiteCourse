import { ref, onMounted } from 'vue';
import {
  getFavorites,
  getFavoriteById,
  createFavorite,
  updateFavorite,
  deleteFavorite
} from '@/api/favoriteApi';

export function useFavorites() {
  const favorites = ref([]);
  const favorite = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const currentPage = ref(0);
  const pageSize = ref(5);
  const totalPages = ref(0);
  const totalItems = ref(0);

  const fetchFavorites = async (page = currentPage.value, size = pageSize.value) => {
    loading.value = true;
    try {
      const res = await getFavorites(page, size);
      favorites.value = res.data.data;
      currentPage.value = res.data.currentPage;
      totalPages.value = res.data.totalPages;
      totalItems.value = res.data.totalItems;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const fetchFavoriteById = async (id) => {
    loading.value = true;
    try {
      const res = await getFavoriteById(id);
      favorite.value = res.data;
      return res.data;
    } catch (err) {
      error.value = err;
      return null;
    } finally {
      loading.value = false;
    }
  };

  const addFavorite = async (data) => {
    try {
      await createFavorite(data);
      await fetchFavorites(0);
    } catch (err) {
      error.value = err;
    }
  };

  const editFavorite = async (id, data) => {
    try {
      await updateFavorite(id, data);
      await fetchFavorites();
    } catch (err) {
      error.value = err;
    }
  };

  const removeFavorite = async (id) => {
    try {
      await deleteFavorite(id);
      await fetchFavorites();
    } catch (err) {
      error.value = err;
    }
  };

  const fetchAllFavorites = async () => {
    loading.value = true;
    try {
      const res = await getFavorites(0, 1);
      const total = res.data.totalItems;

      const fullRes = await getFavorites(0, total);
      favorites.value = fullRes.data.data;
      currentPage.value = 0;
      pageSize.value = total;
      totalPages.value = 1;
      totalItems.value = total;
      return fullRes.data.data;
    } catch (err) {
      error.value = err;
      return [];
    } finally {
      loading.value = false;
    }
  };

  onMounted(async () => {
    await fetchFavorites();
  });

  return {
    favorites,
    favorite,
    loading,
    error,
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    fetchFavorites,
    fetchAllFavorites,
    fetchFavoriteById,
    addFavorite,
    editFavorite,
    removeFavorite
  };
}
