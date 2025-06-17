<template>
  <div class="d-flex justify-content-between">
    <div class="d-flex justify-content-center align-items-center pr-4 mb-2">
      <label class="mb-0">Hiển thị:</label>
      <select class="form-control form-control-sm ml-2 w-auto" v-model.number="localPageSize" @change="onPageSizeChange">
        <option :value="1">1</option>
        <option :value="2">2</option>
        <option :value="5">5</option>
        <option :value="10">10</option>
      </select>
      <span class="ml-2">khoá học/trang</span>
    </div>
    <div>
      <nav aria-label="Pagination">
        <ul class="pagination justify-content-end mb-0">
          <li class="page-item" :class="{ disabled: currentPage === 0 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
              <i class="fas fa-angle-left"></i>
            </a>
          </li>

          <li class="page-item" v-for="item in visiblePages" :key="item"
              :class="{ active: item === currentPage + 1, disabled: item === '...'}">
            <a class="page-link" v-if="item !== '...'" href="#" @click.prevent="changePage(item - 1)">
              {{ item }}
            </a>
            <span class="page-link" v-else>…</span>
          </li>

          <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
              <i class="fas fa-angle-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>


<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  pageSize: Number
})

const emit = defineEmits(['update:currentPage', 'update:pageSize'])
const localPageSize = ref(props.pageSize)

watch(localPageSize, (val) => {
  emit('update:pageSize', val)
  emit('update:currentPage', 0)
})

const changePage = (page) => {
  if (page < 0 || page >= props.totalPages) return
  emit('update:currentPage', page)
}

const onPageSizeChange = () => {
  // handled by watch
}

const visiblePages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage + 1
  const pages = []

  pages.push(1)

  if (current > 3) {
    pages.push('...')
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    if (i !== 1 && i !== total) {
      pages.push(i)
    }
  }

  if (end < total - 1) {
    pages.push('...')
  }

  if (total > 1) {
    pages.push(total)
  }

  return pages
})
</script>
