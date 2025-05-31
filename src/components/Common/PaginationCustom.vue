<template>
    <div class="row">
        <div class="col">
            <div class="block-27">
                <ul>
                    <!-- previous -->
                    <li><a class="me-2" href="#" @click.prevent="goToPage(currentPage - 1)"
                            :class="{ 'disabled': currentPage === 1 }">&lt;</a></li>
                    <!-- pages number -->
                    <li v-for="page in visiblePages" class="me-2" :key="page" :class="{ active: currentPage === page }">
                        <a class="me-2" href="#" @click.prevent="goToPage(page)">{{ page }} </a>
                    </li>

                    <!-- next -->
                    <li><a  href="#">&gt;</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
    currentPage: {
        type: Number,
        default: 1
    },
    totalItems: {
        type: Number,
        required: true
    },
    pageSize: {
        type: Number,
        default: 10
    },
    maxVisibleButtons: {
        type: Number,
        default: 5
    }
});

const emit = defineEmits(['update:currentPage']);

const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize));

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
    emit('update:currentPage', page)
  }
}

const visiblePages = computed(() => {
    const pages = []
    let start = Math.max(1, props.currentPage - Math.floor(props.maxVisibleButtons / 2))
    let end = start + props.maxVisibleButtons - 1

    if (end > totalPages.value) {
        end = totalPages.value
        start = Math.max(1, end - props.maxVisibleButtons + 1)
    }

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }
    return pages
});

</script>
<style >

</style>