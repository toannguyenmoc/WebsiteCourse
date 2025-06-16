<template>
  <div class="dropdown" ref="dropdownRef">
    <a class="btn btn-sm btn-icon-only text-dark" href="#" role="button" aria-haspopup="true"
      :aria-expanded="isOpen.toString()" @click.prevent="toggleDropdown">
      <i class="fas fa-ellipsis-v"></i>
    </a>

    <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow" :class="{ show: isOpen }">
      <a class="dropdown-item" href="#" @click.prevent="onEdit">Sửa</a>
      <a class="dropdown-item" href="#" @click.prevent="onDelete">Xoá</a>
    </div>
  </div>
</template>

<script setup>
import { showConfirm } from '@/assets/Admin/js/alert'
import { ref, onMounted, onBeforeUnmount } from 'vue'
const emit = defineEmits(['edit', 'delete'])
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const isOpen = ref(false)
const dropdownRef = ref(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

const onEdit = () => {
  emit('edit', props.item);
  isOpen.value = false;
}

const onDelete = async () => {
  //alert thông báo 
  await showConfirm({
    title: 'Xác nhận xoá',
    text: 'Bạn sẽ không thể khôi phục dữ liệu này!',
  }).then((result) => {
    if (result.isConfirmed) {
      // Thực hiện xóa
      emit('delete', props.item);
    } else {
      //Hủy bỏ không xóa
      emit('delete', undefined);
    }
  });
  isOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-menu {
  display: none;
}

.dropdown-menu.show {
  display: block;
}
</style>
