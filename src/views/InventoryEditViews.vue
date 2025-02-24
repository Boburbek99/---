<template>
    <InventoryForm :inventoryData="stores.inventories" :categories="stores.categories" />
</template>
<script setup>

import InventoryForm from '@/components/InventoryForm.vue';
import { onBeforeMount, ref } from 'vue';
import { useInventoryStore } from '@/stores/inventory';
let stores = useInventoryStore()

onBeforeMount(async () => {
    await stores.fetchInventories();
    await stores.fetchCategories();
});
</script>
<style scoped></style>