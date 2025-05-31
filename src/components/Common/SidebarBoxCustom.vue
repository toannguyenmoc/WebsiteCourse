<template>
    <div class="sidebar-box bg-white p-4 ">
        <h3 class="heading-sidebar">{{ title }}</h3>
        <form action="#" class="browse-form">
            <label v-for="(option, index) in options" :key="index" :for="'option-category-' + index">
                <input type="checkbox" :id="'option-category-' + index" :value="option.value || option"
                    v-model="selectedValues" />
                {{ option.label || option }}
            </label>
        </form>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Category'
    },
    options: {
        type: Array,
        required: true
    },
    modelValue: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['update:modelValue'])

const selectedValues = ref([...props.modelValue])

watch(selectedValues, (newVal) => {
    emit('update:modelValue', newVal)
});
watch(() => props.modelValue, (newVal) => {
    selectedValues.value = [...newVal]
});

</script>
<style scoped>
</style>