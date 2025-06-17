import { ref, onMounted } from 'vue';
import {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment
} from '@/api/paymentApi';

export function usePayments() {
  const payments = ref([]);
  const payment = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const currentPage = ref(0);
  const pageSize = ref(5);
  const totalPages = ref(0);
  const totalItems = ref(0);

  const fetchPayments = async (page = currentPage.value, size = pageSize.value) => {
    loading.value = true;
    try {
      const res = await getPayments(page, size);
      payments.value = res.data.data;
      currentPage.value = res.data.currentPage;
      totalPages.value = res.data.totalPages;
      totalItems.value = res.data.totalItems;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const fetchPaymentById = async (id) => {
    loading.value = true;
    try {
      const res = await getPaymentById(id);
      payment.value = res.data;
      return res.data;
    } catch (err) {
      error.value = err;
      return null;
    } finally {
      loading.value = false;
    }
  };

  const addPayment = async (data) => {
    try {
      await createPayment(data);
      await fetchPayments(0);
    } catch (err) {
      error.value = err;
    }
  };

  const editPayment = async (id, data) => {
    try {
      await updatePayment(id, data);
      await fetchPayments();
    } catch (err) {
      error.value = err;
    }
  };

  const removePayment = async (id) => {
    try {
      await deletePayment(id);
      await fetchPayments();
    } catch (err) {
      error.value = err;
    }
  };

  const fetchAllPayments = async () => {
    loading.value = true;
    try {
      const res = await getPayments(0, 1);
      const total = res.data.totalItems;

      const fullRes = await getPayments(0, total);
      payments.value = fullRes.data.data;
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
    await fetchPayments();
  });

  return {
    payments,
    payment,
    loading,
    error,
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    fetchPayments,
    fetchAllPayments,
    fetchPaymentById,
    addPayment,
    editPayment,
    removePayment
  };
}
