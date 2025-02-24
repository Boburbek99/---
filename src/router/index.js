import { createRouter, createWebHistory } from 'vue-router';
import InventoryListViews from '@/views/InventoryListViews.vue';
import InventoryEditViews from '@/views/InventoryEditViews.vue';
import InventoryDetailViews from '@/views/InventoryDetailViews.vue';

const routes = [
  { path: '/', name: "inventoryList", component: InventoryListViews },
  // { path: '/inventory/create', component: InventoryCreate },
  { path: '/edit', name: "editInventory", component: InventoryEditViews },
  { path: '/detail/:id', name: "detailInventory", component: InventoryDetailViews },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;