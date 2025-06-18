<template>
    <div class="row">
        <div class="col">
            <div class="block-27">
                <ul>
                    <!-- previous -->
                    <li><a class="me-2" href="#" @click.prevent="goToPage(currentPage - 1)"
                            :class="{ 'disabled': currentPage === 0 }">&lt;</a></li>
                    <!-- pages number -->
                    <!-- <li v-for="page in totalPage" class="me-2" :key="page"
                        :class="{ active: currentPage === page - 1 }">
                        <a class="me-2" href="#" @click.prevent="goToPage(page - 1)">{{ page }} </a>
                    </li> -->
                    <li v-for="(page, index) in visiblePages" :key="index" :class="{ active: page === currentPage }"
                        class="me-2">
                        <span v-if="page === '...'">...</span>
                        <a v-else href="#" @click.prevent="goToPage(page)">{{ page + 1 }}</a>
                    </li>

                    <!-- next -->
                    <li>
                        <a href="#" @click.prevent="goToPage(currentPage + 1)"
                            :class="{ 'disabled': currentPage === totalPage - 1 }">&gt;</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';

// import { computed } from 'vue'
const props = defineProps({
    currentPage: {
        type: Number,
        default: 1
    },
    totalPage: {
        type: Number,
        required: true
    },

});

const emit = defineEmits(['update:currentPage']);

const goToPage = (page) => {
    if (page >= 0 && page < props.totalPage && page !== props.currentPage) {
        emit('update:currentPage', page)
    }
}

const visiblePages = computed(() => {
    const pages = [];
    const total = props.totalPage;
    const current = props.currentPage;

    if (total <= 5) {
        // Hiển thị toàn bộ
        for (let i = 0; i < total; i++) {
            pages.push(i);
        }
    } else {
        pages.push(0); // Trang đầu tiên

        if (current > 2) pages.push('...');

        const start = Math.max(1, current - 1);
        const end = Math.min(total - 2, current + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (current < total - 4) pages.push('...');

        pages.push(total - 1); // Trang cuối cùng
    }

    return pages;
});



</script>
<style></style>