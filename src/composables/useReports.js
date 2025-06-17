import { ref, onMounted } from 'vue';
import {
  getReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport
} from '@/api/reportApi';

export function useReports() {
  const reports = ref([]);
  const report = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const currentPage = ref(0);
  const pageSize = ref(5);
  const totalPages = ref(0);
  const totalItems = ref(0);

  const fetchReports = async (page = currentPage.value, size = pageSize.value) => {
    loading.value = true;
    try {
      const res = await getReports(page, size);
      reports.value = res.data.data;
      currentPage.value = res.data.currentPage;
      totalPages.value = res.data.totalPages;
      totalItems.value = res.data.totalItems;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const fetchReportById = async (id) => {
    loading.value = true;
    try {
      const res = await getReportById(id);
      report.value = res.data;
      return res.data;
    } catch (err) {
      error.value = err;
      return null;
    } finally {
      loading.value = false;
    }
  };

  const addReport = async (data) => {
    try {
      await createReport(data);
      await fetchReports(0);
    } catch (err) {
      error.value = err;
    }
  };

  const editReport = async (id, data) => {
    try {
      await updateReport(id, data);
      await fetchReports();
    } catch (err) {
      error.value = err;
    }
  };

  const removeReport = async (id) => {
    try {
      await deleteReport(id);
      await fetchReports();
    } catch (err) {
      error.value = err;
    }
  };

  const fetchAllReports = async () => {
    loading.value = true;
    try {
      const res = await getReports(0, 1);
      const total = res.data.totalItems;

      const fullRes = await getReports(0, total);
      reports.value = fullRes.data.data;
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
    await fetchReports();
  });

  return {
    reports,
    report,
    loading,
    error,
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    fetchReports,
    fetchAllReports,
    fetchReportById,
    addReport,
    editReport,
    removeReport
  };
}
