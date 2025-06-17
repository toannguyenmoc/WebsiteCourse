import { ref, onMounted } from 'vue';
import {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
} from '@/api/commentApi';

export function useComments() {
  const comments = ref([]);
  const comment = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const currentPage = ref(0);
  const pageSize = ref(5);
  const totalPages = ref(0);
  const totalItems = ref(0);

  const fetchComments = async (page = currentPage.value, size = pageSize.value) => {
    loading.value = true;
    try {
      const res = await getComments(page, size);
      comments.value = res.data.data;
      currentPage.value = res.data.currentPage;
      totalPages.value = res.data.totalPages;
      totalItems.value = res.data.totalItems;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const fetchCommentById = async (id) => {
    loading.value = true;
    try {
      const res = await getCommentById(id);
      comment.value = res.data;
      return res.data;
    } catch (err) {
      error.value = err;
      return null;
    } finally {
      loading.value = false;
    }
  };

  const addComment = async (data) => {
    try {
      await createComment(data);
      await fetchComments(0);
    } catch (err) {
      error.value = err;
    }
  };

  const editComment = async (id, data) => {
    try {
      await updateComment(id, data);
      await fetchComments();
    } catch (err) {
      error.value = err;
    }
  };

  const removeComment = async (id) => {
    try {
      await deleteComment(id);
      await fetchComments();
    } catch (err) {
      error.value = err;
    }
  };

  const fetchAllComments = async () => {
    loading.value = true;
    try {
      const res = await getComments(0, 1);
      const total = res.data.totalItems;

      const fullRes = await getComments(0, total);
      comments.value = fullRes.data.data;
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
    await fetchComments();
  });

  return {
    comments,
    comment,
    loading,
    error,
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    fetchComments,
    fetchAllComments,
    fetchCommentById,
    addComment,
    editComment,
    removeComment
  };
}
