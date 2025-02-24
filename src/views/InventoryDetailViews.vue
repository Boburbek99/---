<template>
    <div v-if="loading" class="h-dvh flex justify-center items-center">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s"
            aria-label="Custom ProgressSpinner" />
    </div>
    <Card v-else-if="stores.inventories">
        <template #header>
            <div class="item-card  p-4 flex  gap-5">
                <div class="card  ">
                    <Image :src='`${stores.inventories.avatar}`' alt="Image" width="350" loading="lazy" />
                </div>
                <div class="title flex-column items-stretch font-bold">
                    <h2 class="text-xl font-bold"> {{ stores.inventories.title }}</h2>
                    <p class="mt-35 text-lg">Цена: {{ stores.inventories.price }} ₽</p>
                    <p class=" mt-9 text-lg ">Количество: {{ stores.inventories.count }} </p>
                </div>
            </div>
        </template>
        <template #title>Description</template>
        <template #content>
            <p class="m-0">
                {{ stores.inventories.description }}
            </p>
        </template>
    </Card>
</template>

<script setup>

import { onBeforeMount, ref } from 'vue';
import Image from 'primevue/image';
import ProgressSpinner from 'primevue/progressspinner';

import Card from 'primevue/card';
import { useRoute } from 'vue-router';
import { useInventoryStore } from '../stores/inventory';
let stores = useInventoryStore()
const route = useRoute()
let loading = ref(true)
const images = ref();

onBeforeMount(async () => {
    try {
        await stores.fetchCategories();
        await stores.getByIdInventories(route.params.id);
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    } finally {
        loading.value = false;
    }
});
const responsiveOptions = ref([
    {
        breakpoint: '575px',
        numVisible: 4
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
]);

</script>