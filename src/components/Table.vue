<template>
    <div class="card py-5">
        <DataTable v-if="Array.isArray(inventoryData) && inventoryData.length > 0" :value="paginatedData" editMode="row"
            dataKey="id" tableStyle="max-width: 70rem; margin:auto">
            <Column header="№">
                <template #body="{ index }">
                    {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                </template>
            </Column>
            <Column field="title" header="Название товара">
            </Column>
            <Column field="avatar" header="Фото">
                <template #body="{ data }">
                    <Avatar v-if="data.id" :image="`${data.avatar}`" class="mr-5" size="xlarge" shape="circle" />
                </template>
            </Column>
            <Column field="price" header="Цена">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data?.price) }}
                </template>
            </Column>
            <Column field="category" header="Категория товара">
            </Column>
            <Column field="count" header="Количество">
            </Column>
            <Column header="Посмотреть детально">
                <template #body="slotProps">
                    <router-link :to="`/detail/${slotProps.data?.id}`">
                        <Button label="Info" severity="info" variant="outlined">Посмотреть детально</Button>
                    </router-link>
                </template>
            </Column>
        </DataTable>

        <div class="h-dvh flex justify-center items-center" v-else>
            <div class="card  ">
                <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"
                    animationDuration=".5s" aria-label="Custom ProgressSpinner" />
            </div>
        </div>
        <Pagination v-model="currentPage" :totalPages="totalPages" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Pagination from '@/components/Pagination.vue';
import ProgressSpinner from 'primevue/progressspinner';

const { inventoryData = [] } = defineProps({
    inventoryData: {
        type: Array,
    },
});

const currentPage = ref(1);
const itemsPerPage = ref(5);

const paginatedData = computed(() => {
    if (!Array.isArray(inventoryData)) {
        return [];
    }
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return inventoryData.slice(start, end);
});


const totalPages = computed(() => {
    if (!Array.isArray(inventoryData)) {
        return 0;
    }
    return Math.ceil(inventoryData.length / itemsPerPage.value);
});

const formatCurrency = (value) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(value);
};

</script>

<style scoped></style>