<template>
    <div class="pagination-controls  flex justify-center align-center gap-8 my-3">
        <span class=" pi cursor-pointer pi-angle-double-left text-gray-500  " @click="prevPage"
            :disabled="modelValue === 1"></span>
        <span class="text-sm text-gray-700">Страница {{ modelValue }} из {{ totalPages }}</span>
        <div class=" pi cursor-pointer  pi-angle-double-right   text-gray-500" @click="nextPage"
            :disabled="modelValue === totalPages"></div>
    </div>
</template>

<script setup>
import { defineModel, defineProps } from 'vue';
import Button from 'primevue/button';
import 'primeicons/primeicons.css'

const modelValue = defineModel();

const props = defineProps({
    totalPages: {
        type: Number,
        required: true,
    },
});
const nextPage = () => {
    if (modelValue.value < props.totalPages) {
        modelValue.value++;
    }
};

const prevPage = () => {
    if (modelValue.value > 1) {
        modelValue.value--;
    }
};
</script>

<style scoped></style>