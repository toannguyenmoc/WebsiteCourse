<template>
    <div class="sidebar-box bg-white p-4 ">
        <!-- <h3 class="heading-sidebar">Loại khóa học</h3> -->
        <form action="#" class="browse-form">
            <label class="d-block" v-for="(option, index) in options" :key="index" :for="'option-category-' + index">
                <input type="checkbox" :id="'option-category-' + index" :value="option.id || option"
                    v-model="internalValue" />
                {{ option.name || option }}
            </label>
        </form>
    </div>
</template>
<script setup>
import { ref, watch, computed} from 'vue';

const props = defineProps({
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

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

// const selectedValues = ref([...props.modelValue])

// watch(selectedValues, (newVal) => {
//   emit('update:modelValue', newVal);
// }, { deep: true });
// watch(() => props.modelValue, (newVal) => {
//     selectedValues.value = [...newVal]
// });

</script>
<style scoped>
</style>